import { z } from "zod";

export const skillsOverviewSchema = z.object({
  frontend: z
    .array(z.string())
    .describe("Frontend frameworks, libraries, rendering tools, style packages, or static generators."),
  backend: z
    .array(z.string())
    .describe("Backend programming languages, APIs, routers, server frameworks, or runtimes."),
  mobile: z
    .array(z.string())
    .describe("Mobile operating system platforms, native wrappers, build managers, or app toolkits."),
  ai: z
    .array(z.string())
    .describe("Machine learning structures, large language model providers, pipelines, or agents."),
  devops: z
    .array(z.string())
    .describe("Container images, action tasks, script orchestrations, or monitoring setups."),
  cloud: z
    .array(z.string())
    .describe("Cloud server hosting layers, database providers, CDN delivery routes, or serverless engines."),
  database: z
    .array(z.string())
    .describe("Relational engines, document databases, memory stores, ORM managers, or database components."),
});
