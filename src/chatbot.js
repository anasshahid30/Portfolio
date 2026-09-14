/**
 * Anas AI Assistant - Intelligent Client-Side Portfolio Chatbot
 * Type-Safe, High-Performance & Fully Mobile Responsive
 */

const ANAS_KNOWLEDGE_BASE = [
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'assalam', 'aoa'],
        answer: "Hello! 👋 I'm **Anas AI Assistant**. How can I help you explore Muhammad Anas Shahid's work, AI projects, or background?"
    },
    {
        keywords: ['who', 'anas', 'about', 'background', 'intro', 'bio', 'identity', 'profile'],
        answer: "I'm **Muhammad Anas Shahid**, an AI/ML Engineer and Software Engineering student at COMSATS University Lahore! I specialize in Generative AI, Large Language Models (LLMs), AI Agents, RAG pipelines, and intelligent automation."
    },
    {
        keywords: ['skills', 'tech', 'stack', 'languages', 'python', 'tools', 'frameworks', 'c++', 'java', 'sql'],
        answer: "Anas's technical ecosystem includes:\n• **Languages**: Python, C++, Java, SQL\n• **AI/ML**: PyTorch, TensorFlow, Scikit-learn, XGBoost\n• **GenAI & Agents**: LangChain, LangGraph, LlamaIndex, MCP, RAG, Embeddings\n• **Databases & Vector DBs**: PostgreSQL, MongoDB, Redis, FAISS, Chroma, Pinecone, Qdrant\n• **Engineering**: FastAPI, Docker, Git, Linux, AWS, Azure, GCP."
    },
    {
        keywords: ['project', 'projects', 'built', 'work', 'portfolio', 'olato', 'cobul', 'rag', 'agent', 'emergency'],
        answer: "Anas has built several impressive production-grade projects:\n1. **Olato**: Intelligent product platform & system architecture.\n2. **Cobul**: Scalable product implementation & core logic.\n3. **Smart Emergency Response System**: C++ Dijkstra graph matching for resource allocation.\n4. **AI Knowledge Assistant**: RAG document QA pipeline using vector embeddings & FastAPI.\n5. **Autonomous AI Research Agent**: Multi-step agent decomposing queries & synthesizing reports.\n6. **Multimodal Document Intelligence**: OCR + Vision-Language Model invoice parser.\n7. **Predictive ML System**: End-to-end ML pipeline with MLflow tracking."
    },
    {
        keywords: ['education', 'university', 'degree', 'comsats', 'study', 'gpa', 'courses', 'lahore'],
        answer: "Anas is pursuing a **Bachelor of Science in Software Engineering at COMSATS University Lahore**. Key coursework includes Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Software Architecture, and Statistics."
    },
    {
        keywords: ['certification', 'certificate', 'prompt', 'dubai', 'credential'],
        answer: "Anas holds a professional **Prompt Engineering Credential from the Dubai Future Foundation**, specializing in context engineering, structured LLM outputs, and Generative AI workflows."
    },
    {
        keywords: ['experience', 'marketing', 'growth', 'business', 'job', 'work', 'heyeve', 'brandixsoft', 'haystack'],
        answer: "Anas brings rich marketing & business growth experience to technology:\n• **Heyeve**: Grew social audience from 4k to 25k+ followers & acquired 4,000+ active users.\n• **JA Properties**: 30% client growth via digital marketing.\n• **Haystack App (UK)**: 45% increase in customer engagement.\n• **BrandixSoft**: Supported revenue growth from $350K to $600K through B2B outreach."
    },
    {
        keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'call', 'consult', 'message', 'address', 'mail'],
        answer: "You can reach Anas directly:\n• **Email**: a.shahid0430@gmail.com\n• **Phone**: +92 304 4656709\n• **Location**: Lahore, Pakistan\n\nOr click the **Get in Touch** button at the top to send a direct project inquiry!"
    },
    {
        keywords: ['rag', 'retrieval', 'vector', 'embedding', 'faiss', 'chroma'],
        answer: "Anas designs production RAG pipelines using dense text embeddings, vector databases (FAISS, Chroma, Pinecone), MMR reranking, and hallucination-free context generation served via FastAPI."
    },
    {
        keywords: ['agent', 'agents', 'mcp', 'langgraph', 'autonomous', 'workflow'],
        answer: "Anas builds stateful multi-agent systems, tool-calling agents, and Model Context Protocol (MCP) integrations using LangGraph and LangChain, enabling AI to reason, plan, and execute multi-step workflows autonomously."
    }
];

export function initChatbot() {
    const launcher = document.getElementById('chatLauncher');
    const windowEl = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatCloseBtn');
    const resetBtn = document.getElementById('chatResetBtn');
    const messagesEl = document.getElementById('chatMessages');
    const inputEl = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const promptChips = document.querySelectorAll('.chip-btn');

    if (!launcher || !windowEl) return;

    // Toggle Chat Window on Click or Touch
    function toggleChat(e) {
        e?.preventDefault();
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) {
            setTimeout(() => inputEl?.focus(), 150);
        }
    }

    launcher.addEventListener('click', toggleChat);

    closeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        windowEl.classList.remove('active');
    });

    // Reset Chat Conversation
    resetBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!messagesEl) return;
        messagesEl.innerHTML = `
            <div class="chat-message assistant">
                <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="message-content">
                    <p>Hi! 👋 I'm <strong>Anas AI Assistant</strong>. Ask me anything about Muhammad Anas Shahid's AI skills, projects, education, or business experience!</p>
                </div>
            </div>
        `;
    });

    // Type-Safe Send Message
    function sendMessage(textInput) {
        let query = '';

        if (typeof textInput === 'string' && textInput.trim().length > 0) {
            query = textInput.trim();
        } else if (inputEl && inputEl.value.trim().length > 0) {
            query = inputEl.value.trim();
            inputEl.value = '';
        }

        if (!query) return;

        // Render User Message
        appendMessage('user', query);

        // Show Typing Indicator
        showTypingIndicator();

        // Simulate AI Response Delay
        setTimeout(() => {
            removeTypingIndicator();
            const reply = generateResponse(query);
            appendMessage('assistant', reply);
        }, 500);
    }

    sendBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        sendMessage();
    });

    inputEl?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Click suggested prompt chips
    promptChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            const promptText = chip.getAttribute('data-prompt');
            if (promptText) {
                sendMessage(promptText);
            }
        });
    });

    function appendMessage(sender, content) {
        if (!messagesEl) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;

        const safeStr = String(content || '');
        const formattedContent = safeStr
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        if (sender === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="message-content">
                    <p>${formattedContent}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${formattedContent}</p>
                </div>
            `;
        }

        messagesEl.appendChild(messageDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTypingIndicator() {
        if (!messagesEl) return;
        removeTypingIndicator();
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'chat-message assistant typing-indicator-msg';
        indicatorDiv.id = 'typingIndicator';
        indicatorDiv.innerHTML = `
            <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content typing-content">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;
        messagesEl.appendChild(indicatorDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        indicator?.remove();
    }

    function generateResponse(userQuery) {
        const queryStr = String(userQuery || '').toLowerCase();

        // Match against Knowledge Base
        let bestMatch = null;
        let maxHits = 0;

        for (const item of ANAS_KNOWLEDGE_BASE) {
            let hits = 0;
            for (const kw of item.keywords) {
                if (queryStr.includes(kw)) {
                    hits++;
                }
            }
            if (hits > maxHits) {
                maxHits = hits;
                bestMatch = item.answer;
            }
        }

        if (bestMatch && maxHits > 0) {
            return bestMatch;
        }

        // Default Intelligent Fallback
        return `I can help answer questions about **Muhammad Anas Shahid's** AI/ML engineering projects, background in RAG & AI Agents, COMSATS education, or marketing experience. \n\nFeel free to ask about his **projects**, **tech stack**, **education**, or how to **contact** him directly!`;
    }
}
