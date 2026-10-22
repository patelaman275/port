export interface SpeechQuestion {
  id: string;
  category: 'HR & Accenture Fit' | 'Project: CNN Disease Detection' | 'Project: EasyTrip & CampusConnect' | 'Project: AI Career Path' | 'Core CS & DSA' | 'DBMS & SQL' | 'Cloud & System Design';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  modelAnswer: string;
  keyPoints: string[];
  keywords: string[];
  accentureTip: string;
  timeEstimate: string;
}

export interface BotQuestion {
  id: string;
  roundType: 'technical' | 'project' | 'hr' | 'full';
  question: string;
  contextHint: string;
  sampleKeywords: string[];
  idealAnswerOverview: string;
}

export const SPEECH_PRACTICE_QUESTIONS: SpeechQuestion[] = [
  // --- HR & ACCENTURE FIT ---
  {
    id: 'hr-1',
    category: 'HR & Accenture Fit',
    title: 'Tell Me About Yourself (60-Second Elevator Pitch)',
    difficulty: 'Easy',
    question: 'Tell me about yourself, your educational background, and key projects.',
    modelAnswer: `Hello! I am Aman Patel, a final-year Computer Science Data Science student at SRM Institute of Science and Technology with an 8.83 CGPA. I have published CNN research at ICCCNet 2026 and hold AWS certifications as an AI Practitioner and Cloud Practitioner. Over my degree, I built and shipped four major production projects. First, a dual-pipeline VGG16 and MobileNetV2 CNN achieving 95.2% accuracy for poultry disease detection integrated with Gemini RAG and Sarvam AI voice Q&A. Second, EasyTrip, a real-time group travel platform supporting concurrent GPS tracking and under 500ms SOS emergency alerts using Socket.io. Third, CampusConnect, a MERN networking platform with WebRTC video calling and JWT authentication. And fourth, an AI Career Path Generator using GPT-4 and ATS resume parsing. I combine strong CS fundamentals with end-to-end full-stack and AI deployment skills, and I am eager to begin my career at Accenture.`,
    keyPoints: [
      'Education: Final year CS Data Science at SRM IST (8.83 CGPA)',
      'Research & Certs: Published ICCCNet 2026 CNN paper, AWS Certified AI & Cloud Practitioner',
      'Projects: CNN 95.2% accuracy + Gemini RAG, EasyTrip Socket.io SOS <500ms, CampusConnect WebRTC, AI Career Path',
      'Closing: Ready to contribute full-stack & AI skills at Accenture'
    ],
    keywords: ['Aman Patel', 'SRM Institute', '8.83 CGPA', 'AWS Certified', 'VGG16', 'MobileNetV2', '95.2%', 'Gemini RAG', 'EasyTrip', 'Socket.io', 'CampusConnect', 'WebRTC', 'Accenture'],
    accentureTip: 'Accenture HR panels look for structured 60-second answers: Education -> Highlights & Certifications -> Top 2 Projects -> Why Accenture fit.',
    timeEstimate: '60 secs'
  },
  {
    id: 'hr-2',
    category: 'HR & Accenture Fit',
    title: 'Why Accenture & How Do You Fit?',
    difficulty: 'Easy',
    question: 'Why do you want to join Accenture, and why should we hire you?',
    modelAnswer: `I want to join Accenture because of its global leadership in digital transformation, cloud architecture, and enterprise AI innovations. Accenture works at the intersection of technology and business outcomes, which aligns with my background in deploying scalable web apps and AI models. With my double AWS certification in Cloud and AI, hands-on experience building real-time full-stack platforms like Socket.io and WebRTC, and published deep learning research, I bring both technical depth and problem-solving agility. I thrive in collaborative environments, communicate clearly between technical and business domain needs, and am excited to solve complex client problems at Accenture.`,
    keyPoints: [
      'Accenture Strengths: Leadership in digital transformation, cloud architecture & enterprise AI',
      'Personal Alignment: AWS AI & Cloud certified, full-stack real-time experience',
      'Value Add: Cross-functional communication, practical deep learning deployment, problem-solving mindset'
    ],
    keywords: ['Accenture', 'digital transformation', 'cloud architecture', 'enterprise AI', 'AWS', 'full-stack', 'Socket.io', 'problem-solving'],
    accentureTip: 'Tie Accenture’s client-centric digital transformation focus directly to your AWS certifications and full-stack projects.',
    timeEstimate: '45 secs'
  },
  {
    id: 'hr-3',
    category: 'HR & Accenture Fit',
    title: 'Handling Project Failure or Deadline Pressure',
    difficulty: 'Medium',
    question: 'Describe a time when you faced a setback or deadline pressure in a project and how you resolved it.',
    modelAnswer: `During the development of EasyTrip, our real-time multi-rider coordination app, we faced severe latency issues when broadcasting live GPS location coordinates across multiple connected riders, causing updates to lag beyond two seconds. Instead of panicking, I systematically analyzed the websocket event loop. I implemented spatial throttling and payload minification in Socket.io, reducing unnecessary packet broadcasts. This brought the SOS alert latency down to under 500 milliseconds and smoothed map marker tracking. This taught me the importance of metrics-driven debugging and optimizing networking overhead under pressure.`,
    keyPoints: [
      'Situation: EasyTrip GPS latency lag exceeding 2 seconds under real-time testing',
      'Action: Analyzed Socket.io event loop, implemented spatial throttling & payload minification',
      'Result: Reduced SOS alert response to under 500ms and smoothed location synchronization',
      'Learning: Data-driven performance optimization and staying calm under technical friction'
    ],
    keywords: ['EasyTrip', 'real-time', 'latency', 'Socket.io', 'throttling', '500 milliseconds', 'SOS alert', 'optimization'],
    accentureTip: 'Use the STAR method (Situation, Task, Action, Result). Accenture values candidates who own technical hurdles and optimize systematically.',
    timeEstimate: '50 secs'
  },

  // --- PROJECT: CHICKEN DISEASE DETECTION CNN ---
  {
    id: 'proj-cnn-1',
    category: 'Project: CNN Disease Detection',
    title: 'Chicken Disease Detection Architecture & Dual-Pipeline Choice',
    difficulty: 'Medium',
    question: 'Can you explain the architecture of your AI-Based Chicken Disease Detection System and why you chose VGG16 with MobileNetV2?',
    modelAnswer: `In our published research project for chicken disease detection, we designed a dual-pipeline convolutional neural network combining VGG16 and MobileNetV2 trained on over 5,000 poultry images. We selected VGG16 for its deep feature extraction capabilities in capturing intricate visual patterns like Coccidiosis lesions. To balance computational complexity for edge deployment, we incorporated MobileNetV2, which utilizes depthwise separable convolutions to drastically reduce parameter count and memory footprint. By ensembling their predictions, we achieved a classification accuracy of 95.2%. We containerized the model with Docker and deployed it on Vercel, achieving sub-2-second inference latency. Additionally, we integrated Gemini RAG for interactive disease Q&A and Sarvam AI for multilingual voice diagnosis across five regional languages.`,
    keyPoints: [
      'Architecture: Dual-pipeline ensemble of VGG16 and MobileNetV2 trained on 5,000+ images',
      'Rationale: VGG16 for detailed spatial feature extraction; MobileNetV2 for depthwise separable convolutions & efficiency',
      'Performance: 95.2% accuracy for Coccidiosis detection, sub-2s inference latency via Docker deployment',
      'AI Integration: Gemini RAG for contextual disease Q&A, Sarvam AI for 5+ language voice diagnosis'
    ],
    keywords: ['dual-pipeline', 'VGG16', 'MobileNetV2', '5,000', '95.2%', 'Coccidiosis', 'depthwise separable convolutions', 'Docker', 'Vercel', 'Gemini RAG', 'Sarvam AI'],
    accentureTip: 'Be prepared to explain MobileNetV2’s depthwise separable convolutions—interviewers love asking why a model is lightweight vs heavy.',
    timeEstimate: '60 secs'
  },
  {
    id: 'proj-cnn-2',
    category: 'Project: CNN Disease Detection',
    title: 'How Gemini RAG Pipeline Was Integrated',
    difficulty: 'Medium',
    question: 'How did you wire the Gemini RAG pipeline into the disease detection system?',
    modelAnswer: `We integrated Gemini RAG to allow farmers to ask natural language questions about detected poultry diseases. Once the CNN classifies a disease condition like Coccidiosis, the diagnosis token along with user queries are passed into a Retrieval-Augmented Generation pipeline. We stored vet treatment guides and diagnostic manuals as vector embeddings. When a user asks a question, the vector store retrieves top matching context chunks, which are fed into the Gemini API prompt. This prevents LLM hallucination and delivers medically accurate, actionable treatment advice in real time.`,
    keyPoints: [
      'Problem: Generic LLM responses hallucinate veterinary medicine details',
      'RAG Solution: Vector embeddings of veterinary guidebooks & diagnostic manuals',
      'Flow: CNN prediction -> Semantic context retrieval from vector DB -> Gemini API prompt synthesis',
      'Impact: Accurate, hallucination-free treatment guidance'
    ],
    keywords: ['Gemini RAG', 'Retrieval-Augmented Generation', 'vector embeddings', 'hallucination', 'Coccidiosis', 'context chunks', 'Gemini API'],
    accentureTip: 'Emphasize that RAG prevents hallucination—an important enterprise AI concept for Accenture client solutions.',
    timeEstimate: '50 secs'
  },

  // --- PROJECT: EASYTRIP & CAMPUSCONNECT ---
  {
    id: 'proj-easytrip-1',
    category: 'Project: EasyTrip & CampusConnect',
    title: 'EasyTrip: Real-Time SOS Alerts & WebSockets',
    difficulty: 'Medium',
    question: 'How does EasyTrip achieve under 500ms latency for SOS emergency alerts across connected riders?',
    modelAnswer: `EasyTrip uses Socket.io built on persistent WebSocket connections for full-duplex communication between riders and server node. When an SOS alert is triggered by a user, the client emits a high-priority 'sos-broadcast' event payload containing rider coordinates, trip ID, and timestamp. The Node.js Express server immediately broadcasts this event to all sockets joined to that specific trip room using Socket.io rooms. By avoiding HTTP polling overhead and using efficient JSON byte payloads, we achieved broadcast latencies under 500 milliseconds across 10+ concurrent live riders on Leaflet maps.`,
    keyPoints: [
      'Protocol: WebSockets via Socket.io full-duplex persistent channel',
      'Server Architecture: Node.js/Express room broadcasting (`socket.to(tripId).emit`)',
      'Optimization: Payload minification & event prioritization over HTTP REST polling',
      'Metrics: SOS alert delivery under 500ms across 10+ concurrent riders'
    ],
    keywords: ['EasyTrip', 'Socket.io', 'WebSocket', 'full-duplex', 'under 500ms', 'SOS alert', 'Node.js', 'Express', 'Leaflet'],
    accentureTip: 'Highlight why WebSockets beat REST polling for real-time safety critical applications (handshake once, bidirectional streaming).',
    timeEstimate: '50 secs'
  },
  {
    id: 'proj-campus-1',
    category: 'Project: EasyTrip & CampusConnect',
    title: 'CampusConnect: WebRTC Video Calling & JWT Auth Flow',
    difficulty: 'Medium',
    question: 'Explain how WebRTC peer-to-peer video calling and JWT security work in CampusConnect.',
    modelAnswer: `In CampusConnect, video calling relies on WebRTC peer-to-peer connections with Socket.io serving as the signaling server. The initiator creates an SDP offer, sends it via signaling socket to the peer, who responds with an SDP answer. ICE candidates are exchanged to establish direct UDP media streams between client browsers. For security, we implemented JWT authentication with bcrypt password hashing. When a user logs in, the backend signs a JSON Web Token with a secret key and returns it. Protected API endpoints enforce middleware verification of the bearer token in HTTP headers before processing requests.`,
    keyPoints: [
      'WebRTC Flow: Socket.io signaling server -> SDP Offer/Answer exchange -> ICE candidate gathering -> Direct P2P UDP video stream',
      'JWT Security: User auth -> bcrypt password hash check -> Signed JWT token creation',
      'API Security: Express middleware authorization layer inspecting Bearer tokens'
    ],
    keywords: ['CampusConnect', 'WebRTC', 'SDP offer', 'ICE candidates', 'peer-to-peer', 'JWT authentication', 'bcrypt', 'bearer token'],
    accentureTip: 'Be crystal clear on signaling vs streaming: WebRTC needs signaling (WebSocket) to establish connection, then audio/video flows peer-to-peer.',
    timeEstimate: '55 secs'
  },

  // --- CORE CS & DSA ---
  {
    id: 'cs-oop-1',
    category: 'Core CS & DSA',
    title: 'Call by Value vs Call by Reference & OOP Pillars',
    difficulty: 'Easy',
    question: 'Explain call by value vs call by reference, and summarize the four pillars of Object-Oriented Programming.',
    modelAnswer: `We can pass values to a function in two ways: Call by Value and Call by Reference. In Call by Value, a copy of the actual variable is passed to the function, so modifications inside the function do not affect the original variable. In Call by Reference, the memory address or reference of the variable is passed, so changes inside the function directly mutate the original object. The four main pillars of OOP are: Encapsulation, which wraps data and methods inside a single class hiding internal implementation; Abstraction, which exposes only essential interfaces while hiding complex internal details; Inheritance, which allows a child class to inherit properties from a parent class promoting code reuse; and Polymorphism, which enables functions or objects to take multiple forms through method overloading and method overriding.`,
    keyPoints: [
      'Call by Value: Passes copy of variable; original untouched',
      'Call by Reference: Passes memory address/pointer; mutates original object',
      'Encapsulation: Bundles state & behavior; hides private fields',
      'Abstraction: Hides background execution details exposing interface',
      'Inheritance: Code reusability via parent-child class hierarchy',
      'Polymorphism: Overloading (compile-time) & Overriding (runtime)'
    ],
    keywords: ['call by value', 'call by reference', 'memory address', 'Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism', 'overloading', 'overriding'],
    accentureTip: 'This exact definition of Call by Value vs Reference comes directly from recent Accenture interview panels!',
    timeEstimate: '60 secs'
  },
  {
    id: 'cs-os-1',
    category: 'Core CS & DSA',
    title: 'Process vs Thread & System Scaling',
    difficulty: 'Medium',
    question: 'What is the difference between a process and a thread? How would you scale an application for high traffic?',
    modelAnswer: `A process is an independent executing program with its own dedicated memory address space allocated by the OS. A thread is a lightweight execution unit inside a process that shares memory, file descriptors, and state with sibling threads. Thread context switching is significantly faster than process switching. To optimize and scale a system for increased traffic, I adopt a multi-tiered approach: First, Horizontal Scaling by adding stateless application instances behind an AWS Application Load Balancer. Second, Database Optimization using read replicas, indexing, and Redis caching for hot data queries. Third, Asynchronous Queuing using message brokers like RabbitMQ or Kafka to decouple heavy computations from HTTP request-response cycles.`,
    keyPoints: [
      'Process: Independent program execution with separate address space',
      'Thread: Lightweight execution unit within process sharing address space',
      'Scaling Strategy: Load balancer + Horizontal scaling',
      'DB Optimization: Redis caching + read replicas + indexing',
      'Async Processing: Message queues to offload blocking tasks'
    ],
    keywords: ['process', 'thread', 'memory space', 'context switching', 'Horizontal Scaling', 'Load Balancer', 'Redis caching', 'read replicas'],
    accentureTip: 'Accenture technical leads assess system design thinking. Mentioning load balancing, Redis caching, and async queues shows readiness for enterprise projects.',
    timeEstimate: '55 secs'
  },

  // --- DBMS & SQL ---
  {
    id: 'db-sql-1',
    category: 'DBMS & SQL',
    title: 'SQL Joins, Normalization & Indexing',
    difficulty: 'Medium',
    question: 'Explain SQL Joins, Normalization forms, and how database indexing speeds up queries.',
    modelAnswer: `SQL Joins combine rows from two or more tables based on a related column. An INNER JOIN returns matching records in both tables; LEFT JOIN returns all records from the left table plus matching right records; RIGHT JOIN returns all right records; and FULL OUTER JOIN returns records when there is a match in either table. Normalization is the process of structuring relational database schemas to eliminate data redundancy and anomalies. 1NF eliminates duplicate columns and ensures atomic values; 2NF eliminates partial functional dependencies; and 3NF eliminates transitive dependencies. Indexing creates a B-Tree or Hash data structure on specified table columns. This reduces search time complexity from full table scan O(N) down to O(log N) lookup time.`,
    keyPoints: [
      'Joins: Inner, Left, Right, Full Outer join record matching rules',
      '1NF: Atomic values, no repeating groups',
      '2NF: 1NF + no partial dependencies on primary key',
      '3NF: 2NF + no transitive dependencies',
      'Indexing: B-Tree data structure boosting search lookup to O(log N)'
    ],
    keywords: ['INNER JOIN', 'LEFT JOIN', 'Normalization', '1NF', '2NF', '3NF', 'transitive dependencies', 'B-Tree', 'indexing', 'O(log N)'],
    accentureTip: 'Accenture DBMS technical rounds often ask you to state 1NF, 2NF, 3NF in 3 simple sentences.',
    timeEstimate: '60 secs'
  },

  // --- CLOUD & SYSTEM DESIGN ---
  {
    id: 'cloud-aws-1',
    category: 'Cloud & System Design',
    title: 'AWS EC2, S3, RDS & Certification Alignment',
    difficulty: 'Medium',
    question: 'As an AWS Certified AI & Cloud Practitioner, explain when to use EC2, S3, and RDS.',
    modelAnswer: `AWS EC2 provides resizable virtual compute servers where we run backend web applications, Docker containers, or ML model servers. AWS S3 is an object storage service designed for storing unstructured data like images, project artifacts, model weights, and video files with 99.999999999% durability. AWS RDS is a managed relational database service supporting engines like PostgreSQL and MySQL, handling automated backups, multi-AZ high availability, and scaling. In my projects, I host Dockerized compute tasks on EC2 or Vercel container instances, store uploaded poultry image datasets and assets in S3, and manage structured application entities in managed database instances.`,
    keyPoints: [
      'AWS EC2: Virtual compute instances for application server execution & model inference',
      'AWS S3: Highly durable object store for files, media, datasets, and static builds',
      'AWS RDS: Managed relational database with multi-AZ replication & automated patching',
      'Practical Link: Connected to Docker deployment & project asset management'
    ],
    keywords: ['AWS Certified', 'EC2', 'S3', 'RDS', 'object storage', 'virtual compute', 'relational database', 'durability', 'Docker'],
    accentureTip: 'Having AWS AI & Cloud Practitioner certs is a strong differentiator for Accenture’s Cloud First business group—speak confidently about compute vs storage vs database.',
    timeEstimate: '55 secs'
  }
];

export const BOT_INTERVIEW_QUESTIONS: BotQuestion[] = [
  {
    id: 'bot-1',
    roundType: 'technical',
    question: 'Welcome Aman! Let’s start with technical basics. Can you explain the difference between call by value and call by reference, and give an example of runtime polymorphism?',
    contextHint: 'Focus on parameter passing mechanism & method overriding.',
    sampleKeywords: ['call by value', 'call by reference', 'copy', 'memory address', 'polymorphism', 'overriding'],
    idealAnswerOverview: 'Value passes a copy; reference passes memory address. Runtime polymorphism is achieved via method overriding in inheritance.'
  },
  {
    id: 'bot-2',
    roundType: 'project',
    question: 'Great! Now let’s talk about your research project on AI-Based Chicken Disease Detection. Why did you combine VGG16 and MobileNetV2 instead of using a single model, and how did you get 95.2% accuracy?',
    contextHint: 'Explain VGG16 feature extraction vs MobileNetV2 depthwise convolutions and ensemble benefits.',
    sampleKeywords: ['VGG16', 'MobileNetV2', 'dual-pipeline', 'depthwise separable convolutions', '95.2%', 'Coccidiosis', 'ensemble'],
    idealAnswerOverview: 'VGG16 extracts deep visual features while MobileNetV2 uses depthwise separable convolutions for edge efficiency. Ensembling improved accuracy to 95.2%.'
  },
  {
    id: 'bot-3',
    roundType: 'project',
    question: 'In EasyTrip, you mentioned an SOS emergency alert system broadcasting in under 500ms. How did you handle network stability and event broadcasting with Socket.io?',
    contextHint: 'Explain WebSocket rooms, payload minimization, and low-latency broadcasting.',
    sampleKeywords: ['EasyTrip', 'Socket.io', 'WebSocket', 'under 500ms', 'SOS alert', 'rooms', 'payload'],
    idealAnswerOverview: 'Used Socket.io room broadcasting over persistent WebSockets, minifying event payloads to achieve under 500ms delivery across connected riders.'
  },
  {
    id: 'bot-4',
    roundType: 'technical',
    question: 'In DBMS, can you explain the difference between 2NF and 3NF? How does a B-Tree index accelerate SQL query execution?',
    contextHint: '2NF removes partial dependency; 3NF removes transitive dependency. Indexing uses B-Tree lookup O(log N).',
    sampleKeywords: ['2NF', '3NF', 'partial dependency', 'transitive dependency', 'B-Tree', 'indexing', 'O(log N)'],
    idealAnswerOverview: '2NF eliminates partial key dependencies; 3NF eliminates transitive dependencies. Indexing constructs a B-Tree structure enabling logarithmic lookup.'
  },
  {
    id: 'bot-5',
    roundType: 'hr',
    question: 'Tell me about yourself, your qualifications, and why Accenture is the right next step for your career.',
    contextHint: 'Use structured pitch: Education -> AWS Certs -> Research/Projects -> Why Accenture.',
    sampleKeywords: ['Aman Patel', 'SRM IST', '8.83 CGPA', 'AWS Certified', 'projects', 'Accenture', 'digital transformation'],
    idealAnswerOverview: 'Highlight final year CS Data Science background, 8.83 CGPA, published research, AWS certs, 4 projects, and passion for Accenture client digital solutions.'
  }
];
