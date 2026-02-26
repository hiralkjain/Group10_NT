import Header from "./Header";
import Container from "./Container";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
}

export default DashboardLayout;
