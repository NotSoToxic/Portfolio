export const Bio = {
  name: "Sarthak Joshi",
  roles: [
    "Software Developer",
    "Full Stack Developer",
    "SharePoint Developer",
    "Cloud & DevOps Engineer",
    "Data Science Enthusiast",
  ],
  description:
    "Software Developer with proven expertise in cloud infrastructure (AWS), full-stack development, and process automation. Experienced in building high-availability distributed systems, architecting serverless solutions, and developing internal automation tools that measurably improve operational velocity.",
  github: "https://github.com/NotSoToxic",
  resume: "/Sarthak_Joshi_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/sarthak-joshi-413450200/",
  insta: "https://www.instagram.com/printf_sarthak/",
  email: "sarthak.joshi52@gmail.com",
  phone: "9654298033",
};

export const skills = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    title: "Libraries / Frameworks",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
    ],
  },
  {
    title: "Tools / Platforms",
    skills: [
      { name: "AWS" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "GitHub Actions CI/CD" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "Google Cloud Console" },
      { name: "REST APIs" },
      { name: "Docker" },
      { name: "Postman" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "SQL" },
      { name: "MongoDB" },
      { name: "DynamoDB" },
      { name: "MySQL" },
    ],
  },
];

export const education = [
  {
    id: 0,
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    date: "2021 - 2025",
    grade: "CGPA: 8.88",
    desc: "Pursuing Bachelor's in Computer Science and Engineering from Vellore Institute of Technology (VIT). Coursework includes Distributed Systems, Cloud Computing, Data Structures, Algorithms, Database Management Systems, and Computer Networks.",
    degree: "Computer Science and Engineering B.tech",
  },
  {
    id: 1,
    school: "Adarsh Jain Dharmic Shiksha Sadan",
    location: "New Delhi, India",
    date: "2020 - 2021",
    grade: "Percentage: 86%",
    desc: "Completed Class 12 senior secondary education with 86% majoring in Physics, Chemistry, and Mathematics (PCM).",
    degree: "PCM 12th",
  },
];

export const projects = [
  {
    id: 9,
    title: "MintHub",
    date: "Mar 2023 - Jun 2023",
    description:
      "Mintub is a web application that offers range of features to enhance user's cryptocurrency experience",
    image:
      "https://github.com/NotSoToxic/WebDev-Project-beta/assets/93981003/15688934-045a-4f95-8dec-cfa7e7b65388",
    tags: [
      "Docker",
      "React Js",
      "MongoDb",
      "Node Js",
      "Express Js",
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic/WebDev-Project-beta",
    webapp: "https://minthub-47c82.web.app",
    member: [
      {
        name: "Sarthak Joshi",
        img: "https://minthub-47c82.web.app/static/media/sarthak.fa633e07e11b19ee4b1e.jpeg",
        linkedin: "https://www.linkedin.com/in/sarthak-j0shi/",
        github: "https://github.com/NotSoToxic",
      },
      {
        name: "Devashish Jindal",
        img: "https://minthub-47c82.web.app/static/media/deva.59cd30762f0ee33c9445.png",
        linkedin: "https://www.linkedin.com/in/devashish-jindal-830400228/",
        github: "https://github.com/drace28",
      },
      {
        name: "Rajul Mahto",
        img: "https://minthub-47c82.web.app/static/media/rajul.109e922edf540cecb292.jpeg",
        linkedin: "https://www.linkedin.com/in/rajul-mahto-313463200/",
        github: "https://github.com/Rajulmahto21",
      },{
        name: "Aryan Das",
        img: "https://minthub-47c82.web.app/static/media/arya.9b90e41f3d1cd4342ebf.png",
        linkedin: "https://www.linkedin.com/in/aryan--das/",
        github: "https://github.com/arya-domain",
      },

      {
        name: "Tanmoy Mondal",
        img: "https://minthub-47c82.web.app/static/media/tanmoy.e5c670a2f35c98d16b41.jfif",
        linkedin: "Linkedln link",
        github: "github link",
      },
    ],
  },
  {
    id: 10,
    title: "Auto Blog Scale Infra",
    date: "2024",
    description: [
      "Architected a secure, fault-tolerant blog application infrastructure on AWS using VPC, ALB, and Auto Scaling Groups across multiple AZs, ensuring high availability and zero single points of failure.",
      "Automated media processing by triggering AWS Lambda functions on S3 upload events to index objects into DynamoDB, streamlining data pipeline efficiency.",
      "Enhanced application security and performance by implementing CloudFront CDN with Route 53 failover routing and ACM-secured HTTPS connections across all traffic layers."
    ],
    tags: [
      "Python",
      "Django",
      "AWS",
      "VPC",
      "ALB",
      "Lambda",
      "DynamoDB",
      "CloudFront",
      "Route 53"
    ],
    category: "cloud & devops",
    github: "https://github.com/NotSoToxic/AutoBlog-Infra",
    webapp: "",
  },
  {
    id: 11,
    title: "Ware2Go",
    date: "2024",
    description: [
      "Created a responsive logistics interface using React and Vite, integrating Google Maps API and Gemini AI for route optimization, reducing delivery distance by 25% in simulations.",
      "Enabled real-time, AI-assisted routing with dynamic UI updates, improving simulated order fulfillment speed by 30% over baseline models.",
      "Preparing Spring Boot backend migration to enable scalable order processing, RESTful APIs, and future integration of predictive analytics and a mobile-first interface."
    ],
    tags: [
      "React",
      "Vite",
      "Google Maps API",
      "Gemini AI",
      "Node.js",
      "Spring Boot",
      "AI Routing"
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic",
    webapp: "",
  },
  {
    id: 12,
    title: "Mala Spirit Counter",
    date: "2024 - Present",
    description: [
      "Architected an offline-first, devotional digital mala bead counter with zero logins, zero servers, and 100% client-side data privacy using TypeScript, React, and TanStack Start.",
      "Engineered an interactive 3D SVG progress ring with real-time Web Audio API chime synthesis and integrated Capacitor plugins for native haptic feedback and local meditation reminders across iOS and Android.",
      "Implemented Workbox PWA caching strategies and Nitro edge SSR build presets, achieving sub-second load times and flawless offline functionality without transmitting telemetry data."
    ],
    tags: [
      "TypeScript",
      "React",
      "TanStack Start",
      "PWA",
      "Capacitor",
      "Web Audio API",
      "Tailwind CSS",
      "Nitro"
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic/mala-spirit-counter",
    webapp: "https://mala-jaap.amplr.in",
  },
  {
    id: 3,
    title: "B2B SaaS Website",
    date: "Mar 2024 - May 2024",
    description: [
      "Identified client requirement for a high-performance corporate platform to showcase enterprise services, team leadership, and client consultation workflows.",
      "Architected and deployed a modular web application using React.js, Tailwind CSS, Bootstrap, and responsive UI components with automated CI/CD deployment pipelines.",
      "Accelerated page load speeds by 45%, achieved 98+ Lighthouse scores across devices, and increased organic client consultation inquiries by 35%."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/web.png?alt=media&token=d0413d64-b65d-4ecb-b47b-cda38aed2785",
    tags: [
      "React.js",
      "HTML5",
      "Tailwind CSS",
      "Bootstrap",
      "JavaScript",
      "Responsive Design"
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic/strategyz-website",
    webapp: "https://strategyzinc.com",
    member: [
      {
        name: "Sarthak Joshi",
        img: "https://minthub-47c82.web.app/static/media/sarthak.fa633e07e11b19ee4b1e.jpeg",
        linkedin: "https://www.linkedin.com/in/sarthak-j0shi/",
        github: "https://github.com/NotSoToxic",
      },
      {
        name: "Devashish Jindal",
        img: "https://minthub-47c82.web.app/static/media/deva.59cd30762f0ee33c9445.png",
        linkedin: "https://www.linkedin.com/in/devashish-jindal-830400228/",
        github: "https://github.com/drace28",
      },
    ],
  },
  {
    id: 0,
    title: "Facial Attendance System",
    date: "Jul 2022 - Oct 2022",
    description: [
      "Targeted slow, manual workplace check-in queues and buddy-punching issues by designing a contactless biometric attendance tracking system.",
      "Developed a real-time computer vision pipeline in Python utilizing OpenCV, Mediapipe, and face_recognition libraries with automated CSV timestamp logging.",
      "Reduced per-person attendance logging time by 60% while sustaining 98.5% face recognition accuracy under variable ambient lighting conditions."
    ],
    image:
      "https://github.com/NotSoToxic/Python-Projects/assets/93981003/8308a063-d7d8-4978-b3f0-03b22ee7369d",
    tags: [
      "Machine-Learning", "ImageRecognition", "OpenCv", "Meadiapipe", "tKinter"],
    category: "machine learning",
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Facial-Attendance-System",
  },
  {
    id: 1,
    title: "Humara-Bot",
    date: "Oct 2022 - Dec 2022",
    description: [
      "Addressed community engagement challenges in Discord servers by combining high-fidelity streaming audio with autonomous AI conversational responses.",
      "Constructed an asynchronous Discord bot on the Autocode platform using Node.js, Python, and containerized Docker microservices to stream low-latency audio and process AI queries.",
      "Scaled reliably across community servers handling 5,000+ weekly automated commands with 99.8% bot uptime and sub-second response times."
    ],
    image:
      "https://github.com/NotSoToxic/Custom-Discord-Bot/assets/93981003/6a21bfec-3f32-450e-8e09-f641879dbf80",
    tags: [
      "Javascript",
      "Discord.js",
      "Autocode",
      "Python",
      "Docker",
      "React Js",
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic/Custom-Discord-Bot",
    webapp: "https://discord.com/api/oauth2/authorize?client_id=1059362641958666292&permissions=8&scope=bot%20applications.commands",
  },
  {
    id: 2,
    title: "News-Buzz",
    date: "Oct 2023 - Dec 2023",
    description: [
      "Solved fragmented community news delivery by building a centralized portal for real-time verified news reading and decentralized user article publishing.",
      "Engineered a full-stack MERN platform (MongoDB, Express, React, Node.js) integrating NewsAPI for live topic feeds and custom rich-text authoring workflows.",
      "Slashed API response latency by 35% through cached query indexing, serving 1,000+ daily article impressions with zero server downtime."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/news.png?alt=media&token=f2e77776-15e6-4bea-b10e-2bba7307696c",
    tags: [
      "Javascript",
      "NodeJs",
      "ReactJs",
      "NewsAPI",
      "MongoDB",
      "ExpressJs",
    ],
    category: "web app",
    github: "https://github.com/NotSoToxic/NewsBuzz/",
    webapp: "https://news-buzz-green.vercel.app/register",
    member: [
      {
        name: "Sarthak Joshi",
        img: "https://minthub-47c82.web.app/static/media/sarthak.fa633e07e11b19ee4b1e.jpeg",
        linkedin: "https://www.linkedin.com/in/sarthak-j0shi/",
        github: "https://github.com/NotSoToxic",
      },
      {
        name: "Devashish Jindal",
        img: "https://minthub-47c82.web.app/static/media/deva.59cd30762f0ee33c9445.png",
        linkedin: "https://www.linkedin.com/in/devashish-jindal-830400228/",
        github: "https://github.com/drace28",
      },
      {
        name: "Garvit Jain",
        img: "https://w7.pngwing.com/pngs/875/398/png-transparent-glasses-man-model-the-man-with-glasses-glass-wine-glass-face-thumbnail.png",
        linkedin: "https://www.linkedin.com/in/garvit-jain-74856b246/",
        github: "https://github.com/megarvit",
      },
    ],
  },
  {
    id: 4,
    title: "Gesture Volume Controller",
    date: "Nov 2021 - Dec 2021",
    description: [
      "Aimed to replace physical volume dials and keyboard hotkeys with an intuitive, touchless computer vision control interface for Windows OS.",
      "Implemented real-time hand landmark tracking with OpenCV and MediaPipe, calculating Euclidean distances between fingertip vectors and mapping them to system audio via Pycaw.",
      "Achieved sub-30ms audio adjustments with 95% gesture detection precision on consumer webcams without dedicated hardware sensors."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/vol.png?alt=media&token=0082a5d6-c547-4645-9035-d3c21c84cc22",
    tags: [
      "Pycaw", "ImageRecognition", "OpenCv", "Meadiapipe", "Numpy", "Machine Learning"
    ],
    category: ["machine learning", "python projects"],
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Gesture-Volume-Controller-for-Windows",
  },
  {
    id: 3,
    title: "Suprise Housing Case Study",
    date: "Oct 2023 - Dec 2023",
    description: [
      "Evaluated complex US housing market datasets to isolate critical price determinants and assist real estate investment firms in identifying undervalued properties.",
      "Executed end-to-end data analytics pipelines in Python with Pandas, Seaborn, and Scikit-Learn; performed advanced feature engineering, Ridge, and Lasso regularization.",
      "Achieved R² of 0.88 on test datasets, identifying the top 10 property value drivers and reducing predictive error by 25% over baseline models."
    ],
    image:
      "https://github.com/NotSoToxic/Surprise-Housing-Case-Study/assets/93981003/0f8f00ae-9326-42a3-bdfe-92b5ba6e9560",
    tags: [
      "Python", "Numpy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "Statsmodels for Data Analysis", "Machine Learning"],
    category: "machine learning",
    github: "https://github.com/NotSoToxic/Surprise-Housing-Case-Study",
    webapp: "https://colab.research.google.com/drive/1kV-hFtM3hAN_eV2j-J9jGYH5baKXUTJ_?authuser=1#scrollTo=hVqiHGr-6OXX",
  },
  {
    id: 4,
    title: "Galaxy Shooter Game",  
    date: "Oct 2022 - Oct 2022",
    description: [
      "Designed an engaging retro 2D arcade shooter to showcase object-oriented game loop mechanics, collision algorithms, and dynamic state management in Python.",
      "Engineered 60-FPS physics logic, randomized enemy projectile vectors, progressive shield power-ups, and particle visual effects using Pygame.",
      "Maintained butter-smooth rendering performance with zero memory leaks across 30+ simultaneous moving sprites and multi-channel audio."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/game2.png?alt=media&token=2fdf70b9-a1ba-47dc-89b4-0ad1e563e4da",
    tags: [
      "Python", "Pygame", "Random", "Time", "Math", "Sys", "OS"],
    category: "python projects",
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Galaxy-Shooter-Game-Using-Python",
    member: [
      {
        name: "Sarthak Joshi",
        img: "https://minthub-47c82.web.app/static/media/sarthak.fa633e07e11b19ee4b1e.jpeg",
        linkedin: "https://www.linkedin.com/in/sarthak-j0shi/",
        github: "https://github.com/NotSoToxic",
      },
      {
        name: "Devashish Jindal",
        img: "https://minthub-47c82.web.app/static/media/deva.59cd30762f0ee33c9445.png",
        linkedin: "https://www.linkedin.com/in/devashish-jindal-830400228/",
        github: "https://github.com/drace28",
      },
    ],
  },
  {
    id: 5,
    title: "Hand Gesture Recognition",
    date: "July 2022 - September 2021",
    description: [
      "Tackled human-computer interaction barriers by creating an accessible visual gesture recognition pipeline directly from raw webcam video frames.",
      "Developed multi-point skeletal hand tracking in Python and OpenCV, classifying distinct static and dynamic gestures in real time.",
      "Delivered 96% classification accuracy at 30+ FPS, enabling reliable touchless controls for media playback and system UI navigation."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/file.gif?alt=media&token=c2732e95-3aff-4bb3-935a-e4a301ba7609",
    tags: [
      "Machine-Learning", "ImageRecognition", "OpenCv", "Meadiapipe"],
    category: "machine learning",
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Hand-Gesture-Recognition",
    member: [
      {
        name: "Sarthak Joshi",
        img: "https://minthub-47c82.web.app/static/media/sarthak.fa633e07e11b19ee4b1e.jpeg",
        linkedin: "https://www.linkedin.com/in/sarthak-j0shi/",
        github: "https://github.com/NotSoToxic",
      },
      {
        name: "Devashish Jindal",
        img: "https://minthub-47c82.web.app/static/media/deva.59cd30762f0ee33c9445.png",
        linkedin: "https://www.linkedin.com/in/devashish-jindal-830400228/",
        github: "https://github.com/drace28",
      },
    ],
  },  
  {
    id: 6,
    title: "Personal Assistant",
    date: "Jan 2022 - Mar 2022",
    description: [
      "Addressed desktop multitasking friction by developing a hands-free voice assistant for system automation, media management, and web inquiries.",
      "Integrated speech recognition engines, pyttsx3 voice synthesis, Wikipedia APIs, and PyWhatKit automation scripts in Python.",
      "Executed user voice commands for application launches, web research, and media playback with 92% speech parsing accuracy."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/personal.png?alt=media&token=e11fa7a4-0466-41fb-99e5-901d8f53a4ef",
    tags: [
      "Speech-Recognition", "Pyttsx3", "Pywhatkit", "Wikipedia"],
    category: "python projects",
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Desktop-Voice-Assistant",
  },
  {
    id: 7,
    title: "Drawing Doraemon",
    date: "Aug 2021 - Sep 2021",
    description: [
      "Explored mathematical coordinate modeling and vector animation through algorithmic canvas rendering in Python.",
      "Programmed Turtle graphics routines using exact Cartesian coordinate geometry, arc calculations, and synchronized color fills to recreate the character.",
      "Demonstrated procedural vector graphics generation with zero raster pixelation at arbitrary viewport scale factors."
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/turtle.jfif?alt=media&token=db80a3e7-1f39-4178-aff3-79468c521802",
    tags: [
      "Python", "Turtle", "Math", "Drawing", "Animation"],
    category: "python projects",
    github: "https://github.com/NotSoToxic/Python-Projects/tree/main/Drawing-Doraemon-Using-Python",
  }

];

export const experiences = [
  {
    id: 0,
    img: "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/Alphabet.png?alt=media&token=cad1d219-8b03-4800-8290-a518a1126cc9",
    role: "Process Developer (SharePoint Developer)",
    company: "Alphabet Inc. · Gurgaon, India",
    date: "Nov 2021 - May 2022",
    desc: "Automated HR workflows by creating SharePoint automation tools and process flow triggers, cutting manual tasks by 35% and speeding up request handling. Developed onboarding automation scripts and process integrations, improving processing time by 20% and simplifying cross-platform operations.",
    kpis: [
      { value: "35%", label: "Manual Tasks Cut" },
      { value: "20%", label: "Processing Speedup" },
      { value: "SharePoint", label: "Flow Triggers" },
      { value: "100%", label: "Cross-Platform" }
    ],
    skills: [
      "SharePoint Development",
      "Process Automation",
      "Process Flow Triggers",
      "Internal Automation Tools",
      "Scripting"
    ]
  },
  {
    id: 1,
    img: "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/Axlrate.png?alt=media&token=f1720335-c78f-4ec1-a4d2-d33d3662ea69",
    role: "Data Science Intern",
    company: "Axlrate Research · Bengaluru, India",
    date: "Sept 2023 - Dec 2023",
    desc: "Applied machine learning and analytics to uncover performance trends, boosting operational efficiency by 15%. Refined predictive models for customer behavior forecasting, reducing analysis time by 30%.",
    kpis: [
      { value: "15%", label: "Efficiency Gain" },
      { value: "30%", label: "Analysis Time Cut" },
      { value: "ML", label: "Predictive Models" },
      { value: "Python", label: "Analytics Pipelines" }
    ],
    skills: [
      "Machine Learning",
      "Predictive Modeling",
      "Data Analytics",
      "Python",
      "Statistical Analysis"
    ]
  },
  {
    id: 2,
    img: "https://firebasestorage.googleapis.com/v0/b/portfolio-17e0a.appspot.com/o/Image.png?alt=media&token=0a15ceda-9f27-4151-b120-5b998e01acaf",
    role: "Software Developer",
    company: "Strategyz Inc. · Gurgaon, India",
    date: "Mar 2024 - Present",
    desc: "Streamlined workflows by creating SharePoint automation tools for real-time alerts, reducing manual follow-ups by 40%. Integrated RESTful authentication APIs, lowering login failures by 15% and enhancing access reliability. Engineered backend services on AWS (S3, EC2, Lambda, DynamoDB), achieving 99.9% uptime and cutting infrastructure costs by 30%. Directed Microsoft 365 migration and domain federation for 100+ users, ensuring zero downtime. Established CI/CD pipelines with GitHub Actions, accelerating deployment by 65%.",
    kpis: [
      { value: "40%", label: "Follow-ups Cut" },
      { value: "99.9%", label: "AWS Uptime" },
      { value: "30%", label: "Infra Cost Cut" },
      { value: "65%", label: "Faster Deploy" }
    ],
    skills: [
      "SharePoint Automation",
      "AWS (S3, EC2, Lambda, DynamoDB)",
      "RESTful APIs",
      "M365 Migration",
      "GitHub Actions CI/CD"
    ]
  }
];

export const certifications = [
  {
    title: "AWS APAC - Solutions Architecture",
    issuer: "Forage",
    badge: "AWS",
  },
  {
    title: "Microsoft Technology Associate",
    issuer: "Microsoft",
    badge: "MTA",
  },
  {
    title: "AWS Cloud Foundations",
    issuer: "AWS",
    badge: "AWS",
  },
  {
    title: "Google: Data Analytics",
    issuer: "Google",
    badge: "Google",
  },
  {
    title: "Google: Project Management",
    issuer: "Google",
    badge: "Google",
  },
];

export const honorsAwards = [
  {
    title: "High Flyer Award",
    desc: "Got the High Flyer Award for outstanding performance, initiative, and high leadership potential.",
    badge: "Leadership",
  },
  {
    title: "Discord Developer Title",
    desc: "Earned the 'Discord Developer' title from Discord for building multiple custom automation bots on Discord.",
    badge: "Discord",
  },
  {
    title: "Last Hunt Hackathon Winner",
    desc: "Winning Team of the Last Hunt Hackathon organized by the Institute.",
    badge: "Hackathon",
  },
];

export const contact = {
  email: "sarthak.joshi52@gmail.com",
  phone: "9654298033",
};
