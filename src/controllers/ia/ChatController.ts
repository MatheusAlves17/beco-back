import { Request, Response } from "express";

import prismaClient from '../../prisma';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


class ChatController {
    async handle(req: Request, res: Response) {

        const { question } = req.body;

        const modelChat = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const products = await prismaClient.prismaClient.product.findMany();

        async function generateEmbedding(text, model) {
            const result = await model.embedContent(text);
            return result.embedding.values;
        }

        async function calculateSimilarity(embedding1, embedding2) {
            const dotProduct = embedding1.reduce((sum, value, index) => sum + value * embedding2[index], 0);
            const norm1 = Math.sqrt(embedding1.reduce((sum, value) => sum + value * value, 0));
            const norm2 = Math.sqrt(embedding2.reduce((sum, value) => sum + value * value, 0));
            return dotProduct / (norm1 * norm2);
        }

        async function run() {
            const model = genAI.getGenerativeModel({ model: "embedding-001" });

            const productEmbeddings = await Promise.all(
                products.map(async product => ({
                    id: product.id,
                    name: product.name,
                    banner: product.path,
                    price: product.price,
                    description: product.description,
                    embedding: await generateEmbedding(product.description, model)
                }))
            );

            const userQueryEmbedding = await generateEmbedding(question, model);
            const similarities = await Promise.all(
                productEmbeddings.map(async product => ({
                    id: product.id,
                    name: product.name,
                    banner: product.banner,
                    price: product.price,
                    description: product.description,
                    similarity: await calculateSimilarity(userQueryEmbedding, product.embedding)
                }))
            );

            similarities.sort((a, b) => b.similarity - a.similarity);

            const topProducts = similarities.slice(0, 3);

            const chat = modelChat.startChat({
                history: [
                  {
                    role: "user",
                    parts: [{ text: "Evento: Formatura, estilo: moderno" }],
                  },
                  {
                    role: "model",
                    parts: [{ text: "Para um evento de formatura, os melhores modelos de relógios seriam minimalistas" }],
                  },
                ],
                generationConfig: {
                  maxOutputTokens: 100,
                },
                
            });

            const result = await chat.sendMessage(question);
            const response = await result.response;
            const text = response.text();

            return res.json({ message: text, products: topProducts });
        }
        run();
    }

}

export { ChatController };