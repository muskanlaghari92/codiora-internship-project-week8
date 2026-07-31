// Dynamic Application Database Repository Stack Object Configuration (Week 3 API Specification)
const applicationStateDB = {
    projects: [
        {
            id: 1,
            name: "School Management System",
            description: "Complete student records tracking, class attendance registers, integrated course allocations matrix, and modular fee ledger optimization suites for Corevex College administration panels.",
            category: "Web Development",
            technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
            image: "image9.jpeg",
            github: "https://github.com/muskanlaghari92",
            live: "#"
        },
        {
            id: 2,
            name: "Corevex College Portal",
            description: "A student-facing web portal for course registration, exam result lookup, and fee status tracking, built as a companion interface to the main College Management System.",
            category: "Web Development",
            technologies: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
            image: "image4.jpg",
            github: "https://github.com/muskanlaghari92",
            live: "#"
        },
        {
            id: 3,
            name: "Personal Portfolio Website",
            description: "Modern production responsive dynamic profile application configured with dark neon overrides options, asynchronous content components injection, and core access controls.",
            category: "UI/UX Design",
            technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
            image: "image3.jpg",
            github: "https://github.com/muskanlaghari92",
            live: "personal portfolio-websites/index.html"
        },
        {
            id: 4,
            name: "Weather Dashboard",
            description: "A weather application with location based forecasts, interactive maps, and detailed weather analytics.",
            category: "UI/UX Design",
            technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
            image: "image2.jpg",
            github: "https://github.com/muskanlaghari92",
            live: "#"
        },
        {
            id: 5,
            name: "Car World Catalog Engine",
            description: "A fast client vehicular searching directory interface featuring immediate dynamic filtration attributes, detailed specs parameters matrices, and conversion calculations.",
            category: "Mobile Development",
            technologies: ["JavaScript", "HTML5", "CSS3", "Bootstrap"],
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
            github: "https://github.com/muskanlaghari92",
            live: "car-websites/index.html"
        },
        {
            id: 6,
            name: "TimeLuxe Watch Store",
            description: "A luxury watch e-commerce storefront with product collections, new arrivals showcase, and a clean checkout-ready shopping layout.",
            category: "Web Development",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
            github: "https://github.com/muskanlaghari92",
            live: "watch-website/index.html"
        }
    ],
    articles: [
        {
            id: 1,
            title: "-Ali-Ahmed",
            excerpt: "Excellent developer with a professional attitude. Delivered high quality work on time.",
            date: "Client Review",
            readTime: "★★★★★",
            icon: "fas fa-quote-left"
        },
        {
            id: 2,
            title: "-Sarah khan",
            excerpt: "Muskan built a fully responsive modern website for us. Great communication and design sense.",
            date: "Client Review",
            readTime: "★★★★★",
            icon: "fas fa-quote-left"
        },
        {
            id: 3,
            title: "-Muhammed khan",
            excerpt: "Highly skilled front-end developer. I would definitely recommend for any web project.",
            date: "Client Review",
            readTime: "★★★★★",
            icon: "fas fa-quote-left"
        }
    ]
};

// Application Scope Memory Pointers
let databaseMemoryReference = [];
let operationalActiveCategory = "All";

// DOM Lifecycle Execution Handlers Configuration Block
document.addEventListener("DOMContentLoaded", () => {
    databaseMemoryReference = applicationStateDB.projects;
    
    // Core dynamic component generation loops setup
    generateFilteringUIElements();
    executeRenderProjectsPipeline(databaseMemoryReference);
    executeRenderArticlesPipeline(applicationStateDB.articles);
    attachFunctionalInterfaceTriggers();
});

// 1. Dynamic Project Category Filtering Construction Logic
function generateFilteringUIElements() {
    const filtersTargetNode = document.getElementById("filter-buttons");
    if (!filtersTargetNode) return;
    
    const filteringSchemas = ["All", "Web Development", "Mobile Development", "UI/UX Design"];

    filtersTargetNode.innerHTML = filteringSchemas.map((categoryString, cursorIndex) => `
        <button 
            onclick="updateActiveFilterContext('${categoryString}')"
            id="filter-node-item-${cursorIndex}"
            class="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${categoryString === 'All' ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20' : 'bg-[#0f111a] border border-slate-800 text-slate-400 hover:text-white'}"
            role="tab"
            aria-selected="${categoryString === 'All' ? 'true' : 'false'}"
        >
            ${categoryString}
        </button>
    `).join('');
}

function updateActiveFilterContext(selectedSchemaName) {
    operationalActiveCategory = selectedSchemaName;
    const categoriesArray = ["All", "Web Development", "Mobile Development", "UI/UX Design"];
    
    categoriesArray.forEach((name, idx) => {
        const itemNode = document.getElementById(`filter-node-item-${idx}`);
        if (itemNode) {
            if (name === selectedSchemaName) {
                itemNode.className = "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20";
                itemNode.setAttribute("aria-selected", "true");
            } else {
                itemNode.className = "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer bg-[#0f111a] border border-slate-800 text-slate-400 hover:text-white";
                itemNode.setAttribute("aria-selected", "false");
            }
        }
    });

    evaluateCombinedFilterQueries();
}

// 4. Combined Input Query & Category Logic Pipeline Intersect
function evaluateCombinedFilterQueries() {
    const searchNode = document.getElementById("search-input");
    const stringSearchQuery = searchNode ? searchNode.value.toLowerCase() : "";

    const processingSubset = databaseMemoryReference.filter(dataBlock => {
        const matchText = dataBlock.name.toLowerCase().includes(stringSearchQuery) || 
                          dataBlock.technologies.some(techString => techString.toLowerCase().includes(stringSearchQuery));
        const matchType = (operationalActiveCategory === "All") || (dataBlock.category === operationalActiveCategory);
        return matchText && matchType;
    });

    executeRenderProjectsPipeline(processingSubset);
}

// Fixed Render Function: Added Image Structure & Integrated CSS Hover Hook
function executeRenderProjectsPipeline(datasetArray) {
    const interfaceContainerNode = document.getElementById("projects-container");
    const errorFlagDisplayNode = document.getElementById("empty-state");

    if (!interfaceContainerNode) return;

    if (datasetArray.length === 0) {
        interfaceContainerNode.innerHTML = "";
        if (errorFlagDisplayNode) errorFlagDisplayNode.classList.remove("hidden");
        return;
    }
    if (errorFlagDisplayNode) errorFlagDisplayNode.classList.add("hidden");

    interfaceContainerNode.innerHTML = datasetArray.map(projectRecord => `
        <article class="project-card flex flex-col justify-between">
            <div class="project-img-frame">
                <img src="${projectRecord.image}" alt="${projectRecord.name}" class="card-thumbnail-image">
            </div>
            
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold text-cyan-400 tracking-widest uppercase">${projectRecord.category}</span>
                        <i class="fas fa-folder text-slate-700 text-sm"></i>
                    </div>
                    <h3 class="text-base font-extrabold text-white tracking-wide">${projectRecord.name}</h3>
                    <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">${projectRecord.description}</p>
                </div>
                
                <div class="text-[11px] font-mono text-slate-500 tracking-tight flex flex-wrap gap-2 pt-1">
                    ${projectRecord.technologies.map(t => `<span>• ${t}</span>`).join('')}
                </div>
            </div>
            
            <div class="p-5 pt-0 grid grid-cols-2 gap-3 mt-auto">
                ${projectRecord.live && projectRecord.live !== "#" 
                    ? `<a href="${projectRecord.live}" target="_blank" rel="noopener" class="py-2 text-center bg-cyan-400 text-slate-950 hover:bg-cyan-300 rounded-lg text-xs font-bold transition-colors block">Live Demo</a>`
                    : `<button onclick="triggerModalViewport(${projectRecord.id})" class="py-2 text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 transition-colors cursor-pointer">Live Demo</button>`
                }
                <a href="${projectRecord.github}" target="_blank" rel="noopener" class="py-2 text-center bg-transparent hover:bg-slate-900 border border-cyan-400/30 rounded-lg text-xs font-bold text-cyan-400 transition-colors block">
                    GitHub
                </a>
            </div>
        </article>
    `).join('');
}

// 3. Technical Articles Injection Routing
function executeRenderArticlesPipeline(articlesDataArray) {
    const blogViewWrapper = document.getElementById("blog-container");
    if (!blogViewWrapper) return;
    
    blogViewWrapper.innerHTML = articlesDataArray.map(articleNode => `
        <article class="skill-card bg-[#0f111a] border border-slate-800/80 p-6 rounded-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors">
            <div class="space-y-3">
                <i class="${articleNode.icon || 'fas fa-quote-left'} text-cyan-400/40 text-xl"></i>
                <p class="text-xs text-slate-400 leading-relaxed">${articleNode.excerpt}</p>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-slate-800/60">
                <h3 class="text-sm font-bold text-slate-200 tracking-wide">${articleNode.title.replace(/^-/, '')}</h3>
                <span class="text-yellow-400 text-xs">${articleNode.readTime}</span>
            </div>
        </article>
    `).join('');
}

// 2. Project Viewport Details Modal System Logic Controls
function triggerModalViewport(uniqueTargetId) {
    const dataInstance = databaseMemoryReference.find(p => p.id === uniqueTargetId);
    if (!dataInstance) return;

    document.getElementById("modal-title").textContent = dataInstance.name;
    
    const modalImg = document.getElementById("modal-image");
    if (modalImg) modalImg.src = dataInstance.image;
    
    document.getElementById("modal-desc").textContent = dataInstance.description;
    document.getElementById("modal-github").href = dataInstance.github;

    const liveBtn = document.getElementById("modal-live");
    const modalFooter = document.getElementById("modal-footer");
    if (liveBtn) {
        if (dataInstance.live && dataInstance.live !== "#") {
            liveBtn.href = dataInstance.live;
            liveBtn.classList.remove("hidden");
            if (modalFooter) modalFooter.classList.replace("grid-cols-1", "grid-cols-2");
        } else {
            liveBtn.classList.add("hidden");
            if (modalFooter) modalFooter.classList.replace("grid-cols-2", "grid-cols-1");
        }
    }

    document.getElementById("modal-tech").innerHTML = dataInstance.technologies.map(tString => `
        <span class="text-[10px] font-mono font-bold tracking-wider px-3 py-1 bg-[#0b0c10] border border-slate-800 text-slate-300 rounded-md">${tString}</span>
    `).join('');

    document.getElementById("project-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("project-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

// 6. User Validation Entry Gateway Evaluation Logic Block
function processFormSubmissionChain(e) {
    e.preventDefault();
    
    const nodeName = document.getElementById("form-name");
    const nodeEmail = document.getElementById("form-email");
    const nodeMessage = document.getElementById("form-message");

    let deploymentBlockerFlag = false;

    // Reset layout structural errors configurations flags
    document.querySelectorAll("[id^='error-']").forEach(eNode => eNode.classList.add("hidden"));
    if (nodeName) [nodeName, nodeEmail, nodeMessage].forEach(iNode => iNode && iNode.classList.remove("form-input-error"));

    if (nodeName && !nodeName.value.trim()) {
        displayFieldValidationError("error-name", nodeName, "Please enter your name.");
        deploymentBlockerFlag = true;
    }
    if (nodeEmail && !nodeEmail.value.trim()) {
        displayFieldValidationError("error-email", nodeEmail, "Please enter your email address.");
        deploymentBlockerFlag = true;
    } else if (nodeEmail && !/\S+@\S+\.\S+/.test(nodeEmail.value)) {
        displayFieldValidationError("error-email", nodeEmail, "Please enter a valid email address.");
        deploymentBlockerFlag = true;
    }
    if (nodeMessage && !nodeMessage.value.trim()) {
        displayFieldValidationError("error-message", nodeMessage, "Please enter your message.");
        deploymentBlockerFlag = true;
    }

    if (!deploymentBlockerFlag) {
        const structuralAlertNode = document.getElementById("form-success");
        if (structuralAlertNode) structuralAlertNode.classList.remove("hidden");
        const contactForm = document.getElementById("contact-form");
        if (contactForm) contactForm.reset();
        setTimeout(() => structuralAlertNode && structuralAlertNode.classList.add("hidden"), 4000);
    }
}

function displayFieldValidationError(errorLabelNodeId, targetInputTagRef, textAlertDescription) {
    const errorNodeTarget = document.getElementById(errorLabelNodeId);
    if (errorNodeTarget) {
        errorNodeTarget.textContent = textAlertDescription;
        errorNodeTarget.classList.remove("hidden");
    }
    if (targetInputTagRef) targetInputTagRef.classList.add("form-input-error");
}

function attachFunctionalInterfaceTriggers() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.addEventListener("input", evaluateCombinedFilterQueries);
    
    const contactForm = document.getElementById("contact-form");
    if (contactForm) contactForm.addEventListener("submit", processFormSubmissionChain);
    
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const modeIcon = document.querySelector("#theme-toggle i");
            if (modeIcon) {
                if (document.body.classList.contains("light-theme")) {
                    modeIcon.className = "fas fa-sun text-yellow-500";
                } else {
                    modeIcon.className = "fas fa-moon text-slate-400";
                }
            }
        });
    }

    // Mobile hamburger menu toggle
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileNavPanel = document.getElementById("mobile-nav-panel");
    if (mobileMenuToggle && mobileNavPanel) {
        mobileMenuToggle.addEventListener("click", () => {
            const isOpen = !mobileNavPanel.classList.contains("hidden");
            if (isOpen) {
                mobileNavPanel.classList.add("hidden");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mobileNavPanel.classList.remove("hidden");
                mobileMenuToggle.setAttribute("aria-expanded", "true");
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            }
        });

        // Close the mobile menu automatically after a link is tapped
        mobileNavPanel.querySelectorAll(".mobile-nav-link").forEach(link => {
            link.addEventListener("click", () => {
                mobileNavPanel.classList.add("hidden");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Scroll-spy: highlight the nav link matching the section currently in view
    const spySections = document.querySelectorAll("section[id]");
    const desktopNavLinks = document.querySelectorAll("#desktop-nav-links .nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-panel .mobile-nav-link");

    if (spySections.length && (desktopNavLinks.length || mobileNavLinks.length)) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = "#" + entry.target.id;
                    desktopNavLinks.forEach(link => {
                        link.classList.toggle("active-link", link.getAttribute("href") === activeId);
                        if (link.getAttribute("href") !== activeId) link.classList.remove("text-cyan-400");
                    });
                    mobileNavLinks.forEach(link => {
                        link.classList.toggle("active-link", link.getAttribute("href") === activeId);
                    });
                }
            });
        }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

        spySections.forEach(section => spyObserver.observe(section));
    }

    window.addEventListener("keydown", (eventArgs) => {
        if (eventArgs.key === "Escape") {
            closeModal();
            const assistantPanel = document.getElementById("assistant-panel");
            const assistantToggle = document.getElementById("assistant-toggle");
            if (assistantPanel && !assistantPanel.classList.contains("hidden")) {
                assistantPanel.classList.add("hidden");
                if (assistantToggle) assistantToggle.setAttribute("aria-expanded", "false");
            }
        }
    });
}

// ===================================================
// DYNAMIC METRICS COUNTER ANIMATION ENGINE
// ===================================================
function triggerMetricsCounterAnimation() {
    const totalCounterNodes = document.querySelectorAll('.counter-digit');
    
    totalCounterNodes.forEach(counterItem => {
        const startValue = parseInt(counterItem.getAttribute('data-start'), 10) || 0;
        const finalTargetValue = parseInt(counterItem.getAttribute('data-target'), 10) || 0;
        
        let currentLiveCount = startValue;
        counterItem.textContent = currentLiveCount;

        const calculationTimer = setInterval(() => {
            if (currentLiveCount < finalTargetValue) {
                currentLiveCount++;
                counterItem.textContent = currentLiveCount;
            } else {
                clearInterval(calculationTimer);
            }
        }, 35); 
    });
}