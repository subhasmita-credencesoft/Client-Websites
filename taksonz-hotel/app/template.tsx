/** Re-mounts on every route change, giving each page a soft fade-in. Opacity only, so fixed elements are unaffected. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
