import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="h-[80px] md:pl-56 fixed inset-x-0 top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Sidebar: Ensure it's fixed to the left and takes full height */}
      <div className="md:flex fixed inset-y-0 w-56 flex-col z-50 bg-gray-800">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="md:pl-42 pt-[40px] h-full ml-13">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
