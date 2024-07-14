import sqlite3 from 'sqlite3';
import * as dotenv from 'dotenv';
import { addLogs } from '../logs/addlogs';
import { deleteTable } from '../logs/clearlogs';
dotenv.config();

async function loggingService(dbPath:string,question: string, answer: string){
    const db = new sqlite3.Database(dbPath);
    await new Promise<void>((resolve, reject) => {
        db.exec(`
      CREATE TABLE IF NOT EXISTS logtable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      await addLogs(db,question,answer)

      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('Database connection closed.');
        }
      });

}

async function clearlogsService(dbPath:string){
  const db = new sqlite3.Database(dbPath);
  await deleteTable(db);
}


export {loggingService, clearlogsService}
