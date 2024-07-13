import sqlite3 from 'sqlite3';;
function retriveEmbeddings(query: string, dbPath:string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath);
        const sql = `SELECT id, file_path, embedding FROM embeddings`;
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export {retriveEmbeddings}

