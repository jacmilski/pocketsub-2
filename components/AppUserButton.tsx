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
import * as Dialog from "@radix-ui/react-dialog";
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
          <Dialog.Root>
            <Dialog.Trigger>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 pl-4 pr-6 text-zinc-50">
                <i className="ri-add-line text-2xl" />
                <p className="text-sm">New subscription</p>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-zinc-950 bg-opacity-80" />
              <Dialog.Content className="fixed left-[50%] top-[50%] z-10 max-h-[85vh] w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-zinc-50 p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
                <Dialog.Title className="text-2xl font-medium">
                  Add new subscription
                </Dialog.Title>
                <Dialog.Description className="mb-4 mt-4 font-medium">
                  General information
                </Dialog.Description>
                <form action="" className="">
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="name"
                        className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                      >
                        Name
                        <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                      </label>
                      <input
                        id="name"
                        name="name"
                        placeholder="Subscription name"
                        type="text"
                        className="block w-full rounded-md border-0 bg-zinc-200 px-2 py-[6px] text-sm leading-none text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                      />
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="category"
                        className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                      >
                        Category
                        <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          className="block h-full w-full appearance-none rounded-md border-0 bg-zinc-200 p-2 text-sm leading-none text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                        >
                          <option value="entertainment">Entertanment</option>
                          <option value="insurance">Insurance</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute inset-y-[3px] right-2 text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <label
                    htmlFor="avatar_url"
                    className="mt-2 flex items-center gap-[2px] text-sm font-light text-zinc-600"
                  >
                    Website
                  </label>
                  <div className="relative">
                    <input
                      id="avatar_url"
                      name="avatar_url"
                      type="text"
                      placeholder="google.com"
                      className="block w-2/3 w-full rounded-md border-0 bg-zinc-200 py-[6px] pl-20 pr-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center rounded-lg rounded-r-none bg-zinc-400 px-2">
                      {"http://"}
                    </div>
                  </div>
                  <p className="pt-1 text-[10px] font-light text-zinc-700">
                    Giving information about webpage you will help us generate
                    proper avatar for your service
                  </p>
                  <Dialog.Description className="mb-4 mt-4 font-medium">
                    Expense information
                  </Dialog.Description>
                  <label
                    htmlFor="cost"
                    className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                  >
                    Cost
                    <i className="ri-star-fill pb-2 text-[6px] text-red-700" />
                  </label>
                  <div className="relative w-2/3">
                    <input
                      id="cost"
                      name="cost"
                      type="number"
                      step="0.01"
                      min="0.01"
                      className="block w-full rounded-md border-0 bg-zinc-200 px-2 py-[6px] text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                    />
                    <select
                      name="currency"
                      id="currency"
                      className="absolute inset-y-0 right-0 block appearance-none rounded-md rounded-l-none border-0 bg-zinc-400 px-2 text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="PLN">PLN</option>
                    </select>
                  </div>
                  <Dialog.Description className="mb-4 mt-4 font-medium">
                    Billing information
                  </Dialog.Description>
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="billing_period"
                        className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                      >
                        Billing period
                      </label>
                      <div className="relative">
                        <select
                          name="billing_period"
                          id="billing_period"
                          className="block w-full appearance-none rounded-md border-0 bg-zinc-200 px-2 py-[5px] text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                        >
                          <option value="monthly">MONTHLY</option>
                          <option value="quarterly">QUARTERLY</option>
                          <option value="yearly">YEARLY</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute inset-y-[3px] right-2 text-zinc-400" />
                      </div>
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="next_payment"
                        className="flex items-center gap-[2px] text-sm font-light text-zinc-600"
                      >
                        Next payment
                      </label>
                      <input
                        type="date"
                        className="block w-full rounded-md border-0 bg-zinc-200 px-2 py-[6px] text-sm text-zinc-800 outline-none ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-950"
                      />
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col items-center justify-center gap-3">
                    <Dialog.Close asChild>
                      <button className="flex w-full items-center justify-center rounded-lg border-[1px] border-zinc-500 px-2 py-3 font-medium leading-none">
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex w-full items-center justify-center rounded-lg bg-zinc-900 px-2 py-3 font-medium leading-none text-zinc-100"
                    >
                      Add new subscription
                    </button>
                  </div>
                </form>
                <Dialog.Close asChild>
                  <button
                    className="absolute right-[16px] top-[24px] inline-flex items-center justify-center rounded-full px-2 shadow-zinc-950 focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="close"
                  >
                    <i className="ri-close-line text-2xl text-zinc-950" />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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
                <DropdownMenu.Content className="min-w-[220px] rounded-md bg-zinc-100 p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
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
