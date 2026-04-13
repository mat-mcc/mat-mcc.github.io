# Portfolio Website with AI-Powered Resume Chatbot (Mattbot) 

My portfolio website built with **React**, **TypeScript**, and **Vite**, with a live GitHub integration and **MattBot**, an interactive AI resume assistant built with the **Gemini API**.


## Features

-   **MattBot (AI Assistant):** An interactive chatbot grounded in my professional resume data using **RAG (Retrieval-Augmented Generation) principles**. It can answer specific questions about my experience, education, and skills.
-   **Live GitHub Integration:** Dynamically fetches and displays my latest projects directly from the **GitHub REST API**.
-   **CI/CD:** Automated deployment pipeline to **GitHub Pages** via GitHub Actions.

## Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI/ML:** Google Gemini API
-   **Build Tool:** Vite
-   **Deployment:** GitHub Actions & GitHub Pages

## How MattBot Works

MattBot uses a **Contextual Grounding** approach. Resume data is stored as a structured string within the application. When a user sends a message:
1.  The application retrieves the latest repository data from GitHub.
2.  It combines the static resume data and live GitHub context into a **System Instruction**.
3.  The Gemini model processes the user's query within this specific context, ensuring answers are accurate and relevant to my educational and professional background.
