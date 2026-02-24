import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const endpoint = 'https://router.huggingface.co/v1/models';

    console.log(`Listing models from: ${endpoint}`);
    console.log(`API Key set: ${!!apiKey}`);

    if (!apiKey) {
        console.error('No API key found in .env');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            const err = await response.text();
            console.error(`Error: ${response.status} - ${err}`);
            return;
        }

        const data = await response.json();
        if (data.data) {
            const models = data.data.map((m: any) => m.id);
            const results = {
                gemma3: models.filter((id: string) => id.includes('gemma-3')),
                mistral: models.filter((id: string) => id.toLowerCase().includes('mistral')),
                medgemma: models.filter((id: string) => id.includes('medgemma'))
            };
            console.log('Search Results:', results);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

listModels();
