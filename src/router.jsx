import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

import { CharacterDetails } from "./pages/CharacterDetails.tsx";
import CharacterList from "./pages/CharacterList.tsx";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character",
  component: CharacterList,
});

const characterDetailsRoute = createRoute({
  getParentRoute: () => characterRoute, // Ensure characterRoute is the parent
  path: ":id", // Use relative path for nested route
  component: CharacterDetails,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <div>Page Not Found</div>,
});

const router = createRouter({
  defaultNotFoundComponent: () => <div>Page Not Found</div>, // Add defaultNotFoundComponent
  routeTree: rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    characterRoute.addChildren([characterDetailsRoute]), // Ensure proper nesting
    notFoundRoute,
  ]),
});

export default router;
