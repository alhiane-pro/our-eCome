import { Header, Navbar, Footer } from "@/components/common";
import { ToastContainer } from "@/components/feedback";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <div className={container}>
      <ToastContainer position="bottom-right" />
      <Header />
      <Navbar />
      <main className={wrapper}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
