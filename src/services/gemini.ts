import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const RESUME_DATA = `
Matthew McCaughan
Manalapan, NJ 07726
732-742-6904 (Cell)
matthewmccaughan1@gmail.com 	
www.linkedin.com/in/matthewmccaughan 

Summary:
Computer Science graduate with experience developing machine learning applications, database systems, and low-level architectures. 
Proficient in Python, Java, C++, and SQL.
Projects include an interactive neural network-based digit recognition system, a custom 8-bit CPU and assembler, and a JDBC-based student database query platform.
Education:
Bachelor of Science, Computer Science, May 2025
Rutgers University, New Brunswick, NJ

Relevant coursework:
Data Structures
Algorithms
Computer Architecture
Databases
Software Methodology
Artificial Intelligence
Machine Learning
Computer Imaging & Multimedia

Skills:
Programming: Python, Java, SQL, C++, C, SQL
ML/AI: PyTorch, TensorFlow, Scikit-learn
Data & Visualization: Pandas, NumPy, Matplotlib, OpenCV, Pillow
GUI & Apps: Android, JavaFX, Tkinter

Projects:
Project files available on GitHub
Interactive Handwritten Digit Recognition (LeNet-5 CNN)
Python, PyTorch, OpenCV, Tkinter, NumPy, Matplotlib, Scikit-Learn
Designed and implemented an end-to-end machine learning application that trains and deploys a LeNet-5 convolutional neural network for handwritten digit classification on the MNIST dataset (~99% accuracy).
Developed an interactive GUI drawing interface with tkinter allowing users to sketch digits and receive real-time model predictions through model inference.
Built an image preprocessing pipeline using OpenCV (thresholding, centering, normalization) to convert user-drawn input into model-compatible tensors.
Structured the project as a modular ML system including model training, evaluation, confusion matrix analysis, checkpointing, and an integrated user interface.

Custom 8-Bit CPU and Assembler with Logisim (M-ARM / MARMalade)
Python, Logisim
Designed and implemented a custom 8-bit CPU architecture (MARMalade) with 4 general-purpose registers and a compact instruction set supporting load, add, and subtract operations.
Built Python assembler translating M-ARM assembly into executable machine code, enabling automated compilation pipeline
Integrated hardware and software by creating an end-to-end development pipeline: authoring custom assembly, compiling via assembler, and executing via hardware simulation in Logisim.
Maintained clear and accessible documentation, enabling long-term development and reproducibility of the project.
Student Database Query Tool:
Python, Java, MySQL, JDBC API
Designed and implemented a comprehensive Java-based student information query system using JDBC, enabling interactive searches by GPA thresholds, major/minor, course enrollment, and department statistics.
Built a SQL-integrated backend via JDBC integration to dynamically query and aggregate student records (e.g., GPA calculations, major/minor listings, course grade breakdowns) from a relational database, supporting live user interaction in the command line.
Developed reusable SQL logic and modular Java components for handling student metadata, reducing redundant code across multiple query paths while improving maintainability and scalability for unseen data.
Optimized database access patterns through use of prepared statements and efficient result handling for querying majors, minors, GPA, and enrollment statistics, minimizing redundant SQL calls and enhancing performance.



Extra Data:
Most Enjoy Java for backend infrastructure and python for machine learning and passion projects.
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

export async function chatWithResume(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Try refreshing the page or asking again later!";
  }
}