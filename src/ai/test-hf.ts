import dotenv from 'dotenv';
dotenv.config();

async function testHF() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const model = 'google/medgemma-1.5-4b-it';
    const endpoint = 'https://router.huggingface.co/v1/chat/completions';

    console.log(`Testing HF with model: ${model}`);
    console.log(`Endpoint: ${endpoint}`);
    console.log(`API Key set: ${!!apiKey}`);

    if (!apiKey) {
        console.error('No API key found in .env');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: 'Say hello in one word' }],
                max_tokens: 10,
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error(`Error: ${response.status} - ${err}`);
            return;
        }

        const data = await response.json();
        console.log('Response:', data.choices[0].message.content);
        console.log('SUCCESS: Hugging Face integration is working with the new model!');
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

testHF();
