export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>Marketing Header</header>
      {children}
    </div>
  );
}
