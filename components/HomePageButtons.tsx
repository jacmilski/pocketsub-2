"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const HomePageButtons = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <Link href={"/dashboard"}>Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <>
          <Link href={"/sign-up/"}>SignUp</Link>
          <Link href={"/sign-in/"}>SignIn</Link>
        </>
      )}
    </div>
  );
};

export default HomePageButtons;
