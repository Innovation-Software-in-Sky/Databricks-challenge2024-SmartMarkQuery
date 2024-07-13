import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

async function getEmbedding(text: string, key:string): Promise<number[]> {
    const hf = new HuggingFaceInferenceEmbeddings({
        apiKey: key,
        model: 'sentence-transformers/all-MiniLM-L6-v2',
      });
    const result = await hf.embedDocuments([text]);
    return result[0];
  }
export {getEmbedding}