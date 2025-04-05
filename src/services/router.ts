import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

// should be env var, but I wanted you to be able to run it locally w/o additional files
const SERVER_URL = "http://localhost:3001";

const SERVER_NAME = "router"; // TODO: Rename router in the task

const server: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}/${SERVER_NAME}`,
  timeout: 3000,
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
} as CreateAxiosDefaults);

const routerService = {
  getAll: async () => (await server.get("/")).data,
};

export default routerService;
