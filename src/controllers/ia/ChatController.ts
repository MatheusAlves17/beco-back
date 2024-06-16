import { Request, Response } from "express";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


class ChatController {
    async handle(req: Request, res: Response) {

        const { question } = req.body;

        async function run() {
            // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: "Olá, gostaria tenho um evento e não decidi o modelo do relógio" },
                            // {text: "Evento: Casamento"},
                            // {text: "Evento: Jantar"},
                            // {text: "Evento: Casual"},
                            // {text: "Evento: Corporativo"},
                            // {text: "Estilo: Clássico"},
                            // {text: "Estilo: Moderno"},
                            // {text: "Estilo: Esportivo"},
                            // {text: "Estilo: Elegante"},

                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: "Claro! Aqui nós temos alguns modelos perfeitos"
                            },
                            // {
                            //     text: "Conte-me mais, é para um evento formal?"
                            // },
                            // {
                            //     text: "O modelo Relógio Movado Couro Preto é perfeito para os eventos: formatura, casamento, jantar, corporativo"
                            // },
                            // {
                            //     text: "O modelo Relógio Movado Couro Preto é perfeito para os estilos: clássico, elegante"
                            // },
                            // {
                            //     text: "O modelo Relógio Preto é perfeito para os eventos: formatura, casamento, jantar"
                            // },
                            // {
                            //     text: "O modelo Relógio Preto é perfeito para os estilos: esportivo, elegante"
                            // },
                            // {
                            //     text: "O modelo Relógio Saint Germain Bronx 40mm é perfeito para os eventos: formatura, jantar, casual"
                            // },
                            // {
                            //     text: "O modelo Relógio Saint Germain Bronx 40mm é perfeito para os estilos: moderno, esportivo"
                            // },
                        ],
                    },
                    {
                        role: 'user',
                        parts: [{ text: "Evento: Formatura" }]
                    },
                    {
                        role: 'model',
                        parts: [{ text: "O modelo Relógio Movado Couro Preto é perfeito para os eventos: formatura, casamento, jantar, corporativo" }]
                    },
                    {
                        role: 'user',
                        parts: [{ text: "Estilo: Moderno" }]
                    },
                    {
                        role: 'model',
                        parts: [{ text: "O modelo Relógio Movado Couro Preto é perfeito para os eventos: formatura, casamento, jantar, corporativo" }]
                    },
                    {
                        role: 'model',
                        parts: [{ text: "O modelo Relógio Movado Couro Preto é perfeito para os estilos: clássico, elegante" }]
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 100,
                },
            });

            const result = await chat.sendMessage(question);
            const response = await result.response;
            const text = response.text();

            return res.json({ message: text })
        }

        run();
    }
}

export { ChatController };