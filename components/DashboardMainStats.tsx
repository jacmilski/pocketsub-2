import React from "react";
import { format } from "date-fns";
import SingleStatsComponents from "./SingleStatsComponents";
import {
  PAYMENT_STATUS,
  Payment,
  SUBSCRIPTION_CURRENCY,
  Subscription,
} from "@prisma/client";

const summarizePrices = (
  subscriptions: (Subscription & {
    currency: string;
    price: number;
    payments: Payment[];
  })[],
) => {
  let totalEUR = 0;
  let totalUSD = 0;
  let totalPLN = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
      totalEUR += subscriptions[i].price;
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD) {
      totalUSD += subscriptions[i].price;
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
      totalPLN += subscriptions[i].price;
    }
  }
  return {
    totalEUR: parseFloat(totalEUR.toFixed(2)),
    totalUSD: parseFloat(totalUSD.toFixed(2)),
    totalPLN: parseFloat(totalPLN.toFixed(2)),
  };
};

const summarizePaymentsAmount = (
  subscriptions: (Subscription & {
    payments: Payment[];
  })[],
) => {
  let totalEURPaid = 0;
  let totalUSDPaid = 0;
  let totalPLNPaid = 0;
  let totalEURNotPaid = 0;
  let totalUSDNotPaid = 0;
  let totalPLNNotPaid = 0;

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.EUR) {
      subscriptions[i].payments.map((payment) => {
        if (payment.status === PAYMENT_STATUS.PAID) {
          totalEURPaid += payment.amount;
        } else if (payment.status === PAYMENT_STATUS.NOT_PAID) {
          totalEURNotPaid += payment.amount;
        }
      });
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.USD) {
      subscriptions[i].payments.map((payment) => {
        if (payment.status === PAYMENT_STATUS.PAID) {
          totalUSDPaid += payment.amount;
        } else if (payment.status === PAYMENT_STATUS.NOT_PAID) {
          totalUSDNotPaid += payment.amount;
        }
      });
    } else if (subscriptions[i].currency === SUBSCRIPTION_CURRENCY.PLN) {
      subscriptions[i].payments.map((payment) => {
        if (payment.status === PAYMENT_STATUS.PAID) {
          totalPLNPaid += payment.amount;
        } else if (payment.status === PAYMENT_STATUS.NOT_PAID) {
          totalPLNNotPaid += payment.amount;
        }
      });
    }
  }
  return {
    totalEURPaid,
    totalUSDPaid,
    totalPLNPaid,
    totalEURNotPaid,
    totalUSDNotPaid,
    totalPLNNotPaid,
  };
};

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
