import express from 'express';
import * as dotenv from 'dotenv';
import {embeddingService} from './services/embeddings_service'
import { ragService } from './services/rag_services';
import path from 'path';
import { clearlogsService, loggingService } from './services/logging_service';

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());

const hf_key = process.env.HUGGINGFACEHUB_API_KEY+"";
const g_key = process.env.GEMINI_API_KEY+"";
const dataPath = path.join(__dirname, 'data');
const dbPath = path.join(__dirname, 'vectors/embeddings.db');

app.get('/generate_vectors', async (req,res)=>{
  try{
    if (!hf_key) {
      throw new Error('API key is not set');
    }
    await embeddingService(dataPath,dbPath,hf_key);
    res.status(200).send('Embedding Created');
  }catch (error) {
    console.error('Error generating embeddings:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/generate_response/hf', async (req, res) => {
  try {
    if (!hf_key) {
      throw new Error('API key is not set');
    }
    const query = req.body.query;
    if (!query) {
      return res.status(400).send({ error: 'Query is required' });
  }
    const client ="hf";
    const result = await ragService(query,dbPath,hf_key,hf_key,client)

    res.json({ result });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/generate_response/gemini', async (req, res) => {
  try {
    if (!g_key) {
      throw new Error('API key is not set');
    }
    const query = req.body.query;
    if (!query) {
      return res.status(400).send({ error: 'Query is required' });
  }
    const client = "gemini";
    const result = await ragService(query,dbPath,g_key,hf_key,client)
    await loggingService(dbPath,query,JSON.stringify(result))
    res.json({ result });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/clearlogs', async (req, res) => {
  try{
    await clearlogsService(dbPath);
    res.status(200).send('Cleared logs');
  }catch (error) {
    console.error('Error clearing logs:', error);
    res.status(500).send('Internal Server Error');
  }
})

const clientBuildPath = path.join(__dirname, '../../app/build');
app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
