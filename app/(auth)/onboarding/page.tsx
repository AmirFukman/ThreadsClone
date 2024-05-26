import AccountProfile from "@/components/forms/AccountProfile"
import { currentUser } from "@clerk/nextjs"

//this page is present after a user is signed in and we want to add additional info like profile pgoto and more
async function Page() {

    const user = await currentUser();//The await keyword can only be used within an async function. It tells JavaScript to pause the execution of the code until the awaited promise is settled (either resolved or rejected).

    const userInfo = {};

    const userData = {//the data of the user getting from the clerk API
        id: user?.id, //user?.id: This syntax checks if the user object exists. If user is not null or undefined, it accesses the id property of the user object. The optional chaining operator (?.) prevents throwing an error if user is null or undefined. If user is null or undefined, userData.id will be undefined.
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
    }

    return (
        <main
            className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20"
        >
            <h1 className="head-text">
                onboarding
            </h1>
            <p
                className="mt-3 text-base-regular text-light-2"
            >
                Complete your profile now to use Threads
            </p>
            <section
                className="mt-9 bg-dark-2 p-10"
            >
                <AccountProfile user={userData} btnTitle='Continue'/>
            </section>
        </main>
    )
}

export default Page