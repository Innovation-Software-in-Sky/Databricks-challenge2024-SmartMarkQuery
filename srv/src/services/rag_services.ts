import * as dotenv from 'dotenv';
dotenv.config();
import { retriveEmbeddings } from '../file_ops/retrieve_embeddings';
import { generateResponseWithHuggingFace } from '../llm/custom_huggingface';
import { getEmbedding } from '../file_ops/get_embeddings';
import { readFileContent } from '../file_ops/read_content';
import { cosineSimilarity } from '../file_ops/cosine_similarity';
import { generateResponseWithGemini } from '../llm/custom_gemini';
import { prompt_template } from '../prompt/template';
const faiss = require('faiss-node');
const fs = require('fs');
async function ragService(query:string,dbPath:string,key_llm:string, key_vec:string, client:string){
    try {
        const embeddingsData = await retriveEmbeddings(query,dbPath);
        const queryEmbedding = await getEmbedding(query,key_vec);
        const index = new faiss.IndexFlatL2(384); 
        const similarities = embeddingsData.map(item => ({
            ...item,
            similarity: cosineSimilarity(queryEmbedding, JSON.parse(item.embedding))
        }));
        const indexing = embeddingsData.map(item =>{
            index.add(JSON.parse(item.embedding));
            const { distances, labels } = index.search(queryEmbedding, 1);
            return {
                ...item,
                distances:distances,
                labels:labels

            }
        } );
        const topK_cosine = similarities.sort((a, b) => a.similarity - b.similarity);
        const topK_index = indexing.sort((a, b) => a.distances - b.distances);
        const top5 = [...topK_cosine.slice(0,5),...topK_index.slice(0,5)];
        const filepaths = top5.map(item => item.file_path);
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