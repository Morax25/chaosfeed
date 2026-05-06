import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="position-relative">
      <Header/>
        <Navbar/>
      {children}
    </div>
  );
}
