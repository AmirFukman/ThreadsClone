"use client" //a decleration that help use to know this is a client side route so the function useRouter will work
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation.js'
import { sidebarLinks } from '../../constants/index.js'
import { SignOutButton, SignedIn, currentUser, useAuth } from '@clerk/nextjs'


function LeftSidebar() {

    //a next essential tools that let us know whitch route and path we are right now
    const router = useRouter();
    const pathname = usePathname();
    const {userId} = useAuth();
    //-----------------------------------------------------------------------------
    return (
        <section
            className="custom-scrollbar leftsidebar"
        >
            <div
                className="flex w-full flex-1 flex-col gap-6 px-6"
            >
                {sidebarLinks.map((link) => {
                    /**
                     * explanation to the next line (isActive):
                     * pathname.includes(link.route) -> check if the link.route name is in the current pathname (http://localhost:3000/..../)
                     * link.route.length > 1 -> check if i am not in the homepage (http://localhost:3000/(this name lenght biggher than 1)/)
                     * pathname === link.route -> pathname is directly equal to link.route
                     */
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

                    return (
                        <Link
                            href={link.route === '/profile' ? `${link.route}/${userId}` : link.route }
                            key={link.label}
                            className={`leftsidebar_link ${isActive && pathname.includes(`${link.route}/${userId}`) ? 'bg-primary-500' : ''}`} //make the current page button on the left side bar marked
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p
                                className='text-light-1 max-lg:hidden' //when the size of the window changes, the p  tag will appear differently
                            >
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
            <div
                className='mt-10 px-6'
            >
                <SignedIn> {/** a clerk component */}
                    {/**the code in the SignedIn component will only appear if the user is signed in  */}
                    <SignOutButton
                        signOutCallback={() => //when the user signout it automaticly direct him to the sign in page
                            router.push('/sign-in')
                        }
                    >
                        <div
                            className="flex cursor-pointer gap-4 p-4"
                        >
                            <Image
                                src="/assets/logout.svg"
                                alt='logout'
                                width={24}
                                height={24}
                            />
                            <p
                                className='text-light-2 max-lg:hidden'
                            >
                                Logout
                            </p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSidebar