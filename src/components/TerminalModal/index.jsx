import React, { useState, useEffect, useRef } from 'react';
import { Bio } from '../../data/constants';

const generateCowsay = (customText) => {
  const quotes = [
    'There are 10 types of people: those who understand binary, and those who do not.',
    'It works on my machine! (Then we shall ship your machine to AWS).',
    'A SQL query walks into a bar, walks up to two tables and asks: Can I join you?',
    'Why do programmers prefer dark mode? Because light attracts bugs.',
    'There is no place like 127.0.0.1.',
    'Git commit early, git commit often, git push and pray.'
  ];
  const quote = customText || quotes[Math.floor(Math.random() * quotes.length)];
  const borderLen = Math.max(quote.length + 4, 30);
  const topBar = ' ' + '_'.repeat(borderLen);
  const bottomBar = ' ' + '-'.repeat(borderLen);
  return [
    topBar,
    `<  ${quote}  >`,
    bottomBar,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||'
  ];
};

const TerminalModal = ({ isOpen, onClose, isDark, toggleTheme }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'banner',
      content: [
        '┌─────────────────────────────────────────────────────────────┐',
        '│   SARTHAK JOSHI — INTERACTIVE PORTFOLIO TERMINAL v2.4       │',
        '│   Type a command or click a quick suggestion to begin       │',
        '└─────────────────────────────────────────────────────────────┘',
      ]
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Auto-focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of terminal when history changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const runCommand = (cmdString) => {
    const raw = cmdString.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    setCmdHistory(prev => [...prev, raw]);
    setHistoryPointer(-1);

    const newEntries = [{ type: 'cmd', text: raw }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'help',
          lines: [
            'PORTFOLIO NAVIGATION:',
            '  skills          — Technical stack (Languages, Frameworks, Cloud, DBs)',
            '  work / exp      — Professional experience at Strategyz, Axlrate & Alphabet',
            '  projects        — Featured system architectures & GitHub repositories',
            '  edu             — Education details (VIT CSE, Grades & Timeline)',
            '  contact         — Email, phone, GitHub, LinkedIn profiles',
            '  resume          — View and open Sarthak\'s resume PDF',
            '  whoami          — Biography & engineering overview',
            '  theme           — Toggle Light / Dark mode',
            '  clear           — Clear terminal history screen',
            '  exit            — Close the terminal window',
            '',
            'LINUX & DEVELOPER TOOLS:',
            '  neofetch        — System specs, hardware engine & developer stack',
            '  top / htop      — Real-time process monitor (CPU, memory, scale tasks)',
            '  uptime          — System uptime, SLA, and coffee uptime counter',
            '  df / free       — Disk and memory usage (/dev/brain, /dev/coffee)',
            '  ls / ll         — List virtual workspace files and directories',
            '  ping            — Ping localhost (127.0.0.1 ICMP echo)',
            '  curl / wget     — Fetch mock HTTP endpoint headers',
            '  history         — Humorous realistic git & shell command history',
            '  man <cmd>       — Read Unix manual page for sarthak(1)',
            '  tar             — XKCD tar bomb defusal utility',
            '  grep            — Search for meaning of life in /dev/sarthak',
            '',
            'ASCII ART & EMOTICONS (KAOMOJI):',
            '  emoticons       — Full cheatsheet of developer ASCII kaomojis',
            '  cowsay [msg]    — Dynamic ASCII cow delivering wisdom or custom text',
            '  tux             — Official Linux kernel penguin mascot',
            '  sl              — Steam locomotive choo-chooing across screen',
            '  shrug           — ¯\\_(ツ)_/¯ (Works on my machine)',
            '  tableflip       — (╯°□°)╯︵ ┻━┻ (Deploying to prod on Friday)',
            '  unflip          — ┬─┬ノ( º _ ºノ) (Senior dev restoring staging)',
            '  disapproval     — ಠ_ಠ (Who committed API keys?)',
            '  lenny           — ( ͡° ͜ʖ ͡°) (git commit --amend)',
            '  party           — └[∵┌]└[ ∵ ]┘[┐∵]┘ (All tests passing)',
            '',
            'HUMOR & EASTER EGGS:',
            '  fortune / pun   — Randomized developer wisdom & Linux humor',
            '  cat coffee      — Brew steaming ASCII Java mug (+200% productivity)',
            '  touch grass     — Connect to outdoor biosphere via TCP',
            '  sudo <cmd>      — Try running superuser commands (e.g. "sudo make me a sandwich")',
            '  vim / :wq       — Enter the legendary trapped editor & learn how to escape',
            '  kill -9         — Terminate imposter_syndrome with SIGKILL',
            '  git blame       — Find out who wrote that 3 AM bug',
            '  git push --force— Trigger senior engineer alarm'
          ]
        });
        break;

      case 'skills':
      case 'stack':
        newEntries.push({
          type: 'skills',
          sections: [
            { cat: 'PROGRAMMING', items: 'Python, C++, Java, JavaScript, TypeScript, SQL, HTML5/CSS3' },
            { cat: 'FRAMEWORKS', items: 'React, Vite, Node.js, Express, Django, Spring Boot, Redux' },
            { cat: 'CLOUD & DEVOPS', items: 'AWS (EC2, Lambda, S3, VPC, ALB, CloudFront), Docker, Kubernetes, Git, GitHub Actions, Linux' },
            { cat: 'DATABASES', items: 'PostgreSQL, MongoDB, MySQL, DynamoDB' }
          ]
        });
        break;

      case 'work':
      case 'exp':
      case 'experience':
        newEntries.push({
          type: 'work',
          entries: [
            {
              role: 'Software Developer',
              company: 'Strategyz Inc.',
              period: '2025 – Present | Gurgaon, India',
              bullets: [
                'Engineered automated SharePoint trigger pipelines reducing manual follow-ups by 40%.',
                'Architected AWS backend microservices sustaining 99.9% uptime and slashing infrastructure costs by 30%.',
                'Executed frictionless M365 tenant migration for 100+ active enterprise users with zero downtime.',
                'Streamlined CI/CD automation via GitHub Actions, accelerating release cycles by 65%.'
              ]
            },
            {
              role: 'Data Science Intern',
              company: 'Axlrate Research',
              period: '2024 – 2025 | Bengaluru, India',
              bullets: [
                'Engineered predictive analytics pipelines boosting operational forecasting efficiency by 15%.',
                'Automated high-throughput data extraction, trimming weekly analysis overhead by 30%.'
              ]
            },
            {
              role: 'Process Developer',
              company: 'Alphabet Inc',
              period: '2023 – 2024 | Gurgaon, India',
              bullets: [
                'Automated enterprise HR workflows through SharePoint, eliminating 35% of manual administrative tasks.',
                'Scripted automated onboarding triggers accelerating cross-departmental processing by 20%.'
              ]
            }
          ]
        });
        break;

      case 'projects':
      case 'proj':
        newEntries.push({
          type: 'projects',
          projects: [
            {
              title: 'Auto Blog Scale Infra',
              stack: 'Python · Django · AWS · VPC · ALB · Lambda · DynamoDB · CloudFront · Route 53',
              bullets: [
                'Architected a secure, fault-tolerant blog application infrastructure on AWS using VPC, ALB, and Auto Scaling Groups across multiple AZs, ensuring high availability and zero single points of failure.',
                'Automated media processing by triggering AWS Lambda functions on S3 upload events to index objects into DynamoDB, streamlining data pipeline efficiency.',
                'Enhanced application security and performance by implementing CloudFront CDN with Route 53 failover routing and ACM-secured HTTPS connections across all traffic layers.'
              ],
              live: Bio.github ? 'Available' : 'N/A',
              repo: 'https://github.com/NotSoToxic/AutoBlog-Infra'
            },
            {
              title: 'Ware2Go',
              stack: 'React · Vite · Google Maps API · Gemini AI · Node.js · Spring Boot',
              bullets: [
                'Created a responsive logistics interface using React and Vite, integrating Google Maps API and Gemini AI for route optimization, reducing delivery distance by 25% in simulations.',
                'Enabled real-time, AI-assisted routing with dynamic UI updates, improving simulated order fulfillment speed by 30% over baseline models.',
                'Preparing Spring Boot backend migration to enable scalable order processing, RESTful APIs, and future integration of predictive analytics and a mobile-first interface.'
              ],
              live: Bio.github ? 'Available' : 'N/A',
              repo: 'https://github.com/sarthakjoshi52'
            },
            {
              title: 'Mala Spirit Counter',
              stack: 'TypeScript · React · TanStack Start · PWA · Capacitor · Web Audio API · Nitro',
              bullets: [
                'Architected an offline-first, devotional digital mala bead counter with zero logins, zero servers, and 100% client-side data privacy using TypeScript, React, and TanStack Start.',
                'Engineered an interactive 3D SVG progress ring with real-time Web Audio API chime synthesis and integrated Capacitor plugins for native haptic feedback and local meditation reminders across iOS and Android.',
                'Implemented Workbox PWA caching strategies and Nitro edge SSR build presets, achieving sub-second load times and flawless offline functionality without transmitting telemetry data.'
              ],
              live: 'https://mala-jaap.amplr.in',
              repo: 'https://github.com/NotSoToxic/mala-spirit-counter'
            }
          ]
        });
        break;

      case 'edu':
      case 'education':
        newEntries.push({
          type: 'edu',
          schools: [
            {
              inst: 'Vellore Institute of Technology (VIT)',
              degree: 'Bachelor of Technology in Computer Science & Engineering',
              dates: '2021 – 2025',
              grade: 'CGPA: 8.88 / 10.0'
            },
            {
              inst: 'Adarsh Jain Dharmic Shiksha Sadan',
              degree: 'Senior Secondary (Class XII) PCM',
              dates: '2020 – 2021',
              grade: 'Score: 86.0%'
            }
          ]
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'contact',
          info: [
            { label: 'Email', val: Bio.email, link: `mailto:${Bio.email}` },
            { label: 'Phone', val: `+91 ${Bio.phone}`, link: `tel:+91${Bio.phone}` },
            { label: 'LinkedIn', val: Bio.linkedin.replace(/^https?:\/\/(www\.)?/, ''), link: Bio.linkedin },
            { label: 'GitHub', val: Bio.github.replace(/^https?:\/\/(www\.)?/, ''), link: Bio.github }
          ]
        });
        break;

      case 'resume':
        window.open(Bio.resume, '_blank', 'noopener,noreferrer');
        newEntries.push({
          type: 'text',
          lines: [
            '[✓] Opening Sarthak Joshi\'s resume in a new tab...',
            'Direct Link: ' + Bio.resume
          ]
        });
        break;

      case 'whoami':
        newEntries.push({
          type: 'text',
          lines: [
            'Sarthak Joshi — Full Stack Engineer, Cloud Architect & SharePoint Developer.',
            'B.Tech CSE from VIT (CGPA: 8.88). Passionate about high-throughput distributed architectures, cloud automation (AWS), enterprise process flows, and modern interactive web engineering.'
          ]
        });
        break;

      case 'theme':
        if (toggleTheme) toggleTheme();
        newEntries.push({
          type: 'text',
          lines: [`[✓] Switched theme to: ${!isDark ? 'Dark mode' : 'Light mode'}`]
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
      case 'close':
        onClose();
        return;

      case 'sudo':
        newEntries.push({
          type: 'text',
          lines: [
            '[sudo] password for guest: *******',
            'Nice try! User guest is not in the sudoers file. This incident will be reported to Santa 🎅.'
          ]
        });
        break;

      case 'sl':
        newEntries.push({
          type: 'text',
          lines: [
            '      ====        ________                ___________ ',
            '  _D _|  |_______/        \\__I_I_____===__|_________| ',
            '   |(_)---  |   H\\________/ |   |        =|___ ___|   ',
            '   /     |  |   H  |  |     |   |         | ||_| |    ',
            '  |      |  |   H  |__--------------------| [___] |   ',
            '  | ________|___H__/__|_____/[][]~\\_______|       |   ',
            '  |/ |   |_____I______________~~~~~~~~~~|________|   ',
            'Choo Choo! 🚂 You typed "sl" instead of "ls" (classic Linux rite of passage)!'
          ]
        });
        break;

      case 'ls':
      case 'll':
      case 'dir':
        newEntries.push({
          type: 'text',
          lines: [
            'total 42',
            'drwxr-xr-x  8 sarthak  staff   256B  skills/',
            'drwxr-xr-x  6 sarthak  staff   192B  projects/',
            'drwxr-xr-x  4 sarthak  staff   128B  experience/',
            '-rw-r--r--  1 sarthak  staff   64KB  Sarthak_Joshi_Resume.pdf',
            '-rwxr-xr-x  1 sarthak  staff   1.2M  production_deploy.sh*',
            '-rw-r--r--  1 sarthak  staff    42B  meaning_of_life.txt',
            '',
            '💡 Pro-tip: Type any section name (e.g. "skills", "projects") to view it!'
          ]
        });
        break;

      case 'neofetch':
      case 'fastfetch':
        newEntries.push({
          type: 'text',
          lines: [
            '        /\\_/\\          sarthak@portfolio',
            '       ( o.o )         -----------------',
            '        > ^ <          OS: SarthakOS 64-bit (Unix-based)',
            '                       Host: Human Engine (Fueled by Caffeine)',
            '                       Kernel: Linux 6.8.0-sarthak-arm64',
            '                       Uptime: 23 years, 218 days (99.99% SLA)',
            '                       Shell: zsh (interactive portfolio CLI)',
            '                       Terminal: SarthakTerm v2.4.0',
            '                       CPU: Neural Core @ 3.40 GHz (100% load on code)',
            '                       Memory: 32GB RAM / 100% cache committed to AWS & React',
            '                       Stack: AWS · Docker · React · Node.js · TypeScript · Python'
          ]
        });
        break;

      case 'cowsay':
        newEntries.push({
          type: 'text',
          lines: generateCowsay()
        });
        break;

      case 'tux':
        newEntries.push({
          type: 'text',
          lines: [
            '        .--.',
            '       |o_o |       Hello, human! I am Tux.',
            '       |:_/ |       Official mascot of the Linux kernel.',
            '      //   \\ \\      May your kernel never panic and',
            '     (|     | )     your uptime be everlasting.',
            '    /\'\\_   _/`\\',
            '    \\___)=(___/'
          ]
        });
        break;

      case 'emoticon':
      case 'emoticons':
      case 'kaomoji':
      case 'faces':
        newEntries.push({
          type: 'text',
          lines: [
            '┌─────────────────────────────────────────────────────────────────┐',
            '│                 DEVELOPER EMOTICONS & KAOMOJI                   │',
            '└─────────────────────────────────────────────────────────────────┘',
            '',
            '  ¯\\_(ツ)_/¯             "Works on my machine / Not my problem"',
            '  (╯°□°)╯︵ ┻━┻          "Deploying to prod on Friday at 5 PM"',
            '  ┬─┬ノ( º _ ºノ)        "Senior dev calmly putting database back"',
            '  ಠ_ಠ                   "Did you just hardcode AWS credentials?"',
            '  ( ͡° ͜ʖ ͡°)             "git commit --amend --no-edit"',
            '  (⌐■_■)                "It compiled on first try with 0 warnings"',
            '  (⊙_⊙)                 "Looked at production logs for 2 seconds"',
            '  (づ｡◕‿‿◕｡)づ           "Sending hug before you debug Docker networking"',
            '  (=^･ω･^=)             "Terminal cat purring while Vite reloads"',
            '  ʕ•ᴥ•ʔ                 "DevOps bear inspecting the Kubernetes pods"',
            '  └[∵┌]└[ ∵ ]┘[┐∵]┘     "Robot dance: all tests passing green"',
            '',
            '💡 Try typing individual commands: shrug, tableflip, unflip, disapproval, lenny, tux, party'
          ]
        });
        break;

      case 'shrug':
        newEntries.push({
          type: 'text',
          lines: [
            '  ¯\\_(ツ)_/¯',
            '  "It works on my machine."'
          ]
        });
        break;

      case 'tableflip':
      case 'flip':
        newEntries.push({
          type: 'text',
          lines: [
            '  (╯°□°)╯︵ ┻━┻',
            '  "Who broke the staging environment?!"'
          ]
        });
        break;

      case 'unflip':
      case 'putback':
        newEntries.push({
          type: 'text',
          lines: [
            '  ┬─┬ノ( º _ ºノ)',
            '  "Staging environment restored. Please be gentle."'
          ]
        });
        break;

      case 'disapproval':
        newEntries.push({
          type: 'text',
          lines: [
            '  ಠ_ಠ',
            '  "Did you just commit .env or secrets to a public repo?"'
          ]
        });
        break;

      case 'lenny':
        newEntries.push({
          type: 'text',
          lines: [
            '  ( ͡° ͜ʖ ͡°)',
            '  "git push origin main --force"'
          ]
        });
        break;

      case 'party':
      case 'dance':
        newEntries.push({
          type: 'text',
          lines: [
            '  └[∵┌]└[ ∵ ]┘[┐∵]┘',
            '  "All unit tests and integration tests passing!"'
          ]
        });
        break;

      case 'fortune':
      case 'joke':
      case 'pun':
      case 'puns': {
        const puns = [
          '🐧 "Linux is user-friendly. It is just very selective about who its friends are."',
          '☕ "A programmer is a machine that turns caffeine into clean code and occasionally StackOverflow visits."',
          '☁️  "There is no cloud. It is just someone else\'s computer running Linux in a refrigerated warehouse."',
          '🐛 "Nine people can\'t make a baby in a month, and nine developers can\'t fix a bug in five minutes."',
          '🔑 "Why did the developer go broke? Because they used up all their cache."',
          '⚡ "Hardware is the part of a computer that you can kick; software is the part you can only curse at."',
          '🔄 "To understand what recursion is, you must first understand what recursion is."',
          '📦 "How do you extract a .tar.gz file? Nobody knows without Googling it first."'
        ];
        newEntries.push({
          type: 'text',
          lines: [puns[Math.floor(Math.random() * puns.length)]]
        });
        break;
      }

      case 'vim':
      case 'vi':
        newEntries.push({
          type: 'text',
          lines: [
            'Entering Vim...',
            'Warning: You can check out any time you like, but you can never leave. 🎶',
            'To escape safely, type:  :wq  or  :q!  (or pull the plug out of the wall).'
          ]
        });
        break;

      case ':wq':
      case ':q':
      case ':q!':
      case ':x':
        newEntries.push({
          type: 'text',
          lines: [
            '[Vim] Write and quit executed with exit code 0.',
            '🎉 Congratulations! You are officially in the top 1% of developers who know how to exit Vim!'
          ]
        });
        break;

      case 'nano':
        newEntries.push({
          type: 'text',
          lines: ['[GNU nano] Look at you using a text editor with on-screen exit instructions! Real hackers press Ctrl+X.']
        });
        break;

      case 'emacs':
        newEntries.push({
          type: 'text',
          lines: ['Emacs: A magnificent operating system, lacking only a good text editor. (Try Vim!)']
        });
        break;

      case 'top':
      case 'htop':
        newEntries.push({
          type: 'text',
          lines: [
            'top - 21:56:00 up 23 years, 1 user, load average: 0.12, 0.45, 0.99',
            'Tasks: 3 total, 1 running, 2 sleeping, 0 zombie',
            '%Cpu(s): 85.2 us, 10.4 sy, 0.0 ni, 4.4 id, 0.0 wa, 0.0 hi',
            'MiB Mem: 65536 total, 48210 used, 17326 free',
            '',
            '  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND',
            '    1 sarthak   20   0  128.0g  32.0g   8.4g S  99.9  48.8 999:59.99 building_scale',
            '   42 coffee    20   0    2.0g 512.0m 256.0m S  25.0   0.8  42:00.00 fueling_brain',
            ' 1337 chrome    39  19  999.0g 999.0g   1.0g R  98.5  99.9 888:88.88 420_open_tabs'
          ]
        });
        break;

      case 'ping':
        newEntries.push({
          type: 'text',
          lines: [
            'PING 127.0.0.1 (127.0.0.1): 56 data bytes',
            '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.038 ms',
            '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.032 ms',
            '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.029 ms',
            '--- 127.0.0.1 ping statistics ---',
            '3 packets transmitted, 3 packets received, 0.0% packet loss',
            'round-trip min/avg/max = 0.029/0.033/0.038 ms',
            '🏡 There is no place like 127.0.0.1 (localhost).'
          ]
        });
        break;

      case 'chmod':
      case 'chmod 777':
        newEntries.push({
          type: 'text',
          lines: [
            'chmod 777: Security engineer just had a mild stroke.',
            'Permissions granted: Everyone, their cat, and the NSA can now read, write, and execute this file.'
          ]
        });
        break;

      case 'kill':
      case 'kill -9':
      case 'killall':
        newEntries.push({
          type: 'text',
          lines: [
            'kill -9: Sending SIGKILL to process "bugs"...',
            'Process "imposter_syndrome" terminated successfully with exit code 0.',
            'System status: 100% confident.'
          ]
        });
        break;

      case 'uptime':
        newEntries.push({
          type: 'text',
          lines: [
            '21:56:00 up 23 years, 218 days, 1 user, load average: 0.42, 1.33, 2.50',
            'System SLA: 99.99% availability, 0 unplanned coffee outages.'
          ]
        });
        break;

      case 'tar':
        newEntries.push({
          type: 'text',
          lines: [
            'tar: The universal mystery of flags.',
            'Reminder: tar -zxvf file.tar.gz  (eXtract, eXclude confusion, Very Fast)',
            'Or as XKCD #1168 says: "tar: bomb defused."'
          ]
        });
        break;

      case 'curl':
      case 'wget':
        newEntries.push({
          type: 'text',
          lines: [
            'HTTP/2 200 OK',
            'server: SarthakEngine/3.0 (Cloudflare/AWS)',
            'content-type: application/inspiration; charset=utf-8',
            'x-powered-by: Passion, Caffeine & High-Availability Code'
          ]
        });
        break;

      case 'history':
        newEntries.push({
          type: 'text',
          lines: [
            '  101  git checkout -b feature/world-domination',
            '  102  npm install',
            '  103  npm run dev',
            '  104  git commit -m "refactor core logic"',
            '  105  git commit -m "fix typo"',
            '  106  git commit -m "actually fix typo for real"',
            '  107  git commit -m "why is this not working"',
            '  108  git commit -m "oh it was a missing semicolon"',
            '  109  git push origin main',
            '  110  docker-compose up --build -d'
          ]
        });
        break;

      case 'man':
        newEntries.push({
          type: 'text',
          lines: [
            'MAN(1)                       Developer Manual                      MAN(1)',
            '',
            'NAME',
            '    sarthak - Full Stack Engineer, Cloud Architect & Automation Builder',
            '',
            'SYNOPSIS',
            '    sarthak [--stack MERN|AWS|Python|Docker] [--build] [--ship]',
            '',
            'DESCRIPTION',
            '    A resilient, high-throughput developer with 8.88 CGPA from VIT.',
            '    Transforms complex infrastructure into fault-tolerant distributed systems.'
          ]
        });
        break;

      case 'pwd':
        newEntries.push({
          type: 'text',
          lines: ['/home/sarthak/portfolio/src/components/TerminalModal']
        });
        break;

      case 'date':
        newEntries.push({
          type: 'text',
          lines: [new Date().toString()]
        });
        break;

      case 'grep':
        newEntries.push({
          type: 'text',
          lines: [
            'grep: searching for "meaning_of_life" in /dev/sarthak...',
            '/usr/src/life/answers.c:42: return 42; /* Douglas Adams was right */'
          ]
        });
        break;

      case 'df':
      case 'free':
        newEntries.push({
          type: 'text',
          lines: [
            'Filesystem      Size  Used Avail Use% Mounted on',
            '/dev/brain     1000T  990T   10T  99% /knowledge/engineering',
            '/dev/coffee      2.0L 0.1L  1.9L   5% /energy/critically_low',
            '/dev/ambition     ∞     0     ∞    0% /limitless'
          ]
        });
        break;

      case 'matrix':
        newEntries.push({
          type: 'text',
          lines: ['Wake up, Neo...', 'The Matrix has you.', 'Follow the white rabbit. 🐇']
        });
        break;

      default:
        if (cmd.startsWith('sudo')) {
          if (cmd.includes('sandwich')) {
            newEntries.push({
              type: 'text',
              lines: [
                'What? Make it yourself.',
                'User: "sudo make me a sandwich"',
                'Okay. 🥪 [xkcd #149 reference detected]'
              ]
            });
          } else if (cmd.includes('rm')) {
            newEntries.push({
              type: 'text',
              lines: [
                '🚨 Nice try! Root-level destruction blocked by Sarthak\'s defense daemon.',
                'Audit log updated: "Guest tried to delete the multiverse."'
              ]
            });
          } else {
            newEntries.push({
              type: 'text',
              lines: [
                `[sudo] executing: ${raw.slice(5)}`,
                'Permission denied: Guest user does not have superuser privileges on Sarthak\'s cluster.'
              ]
            });
          }
          break;
        }

        if (cmd.startsWith('touch')) {
          if (cmd.includes('grass')) {
            newEntries.push({
              type: 'text',
              lines: [
                '🌱 Attempting TCP connection to local biosphere (Outdoors)...',
                'Connection established! You touched real grass. Vitamin D level: +10. Serenity: 100%.'
              ]
            });
          } else {
            newEntries.push({
              type: 'text',
              lines: [`touch: created virtual file '${raw.slice(6).trim() || 'file.txt'}'. File felt uncomfortable and left.`]
            });
          }
          break;
        }

        if (cmd.startsWith('rm')) {
          newEntries.push({
            type: 'text',
            lines: [
              'rm: it is dangerous to operate recursively on "/" without --no-preserve-root',
              '🛑 Deletion aborted. Sarthak\'s portfolio has plot armor.'
            ]
          });
          break;
        }

        if (cmd.startsWith('cowsay')) {
          const userMsg = raw.slice(6).trim();
          newEntries.push({
            type: 'text',
            lines: generateCowsay(userMsg)
          });
          break;
        }

        if (cmd.startsWith('cat')) {
          if (cmd.includes('coffee')) {
            newEntries.push({
              type: 'text',
              lines: [
                '      (  )   (   )  )',
                '       ) (   )  (  (',
                '       ( )  (    ) )',
                '     .-------------.',
                '    |   JAVA MUG    |==|',
                '    |  ☕ HOT ROAST  |  |',
                '    |  CAFFEINE++   |==|',
                '     \\             /',
                '      \'-----------\'',
                '',
                'HTTP/1.1 200 OK — Fresh Arabica brewed.',
                'Status: Developer productivity boosted by 200%.'
              ]
            });
          } else if (cmd.includes('flag') || cmd.includes('secret') || cmd.includes('pass')) {
            newEntries.push({
              type: 'text',
              lines: [
                '🔒 Looking for CTF flags?',
                'Flag: CTF{sarthak_is_ready_to_build_cool_stuff}'
              ]
            });
          } else {
            newEntries.push({
              type: 'text',
              lines: [`cat: ${raw.slice(4).trim() || '/dev/null'}: Output redirected into /dev/brain.`]
            });
          }
          break;
        }

        if (cmd.startsWith('git')) {
          if (cmd.includes('blame')) {
            newEntries.push({
              type: 'text',
              lines: [
                'git blame: Searching git history...',
                'author: "You (at 3:42 AM after 4 cups of coffee)"',
                'commit: "fixed critical bug, created 3 new ones"'
              ]
            });
          } else if (cmd.includes('push') && cmd.includes('force')) {
            newEntries.push({
              type: 'text',
              lines: [
                '🚨 ALERT: Force-pushing to main detected!',
                'Senior engineer is hyperventilating in the Slack channel.',
                'Git hook rejected: "With great power comes great git reverts."'
              ]
            });
          } else if (cmd.includes('status')) {
            newEntries.push({
              type: 'text',
              lines: [
                'On branch main',
                'Your branch is up to date with "origin/awesomeness".',
                'nothing to commit, working tree clean (All tests passing 100%).'
              ]
            });
          } else if (cmd.includes('gud')) {
            newEntries.push({
              type: 'text',
              lines: ['git: "git gud" is not a command. Try practicing LeetCode or drinking coffee.']
            });
          } else {
            newEntries.push({
              type: 'text',
              lines: [`git: ${raw}: Repository synchronized with Sarthak's GitHub (https://github.com/NotSoToxic).`]
            });
          }
          break;
        }

        if (cmd.startsWith('echo')) {
          newEntries.push({
            type: 'text',
            lines: [raw.slice(5).trim() || 'echo: ...echo... echo... (silence)']
          });
          break;
        }

        if (cmd.startsWith('ping')) {
          newEntries.push({
            type: 'text',
            lines: [
              `PING ${raw.slice(5).trim() || '127.0.0.1'}: 56 data bytes`,
              '64 bytes: icmp_seq=0 ttl=64 time=0.038 ms',
              '--- ping statistics ---',
              '1 packets transmitted, 1 packets received, 0.0% packet loss',
              '🏡 There is no place like 127.0.0.1 (localhost).'
            ]
          });
          break;
        }

        if (cmd.startsWith('man')) {
          newEntries.push({
            type: 'text',
            lines: [
              `man: No manual entry for "${raw.slice(4).trim()}". Real developers learn by breaking things in production.`
            ]
          });
          break;
        }

        newEntries.push({
          type: 'error',
          lines: [
            `zsh: command not found: ${raw}`,
            "Type 'help' to see valid commands or click any quick chip below."
          ]
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    }
  };

  const quickPills = ['skills', 'work', 'projects', 'edu', 'contact', 'resume', 'whoami', 'help', 'clear', 'exit'];

  return (
    <div className="term-modal-backdrop" onClick={onClose}>
      <div className="term-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Chrome Header */}
        <div className="term-modal-head">
          <div className="term-dots">
            <span className="dot r" onClick={onClose} title="Close terminal"></span>
            <span className="dot y" title="Minimize"></span>
            <span className="dot g" title="Expand"></span>
          </div>
          <div className="term-modal-title">sarthak@portfolio: ~ (zsh)</div>
          <div className="term-modal-esc" onClick={onClose}>[ESC]</div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="term-pills-bar">
          <span className="pills-label">QUICK:</span>
          {quickPills.map(p => (
            <button
              key={p}
              type="button"
              className="term-pill-btn"
              onClick={() => runCommand(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="term-modal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => {
            if (item.type === 'banner') {
              return (
                <div key={idx} className="term-entry banner">
                  {item.content.map((l, i) => <div key={i}>{l}</div>)}
                </div>
              );
            }

            if (item.type === 'cmd') {
              return (
                <div key={idx} className="term-entry cmd-echo">
                  <span className="prompt-lead">sarthak@node:~$</span>
                  <span className="cmd-text">{item.text}</span>
                </div>
              );
            }

            if (item.type === 'help') {
              return (
                <div key={idx} className="term-entry help-box">
                  {item.lines.map((l, i) => (
                    <div key={i} className={l.endsWith(':') ? 'help-hdr' : 'help-row'}>
                      {l === '' ? '\u00A0' : l}
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'skills') {
              return (
                <div key={idx} className="term-entry skills-box">
                  <div className="entry-hdr">⚡ TECHNICAL SKILLS & STACK</div>
                  {item.sections.map((s, i) => (
                    <div key={i} className="skill-row">
                      <span className="skill-cat">▸ {s.cat}:</span>
                      <span className="skill-val">{s.items}</span>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'work') {
              return (
                <div key={idx} className="term-entry work-box">
                  <div className="entry-hdr">🏢 WORK EXPERIENCE & METRICS</div>
                  {item.entries.map((w, i) => (
                    <div key={i} className="tmodal-work-card">
                      <div className="tmodal-work-title">
                        <span className="idx">[{i + 1}]</span> <strong>{w.company}</strong> — <span className="role">{w.role}</span>
                      </div>
                      <div className="tmodal-work-meta">{w.period}</div>
                      <ul className="tmodal-work-bullets">
                        {w.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'projects') {
              return (
                <div key={idx} className="term-entry projects-box">
                  <div className="entry-hdr">🚀 FEATURED PROJECTS</div>
                  {item.projects.map((pr, i) => (
                    <div key={i} className="tmodal-proj-card">
                      <div className="tmodal-proj-title">
                        <span className="idx">[{i + 1}]</span> <strong>{pr.title}</strong>
                      </div>
                      <div className="tmodal-proj-stack">Stack: {pr.stack}</div>
                      {pr.bullets ? (
                        <ul className="tmodal-work-bullets" style={{ margin: '6px 0 8px' }}>
                          {pr.bullets.map((b, bi) => (
                            <li key={bi}>{b}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="tmodal-proj-desc">{pr.desc}</div>
                      )}
                      <div className="tmodal-proj-links">
                        <a href={pr.repo} target="_blank" rel="noopener noreferrer" className="t-link">
                          GitHub Repo ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'edu') {
              return (
                <div key={idx} className="term-entry edu-box">
                  <div className="entry-hdr">🎓 EDUCATION</div>
                  {item.schools.map((sch, i) => (
                    <div key={i} className="tmodal-edu-card">
                      <div className="tmodal-edu-school"><strong>{sch.inst}</strong></div>
                      <div className="tmodal-edu-degree">{sch.degree}</div>
                      <div className="tmodal-edu-meta">{sch.dates} · <span className="grade">{sch.grade}</span></div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'contact') {
              return (
                <div key={idx} className="term-entry contact-box">
                  <div className="entry-hdr">📫 CONTACT DIRECTORY</div>
                  {item.info.map((c, i) => (
                    <div key={i} className="tmodal-contact-row">
                      <span className="c-label">▸ {c.label}:</span>
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="c-val t-link">
                        {c.val} ↗
                      </a>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'text') {
              return (
                <div key={idx} className="term-entry text-box">
                  {item.lines.map((l, i) => (
                    <div key={i} className="term-text-line">
                      {l === '' ? '\u00A0' : l}
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'error') {
              return (
                <div key={idx} className="term-entry error-box">
                  {item.lines.map((l, i) => (
                    <div key={i} className="err-line">
                      {l === '' ? '\u00A0' : l}
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}

          {/* Active CLI Input Line */}
          <div className="term-active-line">
            <span className="prompt-lead">sarthak@node:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-modal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (e.g. 'skills', 'work', 'projects')..."
              spellCheck={false}
              autoComplete="off"
            />
            <span className="term-cursor">▋</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
