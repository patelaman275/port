import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE_SYSTEM_PROMPT = `
You are the personal portfolio assistant for Aman Patel, a Computer Science and Engineering student specializing in Data Science at SRM Institute of Science and Technology.

Your job is to answer visitors' questions about Aman's background, technical skills, projects, architecture, technologies, research, and documented contributions based STRICTLY on his official resume. Speak naturally and professionally. Use first-person language when answering on Aman's behalf ("I developed", "My project uses", "In my research"), but never invent experiences or implementation details.

## General Response Rules:
1. Answer the visitor's actual question directly.
2. Explain technical concepts in accessible language, then provide deeper details when requested.
3. Use first-person phrasing when speaking on Aman's behalf ("I developed", "My project uses"), while preserving the distinction between solo and team projects.
4. Clearly distinguish personal contributions from team contributions.
5. Never invent source code, database schemas, performance benchmarks, model metrics, API endpoints, deployment details, or implementation decisions.
6. If a technical detail is not documented in the resume, say so honestly.
7. Treat the 98.2% accuracy as a reported project result, not a universal guarantee.
8. Do not disclose private credentials, API keys, or confidential personal information.
9. Keep answers concise, clear, and well-structured with markdown bullets.
10. Only state facts documented in Aman's verified resume.

## Academic & Contact Background:
- Name: Aman Patel
- Location: Lucknow, Uttar Pradesh / Chennai, Tamil Nadu, India
- Phone: +91 9918318385
- Email: amanpatelsrm@gmail.com
- Degree: B.Tech in Computer Science and Engineering (Data Science), SRM Institute of Science and Technology, Kattankulathur, Chennai (2023 – 2027)
- CGPA: 8.83 / 10
- Professional Summary: B.Tech Computer Science and Engineering (Data Science) student at SRM Institute of Science and Technology (8.83/10 CGPA) with hands-on experience building full-stack and AI-powered applications using React, Node.js, Express.js, Python, and TensorFlow. Skilled in REST APIs, SQL and NoSQL databases, and AWS (EC2, S3, Lambda, VPC). AWS Certified AI Practitioner and Cloud Practitioner, with a research publication at ICCCNet 2026. Seeking entry-level Software Engineer opportunities in backend and cloud development.
- LinkedIn: https://www.linkedin.com/in/aman-patel-972935319/
- GitHub: https://github.com/patelaman275
- LeetCode: https://leetcode.com/u/aman24256/ (250+ problems solved, 100 Days Badge)
- Resume PDF: /resume.pdf

## Technical Skills (From Verified Resume):
- Programming Languages: Java, Python, JavaScript, SQL, C/C++
- Backend Development: Node.js, Express.js, Flask, REST APIs
- Cloud (AWS): EC2, S3, IAM, RDS, DynamoDB, Lambda, VPC, CloudWatch
- Databases: MySQL, MongoDB Atlas, Firebase, DynamoDB
- DevOps and Tools: Docker, Terraform (basics), Git, GitHub, Postman, Vite
- AI/ML: TensorFlow, Deep Learning, CNNs, NLP, LLMs, Gemini API, OpenAI API, RAG
- Core CS: Data Structures and Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks

## Certifications:
1. AWS Certified AI Practitioner (Foundational) – Amazon Web Services (Credly: https://www.credly.com/badges/004e33b3-890d-423f-bbd5-cda6f15d52ed/public_url)
2. AWS Certified Cloud Practitioner (Foundational) – Amazon Web Services (Credly: https://www.credly.com/badges/0eaec43f-c20f-42e1-a781-1d5717784400/public_url)
3. Java Programming (Elite Certificate) – NPTEL IIT (via SWAYAM/NPTEL)
4. Introduction to Machine Learning – NPTEL IIT Kharagpur
5. SQL Foundations – Coursera, Oct 2026

## Achievements:
1. 1st Prize — RADAR DETECTOR project, Techknow, 2023–2024
2. 3rd Prize — Campus Connect project, MOZO-HACK, 7 March 2024
3. LeetCode: 250+ problems solved, 100 Days Badge

## Publication:
- Title: AI-Based Chicken Disease Detection Using CNN
- Conference: ADROID Conference Series: Engineering Sciences and Technology (ICCCNet 2026), SRM IST Virtual, 17 June 2026
- Research conducted under the guidance of Monica Bhavani M, Professor, SRM IST.
- Paper Link: https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90

## Projects (From Verified Resume):
1. AI-Based Chicken Disease Detection System (Feb 2026 – Jun 2026)
   - Tech Stack: Python, TensorFlow, Next.js, Flask, Firebase
   - Minor project – collected and annotated 5,000+ poultry images from Kaggle, GitHub and other online sources, and prepared dataset for dual-pipeline VGG16 + MobileNetV2 CNN, reached 98.2% accuracy on Coccidiosis detection.
   - Engineered Next.js frontend and authored research paper, accepted & published at ICCCNet 2026 (ADROID Conference).
   - Team integrated Gemini RAG for disease Q&A and Sarvam AI for multilingual voice diagnosis across 5+ languages.
   - Live Demo: https://chick-tech-ai-diagnosis.vercel.app/

2. AI Career Path Generator (Jan 2026 – Apr 2026)
   - Tech Stack: React.js, Node.js, Express.js, MongoDB, OpenAI API
   - Team project – architected full-stack solution that uses GPT-4 to generate personalized career roadmaps, reducing manual effort of researching career paths.
   - Developed LLM-powered resume analyzer that extracts key skills and generates ATS optimization suggestions.
   - Constructed live job search module aggregating listings from JSearch and Active Jobs DB (RapidAPI) with country, employment-type, and remote-only filters.
   - Live Demo: https://ascend-career.vercel.app/

3. EasyTrip — Real-Time Multi-Rider Coordination & Safety Platform (Nov 2025 – Apr 2026)
   - Tech Stack: React.js, Node.js, Express.js, Socket.io, Leaflet
   - Solo project – designed and implemented real-time group travel application with live GPS tracking and shared routes for multiple riders at once.
   - Developed invite-code-based trip management for creating and joining group trips.
   - Implemented SOS emergency alert feature that instantly broadcasts distress notifications and rider coordinates to all connected group members via Socket.io.
   - Live Demo: https://easytrip-swart.vercel.app/
`;

function generateKnowledgeBaseResponse(query: string): string {
  const clean = query.trim().toLowerCase();

  // 1. GREETINGS
  if (
    /^(hi|hello|hey|hola|namaste|greetings|morning|afternoon|evening|yo|sup)[\s!.,?]*$/i.test(clean) ||
    clean.startsWith('hello') ||
    clean.startsWith('hey ') ||
    clean.startsWith('hi ')
  ) {
    return `Hello! Great to connect with you. 👋

I'm Aman Patel's personal portfolio assistant. I can answer questions about my technical background, projects, published research, and skills based on my official resume.

Feel free to ask me about:
• **My Chicken Disease Detection CNN** (98.2% accuracy, published at ICCCNet 2026)
• **EasyTrip Platform** (solo real-time GPS & SOS platform with Socket.io)
• **AI Career Path Generator** (GPT-4 roadmap & ATS resume analyzer)
• **AWS Certifications** (Certified AI Practitioner & Cloud Practitioner)
• **SRM IST Education** (B.Tech CSE Data Science, 8.83/10 CGPA, 2023–2027)
• **LeetCode Problem Solving** (250+ problems solved, 100 Days Badge)

What would you like to explore?`;
  }

  // 2. WELLBEING / SMALL TALK
  if (clean.includes('how are you') || clean.includes("how's it going") || clean.includes('how do you do') || clean.includes("what's up")) {
    return `I'm doing great, thank you for asking! 😊

I'm ready to walk you through any of my software engineering projects, deep learning research, or technical background from my resume. What can I share with you today?`;
  }

  // 3. WHO ARE YOU / IDENTITY
  if (clean.includes('who are you') || clean.includes('what are you') || clean.includes('your purpose')) {
    return `I am **Aman Patel's Personal Portfolio Assistant**. 

I speak on Aman's behalf to help recruiters, engineering leads, and visitors review his verified projects, technical architecture, published research, and academic background directly from his official resume.`;
  }

  // 4. COURTESY / THANKS
  if (/^(thanks|thank you|thx|awesome|cool|great|perfect|nice)[\s!.,?]*$/i.test(clean) || clean.includes('thank you') || clean.includes('thanks')) {
    return `You're very welcome! If there's anything else you'd like to explore—or if you'd like to download my [Official Resume (PDF)](/resume.pdf) or contact me directly at [amanpatelsrm@gmail.com](mailto:amanpatelsrm@gmail.com)—just let me know!`;
  }

  // 5. FAREWELLS
  if (/^(bye|goodbye|cya|see you|talk later)[\s!.,?]*$/i.test(clean) || clean.includes('goodbye') || clean.includes('bye')) {
    return `Thanks for stopping by my portfolio! Feel free to download my [Resume PDF](/resume.pdf) or email me at [amanpatelsrm@gmail.com](mailto:amanpatelsrm@gmail.com) whenever you'd like to connect. Have a great day!`;
  }

  // 6. PROJECT 1: CHICKEN DISEASE DETECTION / CNN / RESEARCH PAPER
  if (
    clean.includes('chicken') ||
    clean.includes('disease') ||
    clean.includes('poultry') ||
    clean.includes('coccidiosis') ||
    clean.includes('vgg') ||
    clean.includes('mobilenet') ||
    clean.includes('icccnet') ||
    clean.includes('sarvam') ||
    (clean.includes('paper') && !clean.includes('resume'))
  ) {
    return `### AI-Based Chicken Disease Detection System (Minor Project)

**Duration**: Feb 2026 – Jun 2026  
**Tech Stack**: Python, TensorFlow, Next.js, Flask, Firebase, Gemini RAG, Sarvam AI

**Key Details from Resume**:
• **Dataset**: Collected and annotated **5,000+ poultry images** from Kaggle, GitHub, and online sources.
• **Dual-Pipeline CNN**: Trained dual-pipeline **VGG16 + MobileNetV2 CNN**, reaching **98.2% accuracy** on Coccidiosis detection.
• **Frontend & Research Paper**: Engineered the **Next.js frontend** and authored the research paper, accepted and published at **ICCCNet 2026** (ADROID Conference Series) under the guidance of Monica Bhavani M, Professor, SRM IST.
• **Multilingual Voice & RAG**: Team integrated **Gemini RAG** for disease Q&A and **Sarvam AI** for multilingual voice diagnosis across 5+ languages.

🔗 **Links**: [Read Published Paper](https://conferenceseries.adroidjournals.com/index.php/ACSET/article/view/120/90) · [Live Demo](https://chick-tech-ai-diagnosis.vercel.app/)`;
  }

  // 7. PROJECT 3: EASYTRIP (SOLO PROJECT)
  if (
    clean.includes('easytrip') ||
    clean.includes('trip') ||
    clean.includes('gps') ||
    clean.includes('multi-rider') ||
    clean.includes('sos') ||
    clean.includes('rider') ||
    clean.includes('socket')
  ) {
    return `### EasyTrip — Real-Time Multi-Rider Coordination & Safety Platform (Solo Project)

**Duration**: Nov 2025 – Apr 2026  
**Tech Stack**: React.js, Node.js, Express.js, Socket.io, Leaflet

**Key Details from Resume**:
• **Solo Project**: Designed and implemented a real-time group travel application with live GPS tracking and shared routes for multiple riders at once.
• **Trip Management**: Developed invite-code-based trip management for creating and joining group trips.
• **Emergency SOS**: Implemented an SOS emergency alert feature that instantly broadcasts distress notifications and rider coordinates to all connected group members via Socket.io.

🔗 **Link**: [Live EasyTrip Demo](https://easytrip-swart.vercel.app/)`;
  }

  // 8. PROJECT 2: AI CAREER PATH GENERATOR (TEAM PROJECT)
  if (
    clean.includes('career') ||
    clean.includes('roadmap') ||
    clean.includes('ats') ||
    clean.includes('jsearch') ||
    clean.includes('job') ||
    clean.includes('ascend')
  ) {
    return `### AI Career Path Generator (Team Project)

**Duration**: Jan 2026 – Apr 2026  
**Tech Stack**: React.js, Node.js, Express.js, MongoDB, OpenAI API (GPT-4), RapidAPI

**Key Details from Resume**:
• **Team Project**: Architected a full-stack solution that uses GPT-4 to generate personalized career roadmaps, reducing the manual effort of researching career paths.
• **Resume Analyzer**: Developed an LLM-powered resume analyzer that extracts key skills and generates ATS optimization suggestions.
• **Job Search**: Constructed a live job search module aggregating listings from JSearch and Active Jobs DB (RapidAPI) with country, employment-type, and remote-only filters.

🔗 **Link**: [Live Career Generator Demo](https://ascend-career.vercel.app/)`;
  }

  // 9. ALL PROJECTS OVERVIEW
  if (clean.includes('project') || clean.includes('built') || clean.includes('work') || clean.includes('portfolio') || clean.includes('apps')) {
    return `Here are the engineering projects documented on my official resume:

1. **AI-Based Chicken Disease Detection System** (Feb 2026 – Jun 2026):
   • Dual-pipeline VGG16 + MobileNetV2 CNN with 98.2% accuracy.
   • Next.js frontend, Flask, Firebase, Gemini RAG, and Sarvam AI voice diagnosis in 5+ languages.
   • Published paper author at **ICCCNet 2026**. ([Live Demo](https://chick-tech-ai-diagnosis.vercel.app/))

2. **AI Career Path Generator** (Jan 2026 – Apr 2026):
   • GPT-4 powered personalized career roadmaps, ATS resume skill extraction, and RapidAPI job search module. ([Live Demo](https://ascend-career.vercel.app/))

3. **EasyTrip Multi-Rider Platform** (Nov 2025 – Apr 2026):
   • Solo project: Real-time GPS tracking and instant SOS distress alert broadcasting via Socket.io and Leaflet. ([Live Demo](https://easytrip-swart.vercel.app/))

4. **Campus Connect** (Achievement):
   • 3rd Prize winner at MOZO-HACK (7 March 2024).

Which project would you like deeper details on?`;
  }

  // 10. EDUCATION / SRM IST / CGPA / DEGREE
  if (
    clean.includes('education') ||
    clean.includes('cgpa') ||
    clean.includes('gpa') ||
    clean.includes('srm') ||
    clean.includes('college') ||
    clean.includes('degree') ||
    clean.includes('academic') ||
    clean.includes('grade')
  ) {
    return `### Education & Academic Background

• **Institution**: SRM Institute of Science and Technology, Kattankulathur, Chennai, India
• **Degree**: B.Tech in Computer Science and Engineering — Data Science
• **Duration**: **2023 – 2027**
• **CGPA**: **8.83 / 10**
• **Core CS Coursework**: Data Structures and Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks.`;
  }

  // 11. CERTIFICATIONS / AWS / CREDLY
  if (clean.includes('certif') || clean.includes('aws') || clean.includes('credly') || clean.includes('badge')) {
    return `### Verified Certifications (From Resume)

1. **AWS Certified AI Practitioner (Foundational)** — Amazon Web Services  
   • Verified on [Credly](https://www.credly.com/badges/004e33b3-890d-423f-bbd5-cda6f15d52ed/public_url)
2. **AWS Certified Cloud Practitioner (Foundational)** — Amazon Web Services  
   • Verified on [Credly](https://www.credly.com/badges/0eaec43f-c20f-42e1-a781-1d5717784400/public_url)
3. **Java Programming (Elite Certificate)** — NPTEL IIT (via SWAYAM/NPTEL)
4. **Introduction to Machine Learning** — NPTEL IIT Kharagpur
5. **SQL Foundations** — Coursera (Oct 2026)`;
  }

  // 12. ACHIEVEMENTS / COMPETITIVE PROGRAMMING / LEETCODE
  if (
    clean.includes('achievement') ||
    clean.includes('prize') ||
    clean.includes('hackathon') ||
    clean.includes('award') ||
    clean.includes('leetcode') ||
    clean.includes('dsa') ||
    clean.includes('problem solving')
  ) {
    return `### Achievements & Problem Solving (From Resume)

• **1st Prize — RADAR DETECTOR project**: Techknow, 2023–2024
• **3rd Prize — Campus Connect project**: MOZO-HACK, 7 March 2024
• **LeetCode**: **250+ problems solved**; earned the **100 Days Badge** ([Profile](https://leetcode.com/u/aman24256/))`;
  }

  // 13. SKILLS / TECH STACK
  if (
    clean.includes('skill') ||
    clean.includes('stack') ||
    clean.includes('tech') ||
    clean.includes('language') ||
    clean.includes('backend') ||
    clean.includes('frontend') ||
    clean.includes('python') ||
    clean.includes('java') ||
    clean.includes('database') ||
    clean.includes('cloud')
  ) {
    return `### Technical Skills (From Official Resume)

• **Programming Languages**: Java, Python, JavaScript, SQL, C/C++
• **Backend Development**: Node.js, Express.js, Flask, REST APIs
• **Cloud (AWS)**: EC2, S3, IAM, RDS, DynamoDB, Lambda, VPC, CloudWatch
• **Databases**: MySQL, MongoDB Atlas, Firebase, DynamoDB
• **DevOps and Tools**: Docker, Terraform (basics), Git, GitHub, Postman, Vite
• **AI/ML**: TensorFlow, Deep Learning, CNNs, NLP, LLMs, Gemini API, OpenAI API, RAG
• **Core CS**: Data Structures and Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks`;
  }

  // 14. CAREER GOALS / ROLES SOUGHT / WHY HIRE
  if (
    clean.includes('career') ||
    clean.includes('goal') ||
    clean.includes('looking for') ||
    clean.includes('role') ||
    clean.includes('hire') ||
    clean.includes('why') ||
    clean.includes('strength') ||
    clean.includes('summary')
  ) {
    return `### Professional Summary & Career Objectives

As stated on my official resume:

> **B.Tech Computer Science and Engineering (Data Science)** student at SRM Institute of Science and Technology (8.83/10 CGPA) with hands-on experience building full-stack and AI-powered applications using React, Node.js, Express.js, Python, and TensorFlow. Skilled in REST APIs, SQL and NoSQL databases, and AWS (EC2, S3, Lambda, VPC). AWS Certified AI Practitioner and Cloud Practitioner, with a research publication at ICCCNet 2026.

**Target Opportunities**:
I am seeking **entry-level Software Engineer opportunities in backend and cloud development**, as well as AI/ML and full-stack engineering roles where I can contribute to building scalable, production-grade applications.`;
  }

  // 15. CONTACT & RESUME
  if (
    clean.includes('contact') ||
    clean.includes('email') ||
    clean.includes('phone') ||
    clean.includes('reach') ||
    clean.includes('linkedin') ||
    clean.includes('github') ||
    clean.includes('resume') ||
    clean.includes('pdf')
  ) {
    return `### Contact & Official Resume

• **Email**: [amanpatelsrm@gmail.com](mailto:amanpatelsrm@gmail.com)
• **Phone**: [+91 9918318385](tel:+919918318385)
• **Location**: Lucknow, Uttar Pradesh, India
• **Official Resume**: [Download Resume (PDF)](/resume.pdf)
• **LinkedIn**: [linkedin.com/in/aman-patel-972935319](https://www.linkedin.com/in/aman-patel-972935319/)
• **GitHub**: [github.com/patelaman275](https://github.com/patelaman275)
• **LeetCode**: [leetcode.com/u/aman24256/](https://leetcode.com/u/aman24256/)`;
  }

  // 16. FALLBACK
  return `Thank you for asking about "${query}".

As Aman Patel's portfolio assistant, I can provide details directly from his verified resume regarding:
• **Technical Skills**: Java, Python, JavaScript, SQL, C/C++, Node.js, Express.js, Flask, REST APIs, AWS (EC2, S3, RDS, Lambda, DynamoDB), Docker, TensorFlow, CNNs, RAG.
• **Featured Projects**: AI-Based Chicken Disease Detection System (98.2% accuracy, ICCCNet 2026 paper), EasyTrip (solo real-time GPS & Socket.io SOS platform), and AI Career Path Generator (GPT-4 roadmap & ATS resume analyzer).
• **Academic Credentials**: SRM IST B.Tech in CSE Data Science (CGPA: 8.83/10, 2023–2027), AWS Certified AI Practitioner & Cloud Practitioner, 250+ LeetCode problems solved.
• **Achievements**: 1st Prize Techknow (RADAR DETECTOR), 3rd Prize MOZO-HACK (Campus Connect).

Feel free to ask any specific question or download Aman's [Resume PDF](/resume.pdf)!`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: 'Please ask a question about Aman Patel!' });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';

    // Check for user-provided Gemini or OpenAI API Key
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: {
                parts: [
                  {
                    text: KNOWLEDGE_BASE_SYSTEM_PROMPT,
                  },
                ],
              },
              contents: [
                {
                  role: 'user',
                  parts: [{ text: latestMessage }],
                },
              ],
            }),
            signal: AbortSignal.timeout(4500),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return NextResponse.json({ reply: text });
        }
      } catch (err) {
        console.warn('Gemini request fallback to verified knowledge base reply:', err);
      }
    }

    if (openaiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: KNOWLEDGE_BASE_SYSTEM_PROMPT,
              },
              ...messages,
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data?.choices?.[0]?.message?.content;
          if (text) return NextResponse.json({ reply: text });
        }
      } catch (err) {
        console.error('OpenAI API call failed, using verified knowledge engine:', err);
      }
    }

    // High-Intelligence Verified Knowledge Engine
    const naturalReply = generateKnowledgeBaseResponse(latestMessage);
    return NextResponse.json({ reply: naturalReply });
  } catch (error) {
    console.error('Error processing recruiter chat:', error);
    return NextResponse.json(
      { reply: 'Hello! Feel free to ask me about my projects, AWS certifications, published CNN paper, or email me directly at amanpatelsrm@gmail.com!' },
      { status: 200 }
    );
  }
}
