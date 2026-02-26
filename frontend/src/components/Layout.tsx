import { ReactNode } from "react";
import Topbar from "./TopBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen 
                    bg-gray-100 dark:bg-gray-900 
                    transition-colors duration-300 p-4"
    >
      <Topbar />

      {children}
    </div>
  );
};

export default Layout;
