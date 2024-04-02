import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/img/Logo.png";
import AppNaviLink from "../../../components/AppNaviLink";
import AppUserButton from "@/components/AppUserButton";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-screen ${inter.className}`}>
      <aside className="flex w-64 flex-col justify-between">
        <div className="">
          <Link
            href={"/"}
            className="flex items-center justify-start gap-2 p-8"
          >
            <Image src={logo} alt="Logo pocketsub" height={34} />
            <h1 className="text-lg font-semibold">Pocketsub</h1>
          </Link>
          <nav className="flex flex-col">
            <AppNaviLink
              href={"/dashboard"}
              iconName={"dashboard"}
              text={"Dashboard"}
            />
            <AppNaviLink
              href={"/subscriptions"}
              iconName={"file-text"}
              text={"Subscriptions"}
            />
          </nav>
        </div>
        <AppUserButton />
      </aside>
      <main className="max-h-screen grow overflow-hidden bg-zinc-200">
        {children}
      </main>
    </div>
  );
}
