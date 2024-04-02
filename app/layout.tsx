import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Pocketsub",
  description: "Make your payments easier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
