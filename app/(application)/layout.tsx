export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>Aside Nav</aside>
      <main>{children}</main>
    </div>
  );
}
