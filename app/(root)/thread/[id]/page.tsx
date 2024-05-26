import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";
const Page = async ({ params }: { params: { id: string } }) => {

    if (!params.id) return null; //if there is no data on the thread , dont render the page

    const user = await currentUser();//get the user data from clerck
    if (!user) return null;

    const userInfo = await fetchUser(user.id); //get the user info from the database
    if (!userInfo?.onboarded) redirect('/onboarding'); //if the user enter rthe page without fill the data on the onboarding page he will redirect to the page. 

    const thread = await fetchThreadById(params.id);
    
    return (

        <section
            className="relative"
        >
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>

            <div
            className="mt-7"
            >
                <Comment
                    threadId = {thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div
            className="mt-10"
            >
                {thread.children.map((childItem: any) => (
                    <ThreadCard 
                    key={childItem._id}
                    id={childItem._id}
                    currentUserId={user?.id || ""}
                    parentId={childItem.parentId}
                    content={childItem.text}
                    author={childItem.author}
                    community={childItem.community}
                    createdAt={childItem.createdAt}
                    comments={childItem.children}
                    isComment
                    />
                ))}
            </div>
        </section>
    )
}

export default Page;