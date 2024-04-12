import { Payment, SUBSCRIPTION_CURRENCY, Subscription } from "@prisma/client";
import { LinkProps } from "next/link";

export interface DashboardCatBreakdownProps {
  data: (Subscription & {
    currency: string;
    price: number;
    payments: Payment[];
  })[];
}

export interface SingleStatsComponentsProps {
  sum: number | string;
  subTitle: string;
  currency?: SUBSCRIPTION_CURRENCY;
}

export interface AppContentHeaderProps {
  title: string;
}

export interface AppNaviLinkProps extends LinkProps<unknown> {
  iconName: string;
  text: string;
}
