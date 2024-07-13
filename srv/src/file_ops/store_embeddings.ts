import sqlite3 from 'sqlite3';
async function storeEmbedding(db: sqlite3.Database, filePath: string, embedding: number[]): Promise<void> {
    const sql = 'INSERT INTO embeddings (file_path, embedding) VALUES (?, ?)';
    await db.run(sql, filePath, JSON.stringify(embedding));
}
export {storeEmbedding}