import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { redirect } from 'next/navigation';
import { profile } from 'console';
import { profileTabs } from '@/constants';
import Image from 'next/image'
import { Tangerine } from 'next/font/google';
import ThreadsTab from '@/components/shared/ThreadsTab';

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser(); //assign the currntuser we get from the clerck functionality to a local user. 

    if (!user) return null; //i there is no user connected, the page wont load.  

    const userInfo = await fetchUser(params.id);//get the user data from the DB (not neccerly the logged in user -> it could be that im looking on someone else profile.)

    if (!userInfo?.onboarded) redirect('/onboarding'); //move all the users that enter the url manually '../create-threads' and not onboarded yet back to the onboarding page


    return (
        <section
            className="text-white"
        >
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div
                className='mt-9'
            >
                <Tabs
                    defaultValue='threads'
                    className='w-full'
                >
                    <TabsList
                        className='tab'
                    >
                        {profileTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.label}
                                value={tab.value}
                                className='tab'
                            >
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className='object-contain'
                                />
                                <p
                                    className='max-sm:hidden'
                                >
                                    {tab.label}
                                </p>
                                {tab.label === 'Threads' && (
                                    <p
                                        className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'
                                    >
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className='w-full text-light-1'
                        >
                            <ThreadsTab 
                            currentUserId={user.id}
                            accountId={userInfo.id}
                            accountType ='User'
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page;