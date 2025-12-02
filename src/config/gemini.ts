import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini API configuration from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key is not configured. AI features will be unavailable.');
}

// Initialize Gemini AI
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Get the Gemini Pro model for text generation
export const getGeminiModel = (modelName: string = 'gemini-pro') => {
  if (!genAI) {
    throw new Error('Gemini API is not configured');
  }
  return genAI.getGenerativeModel({ model: modelName });
};

// Helper function to generate text
export const generateText = async (prompt: string): Promise<string> => {
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// Helper function for chat conversations
export const createChat = (modelName: string = 'gemini-pro') => {
  const model = getGeminiModel(modelName);
  return model.startChat();
};

export default genAI;
