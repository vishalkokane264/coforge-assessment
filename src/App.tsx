import { Link, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>|
        <Link to="/character">data-table</Link>
      </nav>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default App;
