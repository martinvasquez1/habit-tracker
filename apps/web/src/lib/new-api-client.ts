import { Api, Configuration } from "@repo/open-api";
import apiWithInterceptors from "@/lib/api-client";

const config = new Configuration();

export const api = new Api(config, undefined, apiWithInterceptors);