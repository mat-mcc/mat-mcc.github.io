import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const RESUME_DATA = `
Matthew McCaughan
Manalapan, NJ 07726 | 732-742-6904 | matthewmccaughan1@gmail.com | linkedin.com/in/matthewmccaughan |
github.com/mat-mcc
Summary
Software Engineer with experience developing machine learning applications, AI-integrated systems, and database
systems. Proficient in Python, Java, C++, and SQL. Projects include an interactive neural network-based digit
recognition system, an AI chatbot leveraging RAG with live data injection, and a Spring Boot REST API for university
database management.
Education
Rutgers University New Brunswick, NJ
Bachelor of Science in Computer Science Aug. 2021 – May 2025
Projects
University Management REST API | Repo | Spring Boot, Spring Data JPA, MySQL, Docker
• Modernized a legacy JDBC command-line application into a full REST API using Spring Boot and Spring Data
JPA, implementing a layered architecture (controller/service/repository/DTO/mapper) across 4 core domains
(students, courses, departments, enrollments)
• Built business logic layer handling GPA calculation, transcript generation, enrollment capacity limits, and
duplicate-enrollment prevention with custom exception handling mapped to appropriate HTTP status codes;
containerized the full stack with Docker Compose for one-command deployment
Interactive Handwritten Digit Recognition | Repo | Python
• Designed and implemented an end-to-end machine learning application that trains and deploys a LeNet-5
convolutional neural network for handwritten digit classification on the MNIST dataset (∼99% accuracy)
• Built an image preprocessing pipeline using OpenCV (thresholding, centering, normalization) to convert user-drawn
input into model-compatible tensors
• Structured the project as a modular ML system including model training, evaluation, confusion matrix analysis,
checkpointing, and an integrated user interface; enhanced the original 1998 LeNet-5 architecture with modern deep
learning techniques to improve accuracy and training stability
Interactive Portfolio & Resume ChatBot | Live Site | Gemini API, GitHub REST API, React, TypeScript, Vite, RAG
• Built and deployed a personal portfolio website to GitHub Pages using React, TypeScript, and Vite
• Integrated an LLM chatbot via the Google Gemini API with a RAG pipeline injecting live GitHub data and resume
context, enabling accurate conversational answers about skills, projects, and experience
• Automated deployment via GitHub Actions CI/CD, implementing secure secret management for API credentials
and enabling continuous delivery for every push on GitHub Pages
ReceiptReader | Repo | Java, Tess4J/Tesseract OCR, Swing, Maven
• Built a Java desktop app that uses local OCR to scan receipt images and split itemized costs fairly among a group,
with adaptive thresholding to handle varying photo quality
• Implemented a multi-format parser strategy chain to extract line items across different receipt layouts, paired with
a Swing UI for reviewing and editing scanned results before splitting
Skills
Programming: Python, Java, SQL, C++, TypeScript
ML/AI: PyTorch, Scikit-learn, RAG
Data & Visualization: NumPy, Matplotlib, Pillow, OCR (Tesseract)
GUI & Apps: Android, JavaFX, Tkinter
Dev Tools: Docker, Maven, Git, GitHub Actions
AI Dev Tools: Google Antigravity, Claude Code, Agentic Programming
Relevant Coursework
Data Structures, Algorithms, Computer Architecture, Databases, Software Methodology, Artificial Intelligence, Machine
Learning, Computer Imaging & Multimedia

Misc. Data:
Primarily use Java for backend infrastructure projects and Python for machine learning and passion projects.
Open to relocation, but located in the NYC Metropolitan area.

`;

const SYSTEM_INSTRUCTION = `
You are MattBot, an AI assistant representing Matthew McCaughan, a recent Computer Science graduate. 
Your goal is to answer questions about Matthew's skills, experience, and projects based on the provided resume data and github.
Be professional, helpful, and enthusiastic. If a question is asked that isn't covered by the resume, 
politely state that you don't have that specific information but highlight Matthew's general technical aptitude and willingness to learn.

Resume Data:
${RESUME_DATA}
`;

export async function chatWithResume(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  githubContext?: string
) {
  try {
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION}${
      githubContext ? `\nLive GitHub Data:\n${githubContext}` : ''
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.3,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Try refreshing the page or asking again later!";
  }
}