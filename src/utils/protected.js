import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Import your NextAuth options

export function withProtectedPage(getServerSidePropsFunc) {
  return async (context) => {
    const session = await getServerSession(context, authOptions);

    if (!session) {
      // If no session exists, redirect to the login page
      return {
        redirect: {
          destination: "/login", // or wherever you want to redirect unauthorized users
          permanent: false,
        },
      };
    }

    // Call the original `getServerSideProps` function if the session exists
    const result = await getServerSidePropsFunc(context);

    return {
      props: {
        ...result.props,
        session, // Pass session to the page
      },
    };
  };
}