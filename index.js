// embeddings
/* const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001"});

  const text = "The quick brown fox jumps over the lazy dog."

  const result = await model.embedContent(text);
  const embedding = result.embedding;
  console.log(embedding.values);
}

run(); */

// Streaming for faster and partial results.
/* const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require('fs');
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "What is it actually in the logo?";

  const imageParts = [
    fileToGenerativePart("image.jpeg", "image/jpeg"),
    // you can add more images here and compare them as per convenience.
  ];

  const result = await model.generateContentStream([msg, ...imageParts]);


  let text = "What is this about?";
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

  //...
  const response = await result.response;
  const final = response.text();
  console.log(final);
}

run(); */

// https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node#generate-text-from-text-and-image-input

/* const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "What's the best thing about this picture?";

  const imageParts = [
    fileToGenerativePart("image.jpeg", "image/jpeg"),
    // you can add more images here and compare them as per convenience.
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run(); */

// https://ai.google.dev/gemini-api/docs/get-started/tutorial?lang=node#generate-text-from-text-input

// const { GoogleGenerativeAI } = require("@google/generative-ai");
/* import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
// const dotenv = require('dotenv');
import dotenv from "dotenv";
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

// const generationConfig = {
//   stopSequences: ["red"],
//   maxOutputTokens: 200,
//   temperature: 0.9,
//   topP: 0.1,
//   topK: 16,
// };

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,  generationConfig});

async function run() {
  const prompt = "how to be smart?"

  const result = await model.generateContent(prompt);
  // Use streaming with text-only input
  // const result = await model.generateContentStream(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();  */


