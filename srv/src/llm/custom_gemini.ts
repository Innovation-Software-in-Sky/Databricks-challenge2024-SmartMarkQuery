const { GoogleGenerativeAI } = require("@google/generative-ai");
async function generateResponseWithGemini(prompt: string,model_name:string, key:string, tokens:number, temperature:number, reference:string[]): Promise<any> {
    
    try {
        const apiKey = key;
        if (!apiKey) {
            throw new Error('API key is not set');
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const generationConfig = {
            maxOutputTokens: tokens,
            temperature: temperature,
          };
        const model = genAI.getGenerativeModel({ model: model_name, generationConfig:generationConfig});

          const result = await model.generateContent(prompt);
          const message:string = result.response.candidates[0].content.parts[0].text+"";

        return {message:message, reference:reference};
    } catch (error) {
        console.error('Error generating response from LLM:', error);
        return 'Sorry, I encountered an error while processing your request.';
    }
}
export {generateResponseWithGemini}