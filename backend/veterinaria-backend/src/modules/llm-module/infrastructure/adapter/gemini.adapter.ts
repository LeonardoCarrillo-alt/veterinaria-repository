/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import {
  LlmPort,
  LlmGenOptions,
  LlmTextOutput,
  LlmMessage,
} from '../../domain/ports/llm.port';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class GeminiAdapter implements LlmPort {
  private client: any;
  private templatesDir = path.resolve(
    process.cwd(),
    'backend/veterinaria-backend/templates',
  );

  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.templatesDir = path.resolve(
      process.cwd(),
      process.env.PROMPT_TPL_DIR ?? 'templates',
    );
  }

  async complete(
    prompt: string,
    options: LlmGenOptions,
  ): Promise<LlmTextOutput> {
    try {
      const model = this.client.getGenerativeModel({
        model: options.model.name,
        generationConfig: {
          temperature: options.temperature,
          topP: options.topP,
          stopSequences: options.stop,
          maxOutputTokens: options.maxTokens,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        text: text ?? '',
        tokens: { total: response.usageMetadata?.totalTokenCount },
        raw: response,
      };
    } catch (error) {
      console.error('Error in Gemini complete:', error);
      throw new Error(`Gemini API error: ${(error as Error).message}`);
    }
  }

  async chat(
    messages: LlmMessage[],
    options: LlmGenOptions,
  ): Promise<LlmTextOutput> {
    try {
      const model = this.client.getGenerativeModel({
        model: options.model.name,
        generationConfig: {
          temperature: options.temperature,
          topP: options.topP,
          stopSequences: options.stop,
          maxOutputTokens: options.maxTokens,
        },
      });

      // Convertir mensajes al formato que espera Gemini
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
      });

      // Obtener el último mensaje del usuario para enviar
      const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
      const userMessage =
        lastUserMessage?.content ||
        messages[messages.length - 1]?.content ||
        '';

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      return {
        text: text ?? '',
        tokens: { total: response.usageMetadata?.totalTokenCount },
        raw: response,
      };
    } catch (error) {
      console.error('Error in Gemini chat:', error);
      throw new Error(`Gemini API error: ${(error as Error).message}`);
    }
  }

  async embed(
    texts: string[],
    options: Pick<LlmGenOptions, 'model'>,
  ): Promise<number[][]> {
    const res = await this.client.embeddings({
      model: options.model.name,
      input: Array.isArray(texts) ? texts.join('\n\n') : String(texts),
    });
    const vec = Array.isArray(res?.embedding?.[0])
      ? res.embedding
      : [res?.embedding];
    return vec as number[][];
  }

  async stream?(
    messages: LlmMessage[] | string,
    options: LlmGenOptions,
    onToken: (t: string) => void,
  ) {
    // const stream = await this.client.chat({ ..., stream: true });
    // let full = '';
    // for await (const chunk of stream) {
    //   const piece = chunk?.message?.content ?? '';
    //   full += piece;
    //   onToken(piece);
    // }
    // return { text: full };
    // Fallback no-stream:
    const res = await this.chat(
      Array.isArray(messages)
        ? messages
        : [{ role: 'user', content: messages }],
      options,
    );
    onToken?.(res.text);
    return res;
  }

  async getChatPrompt(userQuestion: string): Promise<string> {
    const templatePath = path.join(this.templatesDir, 'singleQuestion.v1.md');
    const template = await fs.readFile(templatePath, 'utf8');
    return template.replace('{{user_question}}', userQuestion);
  }

  async askChatQuestion(userQuestion: string, options: LlmGenOptions) {
    const prompt = await this.getChatPrompt(userQuestion);
    return this.complete(prompt, options);
  }
}
