"use client" //a decleration that help use to knoe this is a client side route so the function useRouter will work

import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation";
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from "@clerk/nextjs";

//use the most fir the mobile version for navigation
function Bottombar(){

     //a next essential tools that let us know whitch route and path we are right now
     const pathname = usePathname();
     //-----------------------------------------------------------------------------
     const {userId} = useAuth();

    return(
        <section
        className="bottombar"
        >
            <div
            className="bottombar_container"
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
                            className={`bottombar_link ${isActive && pathname.includes(`${link.route}/${userId}`) ? 'bg-primary-500' : ''}`} //make the current page button on the left side bar marked
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p
                                className='text-subtle-medium text-light-1 max-sm:hidden' //when the size of the window changes, the p  tag will appear differently
                            >
                                {link.label.split(/\s+/)[0]} {/**takes only the first word of each link to the bottom bar */}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Bottombar