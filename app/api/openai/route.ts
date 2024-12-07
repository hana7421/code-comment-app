import { NextResponse, NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';
import type { OpenaiTypes } from '@/types';

export async function POST(req: NextRequest) {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });//yo

        const schema = z.object({
            score: z.number(),
            feedback: z.string(),
        });

        const { prompt, model, system } = (await req.json()) as OpenaiTypes;

        const completion = await openai.beta.chat.completions.parse({
            model: model,
            messages: [
                { role: "system", content: system },
                { role: "user", content: prompt },
            ],
            response_format: zodResponseFormat(schema, "schema"),
        });

        const response = completion.choices[0].message.parsed;
        console.log(response);
//hello
        return NextResponse.json(response);
    } catch (e) {
        console.error('Error during OpenAI API call:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
