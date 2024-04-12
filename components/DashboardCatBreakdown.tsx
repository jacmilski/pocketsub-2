import { DashboardCatBreakdownProps } from "@/app/interfaces/interfaces";
import {
  findCheapestAndMostExpensive,
  sumPricesByCategory,
} from "@/app/utilities/dashboardCatBreakdown-functions";
import { SUBSCRIPTION_CURRENCY } from "@prisma/client";

const DashboardCatBreakdown = ({ data }: DashboardCatBreakdownProps) => {
  const result = Object.entries(sumPricesByCategory(data)).map(
    ([name, price]) => ({
      name,
      price,
    }),
  );

  const { mostExpensive, cheapest } = findCheapestAndMostExpensive(result);

  return (
    <div className="row-span-2 hidden flex-col rounded-xl bg-zinc-50 p-6 xl:flex">
      <h2 className="text-lg font-semibold">Category breakdown</h2>
      <div className="relative mt-2 h-full grow">
        <div className="absolute left-0 right-0 -mx-6">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-left text-sm font-normal text-zinc-400">
                  Category
                </th>
                <th className="border-b border-zinc-300 bg-zinc-50 px-6 py-2 text-right text-sm font-normal text-zinc-400">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {result.map((categoryData) => (
                <tr key={categoryData.name}>
                  <td className="whitespace-nowrap bg-zinc-50 px-6 py-2 text-left font-normal text-zinc-900">
                    {categoryData.name}
                  </td>
                  <td className="whitespace-nowrap bg-zinc-50 px-6 py-2 text-right font-semibold text-zinc-900">
                    {categoryData.price.toFixed(2)}
                    <span className="ml-1 text-[8px] uppercase">
                      {SUBSCRIPTION_CURRENCY.PLN}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Most expensive category
          </h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{mostExpensive.name}</h4>
            <p className="font-semibold text-zinc-950">
              {mostExpensive.price.toFixed(2)}{" "}
              <span className="ml-1 text-[8px] uppercase">
                {SUBSCRIPTION_CURRENCY.PLN}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Most cheapest category</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-sm">{cheapest.name}</h4>
            <p className="font-semibold text-zinc-950">
              {cheapest.price.toFixed(2)}{" "}
              <span className="ml-1 text-[8px] uppercase">pln</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCatBreakdown;
