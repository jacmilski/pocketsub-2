import AppContentHeader from "@/components/AppContentHeader";
import { getData } from "@/app/utilities/MainStats-functions";
import { getStats } from "@/app/utilities/subscriptionsPage-functions";
import SubscriptionsMainStats from "@/components/SubscriptionsMainStats";
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
import { format } from "date-fns";
import { PAYMENT_STATUS, SUBSCRIPTION_STATUS } from "@prisma/client";

export default async function SubscriptionsPage() {
  const data = await getData();
  if (!data) return <div>Ładowanie ...</div>;
  const stats = getStats(data);

  return (
    <section className="h-screen p-8">
      <AppContentHeader title="Subscriptions" />
      <main className="mx-auto grid h-full max-w-7xl grid-cols-1 grid-rows-[80px,_1fr] gap-6 py-6">
        <SubscriptionsMainStats stats={stats} />
        <div className="flex flex-col rounded-xl bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold">Subscriptions</h2>
          <div className="relative mt-2 grow">
            <div className="absolute bottom-0 left-0 right-0 top-0 -mx-6 overflow-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pl-6 text-left font-light backdrop-blur backdrop-filter">
                      Name
                    </th>
                    <th className="sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left font-light backdrop-blur backdrop-filter lg:table-cell">
                      Category
                    </th>
                    <th className="sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left font-light backdrop-blur backdrop-filter xl:table-cell">
                      Billing period
                    </th>
                    <th className="sticky top-0 hidden border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left font-light backdrop-blur backdrop-filter xl:table-cell">
                      Next payment
                    </th>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-left font-light backdrop-blur backdrop-filter">
                      Payment status
                    </th>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 pr-6 text-right font-light backdrop-blur backdrop-filter">
                      Cost
                    </th>
                    <th className="sticky top-0 border-b border-zinc-300 bg-zinc-50 bg-opacity-75 py-2 text-right font-light backdrop-blur backdrop-filter">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="whitespace-nowrap bg-zinc-50 py-2 pl-6 text-left font-normal text-zinc-900">
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
                      <td className="hidden whitespace-nowrap bg-zinc-50 py-2 pr-6 text-left font-normal text-zinc-900 lg:table-cell">
                        {subscription.category}
                      </td>
                      <td className="hidden whitespace-nowrap bg-zinc-50 py-2 pr-6 text-left font-normal lowercase text-zinc-900 xl:table-cell">
                        {subscription.billing_period}
                      </td>
                      <td className="hidden whitespace-nowrap bg-zinc-50 py-2 pr-6 text-left font-normal text-zinc-900 xl:table-cell">
                        {format(subscription.next_payment_date, "MMM dd, yyyy")}
                      </td>
                      <td className="whitespace-nowrap bg-zinc-50 py-2 pr-6 text-left font-semibold lowercase text-zinc-900">
                        {subscription.payments[0].status ===
                        PAYMENT_STATUS.NOT_PAID ? (
                          <div className="flex items-center gap-2">
                            <i className="ri-checkbox-circle-fill rounded-full text-green-600" />
                            <p>paid</p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <i className="ri-indeterminate-circle-line text-red-600" />
                            <p>not paid</p>
                          </div>
                        )}
                      </td>
                      <td className="flex items-center justify-end gap-2 whitespace-nowrap bg-zinc-50 py-2 pr-6 text-right font-semibold text-zinc-900">
                        <p className="text-right">{subscription.price}</p>
                        <p className="ml-1 text-right text-[8px] uppercase">
                          {subscription.currency}
                        </p>
                      </td>
                      <td className="">
                        <button className="flex items-center gap-1 rounded-md bg-zinc-200 px-2 text-zinc-700">
                          <i className="ri-pencil-line mr-1 text-lg" />
                          <p>
                            Edit{" "}
                            <span className="sr-only">{subscription.name}</span>
                          </p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
