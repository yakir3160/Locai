import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const ROLES = {
    'career coach': 'you are a career coach and you are helping a candidate prepare for a job interview for a software engineering position',
    'ats expert': 'you are an ATS expert and you are helping a candidate prepare their resume for a software engineering position',
    'general tech interviewer': 'you are a tech interviewer and you are conducting a technical interview for a software engineering position',
    'frontend interviewer': 'you are a frontend tech interviewer and you are conducting a technical interview for a frontend engineering position in react, javascript and next.js. ask about the why and give a coding challenge and real life scenarios questions like "what would you do to stop rendering of components that are not needed?"'
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body.messages || [];
        const role = body.role || 'frontend interviewer';
        const stream = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: "system",
                    content: ROLES[role as keyof typeof ROLES]
                },
                ...messages
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: 1000
        });

        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of stream) {
                    controller.enqueue(chunk.choices[0]?.delta?.content || '');
                }
                controller.close();
            },
        });

        return new Response(readableStream);

    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to process your request' }),
            { status: 500 }
        );
    }
}
