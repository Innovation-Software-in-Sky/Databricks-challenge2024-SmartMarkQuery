import { HuggingFaceInference } from '@langchain/community/llms/hf';
async function generateResponseWithHuggingFace(prompt: string,model_name:string, key:string, tokens:number, temperature:number): Promise<string> {
    
    try {
        const apiKey = key;
        if (!apiKey) {
            throw new Error('API key is not set');
        }

        const model = new HuggingFaceInference({
            model: model_name,
            temperature: temperature,
            maxTokens: tokens,
            apiKey: apiKey,
          });
          const result = await model.invoke(prompt);

        return result;
    } catch (error) {
        console.error('Error generating response from LLM:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}

export {generateResponseWithHuggingFace}