import { generateSickleCellQuestions } from './flows/generate-sickle-cell-questions';
import { ai } from './genkit';
import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const logStream = fs.createWriteStream('test_log.txt', { flags: 'w' });
function log(msg: string) {
    console.log(msg);
    logStream.write(msg + '\n');
}

async function testMedGemma() {
    log('Testing MedGemma Question Generation START...');
    try {
        const actions = await ai.registry.listActions();
        fs.writeFileSync('models.json', JSON.stringify(Object.keys(actions), null, 2));
        log('Registry actions fetched. Count: ' + Object.keys(actions).length);

        log('Attempting generation with MedGemma model...');
        const result = await generateSickleCellQuestions({
            topic: 'Genetics of Sickle Cell Disease',
            count: 1
        });

        log('Generation completed successfully!');
        log('Result: ' + JSON.stringify(result, null, 2));
    } catch (error) {
        log('Error during MedGemma test:');
        if (error instanceof Error) {
            log('Message: ' + error.message);
            log('Stack: ' + error.stack);
        } else {
            log(JSON.stringify(error, null, 2));
        }
    }
    log('Testing MedGemma Question Generation END.');
    logStream.end();
}

testMedGemma();
