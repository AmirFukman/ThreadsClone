//a step from the clerk implementation in my project. 
//find all the steps in the https://clerk.com/docs/quickstarts/nextjs?_gl=1*3jznip*_ga*NTE3MjE2MTk3LjE3MDE3ODgyOTU.*_ga_1WMF5X234K*MTcwMTc4ODI5NS4xLjEuMTcwMTc4ODYyNy4wLjAuMA..*_gcl_au*MTgzODYxODY4Ny4xNzAxNzg4Mjk1LjEzODczNjAxNjcuMTcwMTc4ODMxMy4xNzAxNzg4MzEy

import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
    publicRoutes:['/' , '/api/webhook/clerk'],
    ignoredRoutes:['/api/webhook/clerk']
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 