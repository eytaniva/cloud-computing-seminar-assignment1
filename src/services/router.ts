import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { BotModeType } from "@components/botMode/types.ts";

// should be env var, but I wanted you to be able to run it locally w/o additional files
const SERVER_URL =
  "https://eyqy43t7w2.execute-api.us-east-1.amazonaws.com/default/open-ai-chatbot";

const server: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  timeout: 3000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
} as CreateAxiosDefaults);

const routerService = {
  openAI: async (userPrompt: string, botMode: BotModeType) =>
    (await server.post("/", { user_prompt: userPrompt, botMode })).data,
};

export default routerService;
