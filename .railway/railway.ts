import { defineRailway, github, preserve, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "Landing-page-ecom";
export default defineRailway(() => {
  const LandingPageEcom = service("Landing-page-ecom", {
    // builder from CaC: "NIXPACKS"
    source: github("Alpaiii/Landing-page-ecom", { branch: "main", checkSuites: false }),
    build: "npm install && cd server && npm install && cd .. && npm run build",
    start: "cd server && npm run migrate && npm run seed && npm start",
    healthcheck: "/",
    healthcheckTimeout: 300,
    replicas: { "iad": 1 },
    networking: { privateNetworkEndpoint: "landing-page-ecom" },
    env: { CORS_ORIGIN: preserve(), JWT_SECRET: preserve(), NODE_ENV: preserve() },
  });

  return project("stellar-imagination", {
    variables: { managed: true },
    resources: [LandingPageEcom],
  });
});
