import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import Link from "next/link"
import {dark} from '@clerk/themes'

function Topbar() {
    return (
        <nav
            className="topbar"
        >
            <Link
                href='/'
                className="flex items-center gap-4"
            >
                <img
                    src="/assets/logo.svg"
                    alt='logo'
                    width={28}
                    height={28}
                />
                <p
                    className="text-heading3-bold text-light-1 max-xs:hidden"
                >
                    Threads
                </p>
            </Link>

            <div
                className="flex items-center gap-1"
            >
                <div
                    className="block md:hidden" //when the window is in full size (computer size) the button will not appear
                >
                    <SignedIn> {/** a clerk component */}
                        {/**the code in the SignedIn component will only appear if the user is signed in  */}
                        <SignOutButton>
                            <div
                                className="flex cursoer-pointer"
                            >
                                <img
                                    src="/assets/logout.svg"
                                    alt='logout'
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>

                <OrganizationSwitcher /*the organization icon top right in the navbar*/
                appearance={{
                    baseTheme: dark, 
                    elements:{
                        organizationSwitcherTrigger: 'py-2 px-4' //makr the icon of the element look better (height ans weight)
                    }
                }}
                />
            </div>
        </nav>
    )
}

export default Topbar