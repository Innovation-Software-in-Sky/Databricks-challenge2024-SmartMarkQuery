import * as dotenv from 'dotenv';
dotenv.config();
import { retriveEmbeddings } from '../file_ops/retrieve_embeddings';
import { generateResponseWithHuggingFace } from '../llm/custom_huggingface';
import { getEmbedding } from '../file_ops/get_embeddings';
import { readFileContent } from '../file_ops/read_content';
import { cosineSimilarity } from '../file_ops/cosine_similarity';
import { generateResponseWithGemini } from '../llm/custom_gemini';
import { prompt_template } from '../prompt/template';
async function ragService(query:string,dbPath:string,key_llm:string, key_vec:string, client:string){
    try {
        const embeddingsData = await retriveEmbeddings(query,dbPath);
        const queryEmbedding = await getEmbedding(query,key_vec);
        const similarities = embeddingsData.map(item => ({
            ...item,
            similarity: cosineSimilarity(queryEmbedding, Array.from(new Float32Array(item.embedding)))
        }));
        const topK = similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
        const filepaths = topK.map(item => item.file_path);
        let context = [];
        for(const file of filepaths){
            const content  =  await readFileContent(file);
            context.push(content);
        }
        const prompt = await prompt_template(dbPath,query,context) ;

        if(client == "hf"){
            const response = await generateResponseWithHuggingFace(prompt,"gpt2",key_llm,100,0.7);
            return response;
        }
        else if(client == "gemini"){
            const response = await generateResponseWithGemini(prompt,"gemini-1.5-pro",key_llm,2500,0.7,filepaths);
            return response;
        }
        return "No client endpoint";
        
    }
    catch (error) {
        console.error('Error generating response:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

export {ragService}