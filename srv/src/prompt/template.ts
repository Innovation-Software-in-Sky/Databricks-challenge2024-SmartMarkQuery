import sqlite3 from 'sqlite3';
import { getLastFiveEntries } from '../logs/getContextHistory';
export const prompt_template = async (dbPath:string,query:string,context:string[]):Promise<string>=>{
    const db = new sqlite3.Database(dbPath);
    let context_string ="Question:"+query+"use the context given below summarize precisely \n";
    for(const ctx of context){
        context_string = context_string + ","+ ctx;
    }
    context_string = context_string + "use following context history for better answers";
    try{
        const history:any = await  getLastFiveEntries(db)
        for(let his of history){
            context_string =context_string + his?.question + his?.answer;
        }
    }catch (error) {
        console.error('Error getting chat history:', error);
      }
    return(context_string)
}
