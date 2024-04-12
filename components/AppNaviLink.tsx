"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UrlObject } from "url";
import { clsx } from "clsx";
import { AppNaviLinkProps } from "@/app/interfaces/interfaces";

const AppNaviLink = (props: AppNaviLinkProps) => {
  const pathName = usePathname();

  const isActive =
    pathName === props.href || pathName === (props.href as UrlObject).pathname;

  return (
    <Link
      href={props.href}
      className={clsx(
        "flex w-full items-center gap-2 px-8 py-4",
        isActive && "border-r-4 border-zinc-400 bg-zinc-950 text-zinc-50",
      )}
    >
      <i className={`ri-${props.iconName}-${isActive ? "fill" : "line"}`} />
      <p className="font-semibold">{props.text}</p>
    </Link>
  );
};

export default AppNaviLink;
