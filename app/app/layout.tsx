import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="position-relative min-h-full">
      <Header />
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
}
