import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  PAYMENT_STATUS,
  Payment,
  SUBSCRIPTION_CURRENCY,
  Subscription,
} from "@prisma/client";

export const summarizePrices = (
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

export const summarizePaymentsAmount = (
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

export const getDataForDashboard = async () => {
  const { userId } = auth();

  try {
    if (!userId) return;
    const user = await prisma.user.findFirst();
    if (!user) return;
    console.log(user);
    const res = await prisma.subscription.findMany({
      where: {
        userId: user.owner,
      },
      include: {
        payments: true,
      },
      orderBy: { next_payment_date: "asc" },
    });

    return res;
  } catch (err: unknown) {
    throw new Error("Faild to fetch data");
  }
};
