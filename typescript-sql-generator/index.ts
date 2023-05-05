import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? "";
const OPENAI_ORGANIZATION: string = process.env.OPENAI_ORGANIZATION ?? "";

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORGANIZATION,
});

const openai: OpenAIApi = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create a SQL request to ${req.body.message}`,
        }
      ]
    });
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
