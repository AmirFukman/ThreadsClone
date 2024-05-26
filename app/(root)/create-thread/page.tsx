import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';


async function Page() {

    const user = await currentUser(); //assign the currntuser we get from the clerck functionality to a local user. 

    if (!user) return null; //i there is no user connected, the page wont load.  

    const userInfo = await fetchUser(user.id);//get the user data from the DB (not neccerly the logged in user -> it could be that im looking on someone else profile.)

    if (!userInfo?.onboarded) redirect('/onboarding'); //move all the users that enter the url manually '../create-threads' and not onboarded yet back to the onboarding page

    return (
        <>
            <h1
                className="head-text"
            >
                Create Thread
            </h1>

            <PostThread userId={userInfo._id} />
        </>
    )
}

export default Page;

