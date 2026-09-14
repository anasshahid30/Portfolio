import { initNeuralBackground } from './three-bg.js';
import { initChatbot } from './chatbot.js';

// Code snippets for the editor mockup
const CODE_FILES = {
    'agent_orchestrator.py': `from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.memory import ConversationBufferWindowMemory
from langchain_community.tools import DuckDuckGoSearchRun, PythonREPLTool

# Initialize Agentic Workflow
memory = ConversationBufferWindowMemory(k=5, return_messages=True)
tools = [DuckDuckGoSearchRun(), PythonREPLTool()]

async def execute_task(user_query: str) -> dict:
    """Decompose query & orchestrate multi-agent execution."""
    agent_chain = create_openai_tools_agent(llm, tools, prompt)
    executor = AgentExecutor(agent=agent_chain, tools=tools, memory=memory)
    response = await executor.ainvoke({"input": user_query})
    return {"status": "success", "result": response["output"]}`,

    'rag_pipeline.py': `import faiss
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA

# High-Precision Dense Retrieval System
def build_rag_system(document_chunks):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    vector_db = FAISS.from_documents(document_chunks, embeddings)
    
    retriever = vector_db.as_retriever(
        search_type="mmr", 
        search_kwargs={"k": 5, "lambda_mult": 0.7}
    )
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)`,

    'mcp_server.js': `import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Custom Model Context Protocol Server for AI Tool Access
const server = new Server({
  name: "anas-ai-tools-server",
  version: "1.0.0"
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "analyze_dataset",
    description: "Perform exploratory data analysis on target CSV",
    inputSchema: { type: "object", properties: { filepath: { type: "string" } } }
  }]
}));`
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Three.js Background & Chatbot
    initNeuralBackground();
    initChatbot();

    // 2. Navbar Scroll Class & Mobile Drawer
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightNavOnScroll();
    });

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
        });
    });

    // 3. Hero Typewriter Effect
    const typingText = document.getElementById('typingText');
    const phrases = [
        'orchestrate_ai_agents()',
        'build_rag_pipelines()',
        'fine_tune_llms()',
        'deploy_production_ai()'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeHeroPhrase() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeHeroPhrase, typeSpeed);
    }
    typeHeroPhrase();

    // 4. Code Editor Mockup Switching
    const codeDisplay = document.getElementById('codeSnippet');
    const tabButtons = document.querySelectorAll('.editor-tabs .tab-item');

    function updateCodeEditor(fileName) {
        if (codeDisplay && CODE_FILES[fileName]) {
            codeDisplay.textContent = CODE_FILES[fileName];
        }
    }
    updateCodeEditor('agent_orchestrator.py');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const fileName = btn.getAttribute('data-file');
            updateCodeEditor(fileName);
        });
    });

    // 5. Expertise Section Tabs
    const expTabs = document.querySelectorAll('.exp-tab');
    const expPanels = document.querySelectorAll('.exp-panel');

    expTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            expTabs.forEach(t => t.classList.remove('active'));
            expPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId)?.classList.add('active');
        });
    });

    // 6. Project Filter Grid
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 7. Accordion FAQs
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // 8. Impact Stat Count-Up Animation
    const statValues = document.querySelectorAll('.stat-value');
    let animatedStats = false;

    function animateStats() {
        const impactSection = document.getElementById('impact');
        if (!impactSection) return;

        const rect = impactSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !animatedStats) {
            animatedStats = true;
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const suffix = stat.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = Math.ceil(target / 40);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current.toLocaleString() + suffix;
                }, 30);
            });
        }
    }
    window.addEventListener('scroll', animateStats);

    // 9. Contact Modal & Forms
    const contactModal = document.getElementById('contactModal');
    const openModalBtns = [document.getElementById('openContactModal'), document.getElementById('heroContactBtn')];
    const closeModalBtn = document.getElementById('closeContactModal');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    openModalBtns.forEach(btn => {
        btn?.addEventListener('click', () => {
            contactModal?.classList.add('active');
        });
    });

    closeModalBtn?.addEventListener('click', () => {
        contactModal?.classList.remove('active');
    });

    contactModal?.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });

    // Form Submissions
    function handleFormSubmit(e) {
        e.preventDefault();
        contactModal?.classList.remove('active');
        showToast('Message sent successfully! Muhammad Anas Shahid will respond shortly.');
        e.target.reset();
    }

    document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('modalForm')?.addEventListener('submit', handleFormSubmit);

    function showToast(msg) {
        if (!toast) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Scroll Active Nav Link Highlight
    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link?.classList.add('active');
            } else {
                link?.classList.remove('active');
            }
        });
    }
});
