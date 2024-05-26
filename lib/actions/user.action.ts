"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/Thread.model";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

/** 
 * 1. if the user already exist: update the data in the db
 * 2. if the user isnt exist : create the user in the db
 */
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    connectToDB(); //connecting to mongoose db

    try {
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            {
                upsert: true //a database operation that will update an existing row if a specific value already exist, and insert a new row if the specific value doesnt already exist.
            },
        );
        //if the profile was updated, it will update the catched data without waiting for a revalidation perod expired. 
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
        console.log(`${username} data update succesfully`);
    } catch (error: any) {
        throw new Error(`Failed to create/update user : ${error.message}`)
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();

        return await User
            .findOne({ id: userId })
        // .populate({
        //     path: 'communities',
        //     model: 'Community'
        // })
    } catch (error: any) {
        return new Error(`Failed to fetch user: ${error.message}`)
    }

}

export async function fetchUserPost(userId: string) {
    try {
        connectToDB();

        //Find all therads authored by the user with the given user ID

        //TODO: populate community
        const threads = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            })

        return threads
    } catch (error: any) {
        return new Error(`Failed to fetch user posts: ${error.message}`)
    }
}