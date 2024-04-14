// @ts-nocheck
import AppContentHeader from "@/components/AppContentHeader";
import DashboardCatBreakdown from "@/components/DashboardCatBreakdown";
import DashboardMainStats from "@/components/DashboardMainStats";
import { format } from "date-fns";
import Image from "next/image";
import Disney from "../../../../public/img/avatars/Disney-Avatar.png";
import Getsafe from "../../../../public/img/avatars/Getsafe-Avatar.png";
import Github from "../../../../public/img/avatars/Github-Avatar.png";
import GoogleCloud from "../../../../public/img/avatars/Google-Cloud-Avatar.png";
import GooglePayment from "../../../../public/img/avatars/Google-Payment-Avatar.png";
import Medium from "../../../../public/img/avatars/Medium-Avatar.png";
import Netflix from "../../../../public/img/avatars/Netflix-Avatar.png";
import Sizzy from "../../../../public/img/avatars/Sizzy-Avatar.png";
import Spotify from "../../../../public/img/avatars/Spotify-Avatar.png";
import Zapier from "../../../../public/img/avatars/Zapier-Avatar.png";
import { getData } from "@/app/utilities/MainStats-functions";

export default async function DashboardPage() {
  const data = await getData();

  if (!data) return null;

  return (
    <section className="h-full p-8">
      {/* TOP HEADER WITH BUTTONS */}
      <AppContentHeader title="Dashboard" />
      {/* CONTENT */}
      <main className="mx-auto grid h-full max-w-7xl grid-cols-3 grid-rows-[80px,_1fr] gap-4 p-6">
        {/* STATS */}
        <DashboardMainStats subscriptions={data} />
        {/* DATA TABLE */}
        <div className="col-span-3 row-start-2 row-end-3 flex flex-col rounded-xl bg-zinc-50 p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold">Upcoming payments</h2>
          <div className="relative -mx-6 mt-2 grow">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full scroll-m-1 overflow-x-auto overflow-y-auto">
              <table className="min-w-full text-xs">
                <thead className="text-[12px] text-zinc-400">
                  <tr>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 px-6 py-2 text-left font-light backdrop-blur backdrop-filter">
                      Name
                    </th>
                    <th className="sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 px-6 py-2 text-left font-light backdrop-blur backdrop-filter lg:table-cell">
                      Category
                    </th>
                    <th className="sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 px-6 py-2 text-left font-light backdrop-blur backdrop-filter xl:table-cell">
                      Billing period
                    </th>
                    <th className=" sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 px-6 py-2 text-left font-light backdrop-blur backdrop-filter xl:table-cell">
                      Next peyment
                    </th>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 px-6 py-2 text-right font-light backdrop-blur backdrop-filter">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="whitespace-nowrap bg-zinc-50 px-6 py-2 text-left font-normal text-zinc-900">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              subscription.avatar_url.includes(`Disney`)
                                ? Disney
                                : subscription.avatar_url.includes(`Getsafe`)
                                  ? Getsafe
                                  : subscription.avatar_url.includes(`Github`)
                                    ? Github
                                    : subscription.avatar_url.includes(
                                          `GoogleCloud`,
                                        )
                                      ? GoogleCloud
                                      : subscription.avatar_url.includes(
                                            `Google-Cloud`,
                                          )
                                        ? GoogleCloud
                                        : subscription.avatar_url.includes(
                                              `Google-Payment`,
                                            )
                                          ? GooglePayment
                                          : subscription.avatar_url.includes(
                                                `Medium`,
                                              )
                                            ? Medium
                                            : subscription.avatar_url.includes(
                                                  `Netflix`,
                                                )
                                              ? Netflix
                                              : subscription.avatar_url.includes(
                                                    `Sizzy`,
                                                  )
                                                ? Sizzy
                                                : subscription.avatar_url.includes(
                                                      `Spotify`,
                                                    )
                                                  ? Spotify
                                                  : Zapier
                            }
                            alt={`${subscription.name} logo`}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                          <p>{subscription.name}</p>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap bg-zinc-50 px-6 py-2 text-left font-normal text-zinc-900 lg:table-cell">
                        {subscription.category}
                      </td>
                      <td className="hidden whitespace-nowrap bg-zinc-50 px-6 py-2 text-left font-normal lowercase text-zinc-900 xl:table-cell">
                        {subscription.billing_period}
                      </td>
                      <td className="hidden whitespace-nowrap bg-zinc-50 px-6 py-2 text-left font-normal text-zinc-900 xl:table-cell">
                        {format(subscription.next_payment_date, "MMM dd, yyyy")}
                      </td>
                      <td className="whitespace-nowrap bg-zinc-50 px-6 py-2 text-right font-semibold text-zinc-900">
                        {subscription.price}
                        <span className="ml-1 text-[8px] uppercase">pln</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* GROUP STATS */}
        <DashboardCatBreakdown data={data} />
      </main>
    </section>
  );
}
