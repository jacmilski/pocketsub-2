export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Side Nav</aside>
      <main className="">{children}</main>
    </div>
  );
}
