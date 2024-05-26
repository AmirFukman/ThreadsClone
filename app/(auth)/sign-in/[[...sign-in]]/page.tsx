//form the clerk api to build a sign in page
//from  - > https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#build-your-own-sign-in-and-sign-up-pages-for-your-next-js-app-with-clerk

import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn />;
}