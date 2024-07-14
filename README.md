# SMART MARK QUERY: Query bot for markdown files powerd by Gen AI

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

## Project Overview

In this project, you will be tasked with creating a Q&A chatbot that utilizes a vector store and Language Model (LLM) to provide accurate responses to user queries. 
You will be provided with the necessary resources to get started, including bootstrap code, input files, and a demo video showcasing the working of the chatbot. 
Your main objectives will be to create a vector store from provided Ubuntu documentation in markdown format and integrate it with the chatbot system.

## Tasks:
Part 1: Create Vector Store
Your first task is to create a vector store using the provided Ubuntu documentation in markdown format. The vector store will serve as the knowledge base for the chatbot. 

Part 2: Create Chatbot using Vector Store and LLM
In the second part of the project, you will build a chatbot that utilizes the vector store created in Part 1 and a Language Model (LLM) to perform Q&A with users. The chatbot should be able to understand user queries, search for relevant answers from the vector store, and provide appropriate responses.

### Requirements:
- Utilize the provided bootstrap code, input files, and demo video to understand the workings of the chatbot.
- Integrate the vector store and LLM into the chatbot codebase.
- Implement a chatbot that can interpret user queries.
- Utilize the vector store to search for relevant answers.
- Generate appropriate responses based on the user's query.
- Implement proper error and exception handling.

### General Requirements:
- Utilize best practices in coding and documentation.
- Follow a modular and organized approach in your code implementation.
- Ensure your code is well-structured, readable, and maintainable.
- Utilize logging for different levels.
- Share your working demo video in the final deliverable


## Tech Stack

- **Frontend**: [React](https://reactjs.org/),[Material UI](https://mui.com/material-ui/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)

## Services
[Google AI Studeo (GCP)](https://ai.google.dev/aistudio)
[Huggingface API Inference](https://huggingface.co/)

- **Storage**: Cloud Storage bucket for storing PDF.
- **AI**: Gemini API, HF Inference API (Sentence Transformer).

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- GCP account (for GAI services)
- HF account (for HF services)

### Set up the project

1. Clone the repository:

   ```bash
   https://github.com/Innovation-Software-in-Sky/Databricks-challenge2024-SmartMarkQuery.git
   npm install

   ```

2. Set up the Environment

   ```bash
   GOTO /srv and read

   ```

3. Build the App

   ```bash
   npm run bootstrap

   ```

4. Start the App
   ```bash
   npm run start

   ```
5. Endpoints
   ```bash
   UI app
      http://localhost:8080/
   [GET] One Time Process - Generate Vectors
      http://localhost:8080/generate_vectors
   [POST] Query the BOT using Gemini:
      http://localhost:8080/generate_response/gemini
      Payload: { "query": "Give me format of account-key assertion"}

   ```

## Technical Architecture
<a href="" float="center">
   <img src="https://github.com/Innovation-Software-in-Sky/Databricks-challenge2024-SmartMarkQuery/blob/main/Smartmarkquery.png" width="7500" height="500">
</a>

## Demo
- [Project Demo Video](https://drive.google.com/file/d/1ZVH3mT9NawRmPK1kajtSoaxwGZXQ_iTG/view?usp=sharing)

## Developer
[Akash Srivastava](https://www.linkedin.com/in/akash-sr-public)

## Contact

Join on [Discord](https://discord.gg/bX9qnBHM) and suggest any feature, give your feeedback and report any bug.


