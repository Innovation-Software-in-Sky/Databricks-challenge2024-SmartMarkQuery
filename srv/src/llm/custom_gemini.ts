const { GoogleGenerativeAI } = require("@google/generative-ai");
async function generateResponseWithGemini(prompt: string,model_name:string, key:string, tokens:number, temperature:number): Promise<string> {
    
    try {
        const apiKey = key;
        if (!apiKey) {
            throw new Error('API key is not set');
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const generationConfig = {
            maxOutputTokens: tokens,
            temperature: temperature,
            topP: 0.1,
            topK: 16,
          };
        const model = genAI.getGenerativeModel({ model: model_name, generationConfig:generationConfig});

          const result = await model.generateContent(prompt);

        return result;
    } catch (error) {
        console.error('Error generating response from LLM:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}
export {generateResponseWithGemini}