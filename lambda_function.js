import aws from "aws-sdk";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";

const dynamoDB = new aws.DynamoDB.DocumentClient();
const gemini = new GoogleGenAI({
  apiKey: "AIzaSyAvS7ThZ1dT7nfn_1pS99KgFvcPntbqLF0",
});

const baseResponse = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
};

let aiContext = null;

const lores = {
  "ai assistant": "",
  groot:
    "from the MCU and answer like him answer with only 3 words: I, am, groot. You can use Punctuation marks as you like. try to convey emotions via Punctuation marks.",
  yoda: "from star wars movies.",
};

export const handler = async (event, context, callback) => {
  let response;

  try {
    if (
      event?.requestContext?.http?.method !== "POST" &&
      event?.requestContext?.http?.method !== "OPTIONS"
    ) {
      console.error("Not a POST request");
      response = {
        ...baseResponse,
        statusCode: 500,
        body: JSON.stringify("Not a POST request"),
      };
    } else {
      const id =
        generateId(
          event?.requestContext?.http?.userAgent,
          event?.requestContext?.http?.sourceIp,
        ) || "";
      const body = JSON.parse(event.body);

      if (Object.keys(body).includes("user_prompt")) {
        response = await askGemini(event, context, callback);
      } else if (Object.keys(body).includes("chat_history")) {
        response = await getFromDynamoDB(id, body?.chat_history);
      }
    }
  } catch (error) {
    console.error("Error:", error);
    response = {
      ...baseResponse,
      statusCode: 500,
      body: JSON.stringify(error?.message),
    };
  } finally {
    return response;
  }
};

const saveToDynamoDB = async (userId, userPrompt, aiReply) => {
  const params = {
    TableName: "chat-history",
    Item: {
      "user-id": userId,
      "user-prompt": userPrompt,
      "ai-reply": aiReply,
      timestamp: new Date().getTime(),
    },
  };

  try {
    await dynamoDB.put(params).promise();
    console.log("Data saved to DynamoDB:", params.Item); //logs
  } catch (error) {
    console.error("Error saving to DynamoDB:", error);
  }
};

const getFromDynamoDB = async (userId, limit) => {
  const params = {
    TableName: "chat-history",
    IndexName: "user-name-by-time",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "user-id",
    },
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    ScanIndexForward: false,
    Limit: limit,
  };

  console.log("In getFromDynamoDB", userId, limit, params); //logs

  const data = (await dynamoDB.query(params).promise()).Items.sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  aiContext = gemini.chats.create({
    model: "gemini-2.0-flash",
    history: Array.from({ length: data.length })
      .map((_, i) => [
        { role: "user", parts: [{ text: data[i]["user-prompt"] }] },
        { role: "model", parts: [{ text: data[i]["ai-reply"] }] },
      ])
      .flat(),
  });

  return {
    ...baseResponse,
    statusCode: 200,
    body: JSON.stringify({ chat_history: data }),
  };
};

const askGemini = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const userPrompt = body?.user_prompt ?? "";
  const mode = body?.botMode?.toLowerCase() ?? "ai assistant";
  const id = generateId(
    event?.requestContext?.http?.userAgent,
    event?.requestContext?.http?.sourceIp,
  );

  const fullAiReply = await aiContext.sendMessage({
    message: `Please act like ${mode} ${lores[mode]}. ${userPrompt}. Answer in 2 sentences or less please.`,
  });

  const aiReply = fullAiReply.text;

  console.log(JSON.stringify(body, userPrompt, fullAiReply)); //logs

  await saveToDynamoDB(id, userPrompt, aiReply);

  return {
    ...baseResponse,
    statusCode: 200,
    body: JSON.stringify({ ai_reply: aiReply }),
  };
};

const generateId = (userAgent, ip) => {
  const hash = crypto.createHash("sha256");
  hash.update(`${userAgent}-${ip}`);
  return hash.digest("hex");
};
