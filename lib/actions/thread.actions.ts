"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/Thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { error } from "console";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function CreateThread({
    text,
    author,
    communityId,
    path,
}: Params) {
    try {
        connectToDB();

        //creating a thread
        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        //update user model
        await User.findByIdAndUpdate(
            author,
            {
                $push: { threads: createdThread._id } //push the current thread to the user that has created it. 
            }
        )

        revalidatePath(path); //make sure that the changes is happening immidietly on our website.

    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
};

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    /**fetch the posts that have no parents (top-level threads...) */
    const postsQuery = Thread.find({
        parentId: { $in: [null, undefined] } //give mt the parents that the parnt id id null or undefined
    }).sort({
        createdAt: 'desc'
    }).skip(
        skipAmount
    ).populate({
        path: 'author',
        model: User
    }).populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] }
    })

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
}

export async function fetchThreadById(id : string){
    connectToDB();

    try {

        //TODO: populate community

        const thread = await Thread.findById(id)
        .populate({
            path : 'author',
            model : User,
            select: ' _id id name image'
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }
                }
            ]
        }).exec();
        return thread;
    } catch (error : any) {
        throw new Error(`Error fetching thread: ${error.message}`);
    }
}

export async function addCommentToThread(
    threadId : string,
    commentText:string,
    userId: string,
    path: string,
    ){
        connectToDB();

        try {
            /**adding a comment */

            //1. find the parent (originak thread) by id
            const originalThread = await Thread.findById(threadId);

            if(!originalThread){
                throw new Error('Thread not found!');
            }
            
            //2.create new thread with the comment text
            const commentThread = new Thread({
                text: commentText,
                author: userId,
                parent: threadId,
            })

            //3.save the new thread to the database
            const savedCommentThread = await commentThread.save();

            //4.update the original thread (parent thread) to include the comment thread
            originalThread.children.push(savedCommentThread._id);

            //5.save the original thread
            await originalThread.save();

            revalidatePath(path); //so the update will show instantly

        } catch (error : any) {
            throw new Error(`Error adding comment to thread: ${error.message}`);
        }
    }