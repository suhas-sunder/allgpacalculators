import { route, index, type RouteConfig } from "@react-router/dev/routes";

export default [
  // Home page
  index("routes/home.tsx"),

  // Calculators landing page
  route("/calculators", "routes/calculators/index.tsx"),
] satisfies RouteConfig;
