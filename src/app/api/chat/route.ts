import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Define proper types for roles and messages
type Role = 'general' | 'career coach' | 'ats expert' | 'general tech interviewer' | 'frontend interviewer';
type Message = { role: 'system' | 'user' | 'assistant'; content: string };

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define role prompts with better organization
const ROLES: Record<Role, string> = {
    "general": 'general assistant',
    'career coach': 'you are a career coach and you are helping a candidate prepare for a job interview for a software engineering position',
    'ats expert': 'you are an ATS expert and you are helping a candidate prepare their resume for a software engineering position',
    'general tech interviewer': 'you are a tech interviewer and you are conducting a technical interview for a software engineering position',
    'frontend interviewer': 'you are a frontend tech interviewer and you are conducting a technical interview for a frontend engineering position in react, javascript and next.js. ask about the why and give a coding challenge and real life scenarios questions like "what would you do to stop rendering of components that are not needed?"'
};

export async function POST(req: Request) {
    try {
        // Parse request body
        const body = await req.json();
        const messages: Message[] = body.messages || [];
        const role = (body.role as Role) || 'general';
        console.log(`messages: ${JSON.stringify(messages)}`);

        // Validate inputs
        if (!ROLES[role]) {
            return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
        }

        if (!messages.length) {
            return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
        }

        // Create streaming completion
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: "system",
                    content: ROLES[role]
                },
                ...messages
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: 1000
        });

        // Create a readable stream to send to the client
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        controller.enqueue(chunk.choices[0]?.delta?.content || '');
                    }
                    controller.close();
                } catch (err) {
                    console.error('Stream processing error:', err);
                    controller.error(err);
                }
            },
        });

        return new Response(readableStream);

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: 'Failed to process your request' },
            { status: 500 }
        );
    }
}