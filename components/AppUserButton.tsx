"use client";
import React from "react";
import {
  ClerkLoading,
  ClerkLoaded,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AppUserButton = () => {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <ClerkLoading>
        <div className="w-full text-center">...is loading</div>
      </ClerkLoading>
    );
  }

  return (
    <ClerkLoaded>
      <div className="flex w-full flex-col items-center gap-4 divide-y-[1px] divide-zinc-300">
        <div>
          <p className="mb-2 text-center">Add new subscription?</p>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 pl-4 pr-6 text-zinc-50">
            <i className="ri-add-line text-2xl" />
            <p className="text-sm">New subscription</p>
          </button>
        </div>
        <div className="flex w-full items-center px-4 py-4">
          <Image
            src={user?.imageUrl as string | StaticImport}
            alt={`${user.username} Avatar`}
            width={32}
            height={32}
            className="h-8 rounded-full"
          />
          <p className="ml-2 grow text-sm font-semibold">{user?.username}</p>
          <button>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <i className="ri-more-2-fill" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade min-w-[220px] rounded-md bg-zinc-100 p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]">
                  <DropdownMenu.Item>
                    <SignOutButton signOutCallback={() => router.push("/")} />
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </button>
        </div>
      </div>
    </ClerkLoaded>
  );
};

export default AppUserButton;
