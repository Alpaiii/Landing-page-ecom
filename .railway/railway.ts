import { defineRailway, github, preserve, project, service } from "railway/iac";

export const partial = "Landing-page-ecom";

export default defineRailway(() => {
  const LandingPageEcom = service("Landing-page-ecom", {
    source: github("Alpaiii/Landing-page-ecom", { branch: "main", checkSuites: false }),
    build: "npm ci && npm run build",
    start: "node server/scripts/migrate.js && node server/scripts/seed.js && node server/dist/index.js",
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
