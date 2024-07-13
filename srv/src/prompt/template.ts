export const prompt_template = async (query:string,context:string[]):Promise<string>=>{
    let context_string ="Question:"+query+"use the context given below summarize precisely \n";
    for(const ctx of context){
        context_string = context_string + ","+ ctx;
    }
    return(context_string)
}
