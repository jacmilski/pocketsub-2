import { Subscription } from "@prisma/client";

const exchangeRates: Record<string, number> = {
  EUR: 4.7,
  USD: 4.15,
  PLN: 1,
};

export const sumPricesByCategory = (data: Subscription[]) => {
  return data.reduce<Record<string, number>>(
    (acc, item) => {
      let price =
        item.currency in exchangeRates
          ? item.price * exchangeRates[item.currency]
          : item.price;

      if (item.category in acc) {
        acc[item.category] += price;
      } else {
        acc[item.category] = price;
      }

      return acc;
    },
    [] as unknown as Record<string, number>,
  );
};

export const findCheapestAndMostExpensive = (
  data: { name: string; price: number }[],
) => {
  const result = data.reduce(
    (acc, curr) => {
      if (curr.price > acc.mostExpensive.price) {
        acc.mostExpensive = curr;
      }
      if (curr.price < acc.cheapest.price) {
        acc.cheapest = curr;
      }
      return acc;
    },
    { mostExpensive: data[0], cheapest: data[0] },
  );
  return result;
};
