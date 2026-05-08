import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="position-relative min-h-full">
      <Header />
      <Navbar />
      <div className="mt-20 md:px-10 pb-20 md:pb-5 lg:px-15">{children}</div>
    </div>
  );
}
