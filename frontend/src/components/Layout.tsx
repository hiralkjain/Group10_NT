import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
          <Sidebar />
          
      <main className="flex-1 overflow-y-auto relative focus:outline-none">
        <div className="py-6 px-4 sm:px-6 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
