import { BotModeType } from "@components/botMode/types.ts";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

// should be env var, but I wanted you to be able to run it locally w/o additional files
const SERVER_URL =
  "https://ek3hdkivy7cpy4jzw3ge325bba0lrhch.lambda-url.us-east-1.on.aws/";

const server: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  timeout: 3000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
} as CreateAxiosDefaults);

const routerService = {
  openAI: async (userPrompt: string, botMode: BotModeType) =>
    (await server.post("/", { user_prompt: userPrompt, botMode })).data
      ?.ai_reply,
};

export default routerService;
