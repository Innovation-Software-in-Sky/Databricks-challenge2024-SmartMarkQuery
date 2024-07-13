import sqlite3 from 'sqlite3';
import { getFiles } from '../file_ops/get_files';
import { readFileContent } from '../file_ops/read_content';
import { getEmbedding } from '../file_ops/get_embeddings';
import { storeEmbedding } from '../file_ops/store_embeddings';
import * as dotenv from 'dotenv';
dotenv.config();

async function embeddingService(dataPath:string,dbPath:string,key:string){
  const db = new sqlite3.Database(dbPath);
  await new Promise<void>((resolve, reject) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS embeddings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_path TEXT,
        embedding TEXT
      )
    `, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const files = await getFiles(dataPath,'.md');
  for (const file of files) {
    const content = await readFileContent(file);
    const embedding = await getEmbedding(content,key);
    await storeEmbedding(db, file, embedding);
  }

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

export {embeddingService}