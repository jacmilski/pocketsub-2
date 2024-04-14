import React from "react";
import { format } from "date-fns";
import SingleStatsComponents from "./SingleStatsComponents";
import { Payment, Subscription } from "@prisma/client";
import {
  summarizePaymentsAmount,
  summarizePrices,
} from "@/app/utilities/MainStats-functions";

const EUR_PLN = 4.58;
const USD_PLN = 4.11;

const DashboardMainStats = ({
  subscriptions,
}: {
  subscriptions: (Subscription & {
    currency: string;
    price: number;
    payments: Payment[];
  })[];
}) => {
  if (!subscriptions) return <div>Loading...</div>;

  const subscriptionsSum = summarizePrices(subscriptions);
  const monthSumInPln = (
    subscriptionsSum.totalEUR * EUR_PLN +
    subscriptionsSum.totalUSD * USD_PLN +
    subscriptionsSum.totalPLN
  ).toFixed(2);

  const paymentsSum = summarizePaymentsAmount(subscriptions);
  const paymentsSumPaid = (
    paymentsSum.totalEURPaid * EUR_PLN +
    paymentsSum.totalUSDPaid * USD_PLN +
    paymentsSum.totalPLNPaid
  ).toFixed(2);

  const paymentsSumNotPaid = (
    paymentsSum.totalEURNotPaid * EUR_PLN +
    paymentsSum.totalUSDNotPaid * USD_PLN +
    paymentsSum.totalPLNNotPaid
  ).toFixed(2);

  return (
    <div className="col-span-3 row-start-1 row-end-2 rounded-xl bg-zinc-50 p-6 xl:col-span-2">
      <div className="mx-6 flex h-full items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-semibold leading-5 tracking-wide">
            {format(new Date(), "LLLL")}
          </h1>
          <p className="text-xs text-zinc-500">{format(new Date(), "yyyy")}</p>
        </div>
        <div className="flex items-center gap-6">
          <SingleStatsComponents
            sum={parseFloat(paymentsSumNotPaid)}
            subTitle={`Still to pay`}
          />
          <SingleStatsComponents
            sum={parseFloat(paymentsSumPaid)}
            subTitle={`Already paid`}
          />
          <SingleStatsComponents
            sum={parseFloat(monthSumInPln)}
            subTitle={`This month sum`}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainStats;
