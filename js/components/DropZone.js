// js/components/DropZone.js
import { store } from '../core/store.js';
import { WhatsappParser } from '../core/parser.js';
import { WhatsappAnalyzer } from '../core/analyzer.js';

export class DropZone {
    constructor() {
        this.parentContainer = null;
    }

    template() {
        return `
            <div class="max-w-4xl mx-auto px-6 text-center animate-fade-in flex flex-col items-center justify-center min-h-[70vh]">
                <span class="inline-block bg-[#111] text-zinc-400 text-[8px] font-mono uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                    T'inquiète! Aucune donnée enregistrée
                </span>

                <h1 class="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-4 leading-none">
                    SCANNE TA CONVERSATION. <br>
                    <span class="text-[#E0FE00]">DÉCOUVRE LA VÉRITÉ.</span>
                </h1>

                <p class="text-zinc-400 text-xs md:text-sm max-w-md mx-auto font-mono mb-6 uppercase tracking-wide">
                    Dépose le fichier contenant l'historique d'une discussion WhatsApp et découvre instantanément les statistiques secrètes de votre relation.
                </p>

                <!-- BOUTON DÉMO PREMIUM -->
                <div class="mb-10 w-full max-w-xs">
                    <button id="demo-trigger-btn" class="w-full bg-[#E0FE00] text-black hover:bg-white font-mono text-[10px] font-black uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2">
                        <span>Lancer une démo en 1 clic</span>
                    </button>
                </div>

                <!-- Zone de Drop native -->
                <div id="drop-area" class="w-full max-w-2xl bg-[#111] border-2 border-dashed border-zinc-800 hover:border-[#E0FE00] rounded-2xl p-10 md:p-16 cursor-pointer group transition-all duration-300">
                    <input type="file" id="file-input" class="hidden" accept=".txt">
                    
                    <div class="flex flex-col items-center justify-center space-y-4" id="drop-prompt">
                        <div class="text-base font-semibold text-zinc-200 group-hover:text-[#E0FE00] transition-colors">
                            Glisse ton fichier <span class="font-mono text-[#E0FE00]">_chat.txt</span> ici ou clique
                        </div>
                        <p class="text-xs text-zinc-500 max-w-xs mx-auto">
                            Exporte ta discussion WhatsApp sans les médias et dépose le fichier texte ici afin d'obtenir un wrapped.
                        </p>
                    </div>

                    <!-- Loader caché par défaut -->
                    <div class="hidden flex-col items-center justify-center space-y-4" id="drop-loader">
                        <div class="w-8 h-8 border-4 border-t-[#E0FE00] border-zinc-800 rounded-full animate-spin"></div>
                        <div class="text-xs font-mono tracking-widest text-zinc-400 uppercase" id="loader-text">Calcul des verdicts...</div>
                    </div>
                </div>
            </div>

        <!-- --- SECTION GUIDE --- -->
        <div class="w-full max-w-4xl mx-auto mt-20 mb-10 p-3 pt-12 border-t border-zinc-900 animate-fade-in">
            <div class="text-left mb-10">
                <span class="text-[#E0FE00] font-mono text-[10px] uppercase tracking-widest block mb-2">
                    ⇢ GUIDE
                </span>
                <h2 class="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white">
                    COMMENT ÇA MARCHE ?
                </h2>
                <p class="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1">
                    Quatre étapes simples pour analyser vos données en toute sécurité.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-left font-mono">
                <!-- ÉTAPE 1 : EXPORTER -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col justify-between min-h-[320px]">
                    <div>
                        <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-2">01</div>
                        <h3 class="text-white font-bold text-sm uppercase mb-2">Exporter</h3>
                        <p class="text-zinc-400 text-[11px] leading-relaxed mb-4">
                            Ouvre la discussion WhatsApp choisie, clique sur les options (ou son profil) et choisis <span class="text-zinc-200">"Plus"</span> puis <span class="text-[#E0FE00]">"Exporter la discussion"</span>.
                        </p>
                    </div>
                    <!-- Schéma Vectoriel : Option Exporter -->
                    <div class="w-full h-24 bg-black/40 border border-zinc-900 rounded-xl flex items-center justify-center p-2 mt-auto">
                        <svg class="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="5" width="140" height="70" rx="6" fill="#161616" stroke="#27272a" stroke-dasharray="2 2"/>
                            <!-- Menu contextuel -->
                            <rect x="45" y="12" width="70" height="48" rx="4" fill="#09090b" stroke="#3f3f46"/>
                            <line x1="53" y1="22" x2="107" y2="22" stroke="#27272a" stroke-width="2"/>
                            <line x1="53" y1="30" x2="95" y2="30" stroke="#27272a" stroke-width="2"/>
                            <!-- Bouton ciblé -->
                            <rect x="50" y="38" width="60" height="14" rx="2" fill="#E0FE00"/><!-- Highlight text -->
                            <text x="54" y="48" fill="black" font-family="monospace" font-size="6" font-weight="bold">EXPORTER CHAT</text>
                        </svg>
                    </div>
                </div>

                <!-- ÉTAPE 2 : SANS MÉDIAS -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col justify-between min-h-[320px]">
                    <div>
                        <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-2">02</div>
                        <h3 class="text-white font-bold text-sm uppercase mb-2">Sans Médias</h3>
                        <p class="text-zinc-400 text-[11px] leading-relaxed mb-4">
                            Sélectionne impérativement l'option <span class="text-[#E0FE00]">"Sans médias"</span>. Cela génère un fichier <span class="text-zinc-200">.txt</span> léger contenant uniquement les textes.
                        </p>
                    </div>
                    <!-- Schéma Vectoriel : Choix Sans Médias -->
                    <div class="w-full h-24 bg-black/40 border border-zinc-900 rounded-xl flex items-center justify-center p-2 mt-auto">
                        <svg class="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Pop up choix -->
                            <rect x="30" y="15" width="100" height="50" rx="6" fill="#09090b" stroke="#27272a"/>
                            <text x="40" y="28" fill="#a1a1aa" font-family="monospace" font-size="6">Joindre les médias ?</text>
                            <!-- Bouton Sans médias sélectionné -->
                            <rect x="38" y="38" width="40" height="16" rx="4" fill="#E0FE00"/>
                            <text x="43" y="48" fill="black" font-family="monospace" font-size="5" font-weight="bold">SANS MÉDIAS</text>
                            <!-- Bouton Avec médias grisé -->
                            <rect x="82" y="38" width="40" height="16" rx="4" fill="#161616" stroke="#27272a"/>
                            <text x="88" y="48" fill="#52525b" font-family="monospace" font-size="5">AVEC MÉDIAS</text>
                        </svg>
                    </div>
                </div>

                <!-- ÉTAPE 3 : DÉPOSER ICI -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col justify-between min-h-[320px]">
                    <div>
                        <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-2">03</div>
                        <h3 class="text-white font-bold text-sm uppercase mb-2">Glisser-déposer</h3>
                        <p class="text-zinc-400 text-[11px] leading-relaxed mb-4">
                            Glisse le fichier extrait (généralement nommé <span class="text-zinc-200">WhatsApp Chat.txt</span>) directement dans la zone de scan ci-dessus.
                        </p>
                    </div>
                    <!-- Schéma Vectoriel : Le Drop du fichier .txt -->
                    <div class="w-full h-24 bg-black/40 border border-zinc-900 rounded-xl flex items-center justify-center p-2 mt-auto">
                        <svg class="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Dropzone miniature -->
                            <rect x="40" y="30" width="80" height="38" rx="4" fill="#111" stroke="#3f3f46" stroke-dasharray="2 2"/>
                            <!-- Fichier txt volant avec flèche -->
                            <g class="animate-bounce" style="animation-duration: 2s;">
                                <rect x="68" y="8" width="24" height="28" rx="3" fill="#1c1c1e" stroke="#E0FE00" stroke-width="1.5"/>
                                <line x1="74" y1="15" x2="86" y2="15" stroke="#a1a1aa" stroke-width="1.5"/>
                                <line x1="74" y1="20" x2="82" y2="20" stroke="#a1a1aa" stroke-width="1.5"/>
                                <text x="73" y="29" fill="#E0FE00" font-family="monospace" font-size="5" font-weight="bold">.TXT</text>
                            </g>
                            <!-- Flèche descendante -->
                            <path d="M80 24 L80 34 M77 31 L80 34 L83 31" stroke="#E0FE00" stroke-width="1" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>

                <!-- ÉTAPE 4 : ANALYSER -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col justify-between min-h-[320px]">
                    <div>
                        <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-2">04</div>
                        <h3 class="text-white font-bold text-sm uppercase mb-2">Vérification</h3>
                        <p class="text-zinc-400 text-[11px] leading-relaxed mb-4">
                            L'algorithme analyse instantanément la structure, calcule les temps de réponse et génère tes slides de statistiques locales.
                        </p>
                    </div>
                    <!-- Schéma Vectoriel : Data à Slides -->
                    <div class="w-full h-24 bg-black/40 border border-zinc-900 rounded-xl flex items-center justify-center p-2 mt-auto">
                        <svg class="w-full h-full" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Dataviz / Écran final -->
                            <rect x="35" y="15" width="90" height="50" rx="5" fill="#09090b" stroke="#E0FE00" stroke-width="1.5"/>
                            <!-- Fake Données / Graphes miniatures -->
                            <circle cx="55" cy="40" r="14" stroke="#27272a" stroke-width="3"/>
                            <circle cx="55" cy="40" r="14" stroke="#E0FE00" stroke-width="3" stroke-dasharray="60 100"/>
                            <!-- Lignes de stats -->
                            <rect x="78" y="28" width="35" height="5" rx="1.5" fill="#E0FE00"/>
                            <rect x="78" y="38" width="25" height="4" rx="1.5" fill="#27272a"/>
                            <rect x="78" y="46" width="30" height="4" rx="1.5" fill="#27272a"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mt-6 p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-left">
                <p class="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wide">
                    SÉCURITÉ DES DONNÉES ⇢ Aucun fichier n'est envoyé vers un serveur. L'intégralité du traitement de la conversation s'effectue localement dans ton navigateur web.
                </p>
            </div>
        </div>

        <!-- --- FOOTER --- -->
        <footer class="w-full max-w-4xl mx-auto mt-20 pt-8 pb-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-wider uppercase text-zinc-600">
            <div class="flex items-center gap-2">
                <span>© 2026 STALKEE</span>
                <span class="text-zinc-800">//</span>
                <span>Un produit de WebByte Agency</span>
            </div>
            <div class="flex items-center gap-6">
                <a href="https://wa.me/237620828497" target="_blank" class="text-zinc-400 hover:text-[#E0FE00] transition-colors flex items-center gap-1.5 group">
                    <span>SERVICE CLIENT</span> 
                    <span class="text-[#E0FE00] group-hover:translate-x-0.5 transition-transform">⇢</span>
                </a>
                <span class="text-zinc-800">/</span>
                <span class="text-zinc-500">By ONANA Vital</span>
            </div>
        </footer>
        `;
    }

    render(container) {
        this.parentContainer = container;
        this.parentContainer.innerHTML = this.template();
        this.bindEvents();
    }

    bindEvents() {
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('file-input');
        const demoBtn = document.getElementById('demo-trigger-btn');

        if (!dropArea || !fileInput) return;

        if (demoBtn) {
            demoBtn.addEventListener('click', () => this.injectDemoData());
        }

        dropArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.add('border-[#E0FE00]', 'bg-[#151515]');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropArea.classList.remove('border-[#E0FE00]', 'bg-[#151515]');
            }, false);
        });

        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            this.handleFiles(dt.files);
        }, false);
    }

    handleFiles(files) {
        const file = files[0];
        if (!file || (file.type !== 'text/plain' && !file.name.endsWith('.txt'))) {
            alert('Format invalide. Pousse un fichier .txt valide.');
            return;
        }

        this.showLoader("Extraction de l'historique...");

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const cleanedMessages = WhatsappParser.parse(event.target.result);
                const computedResults = WhatsappAnalyzer.analyze(cleanedMessages);

                if (!computedResults) {
                    alert('Données illisibles ou incomplètes.');
                    this.resetUI();
                    return;
                }

                this.showLoader("Génération de l'UI animée...");
                setTimeout(() => {
                    store.setAnalysisResults(computedResults);
                }, 600);

            } catch (error) {
                console.error("Erreur d'analyse :", error);
                alert("Erreur lors du traitement du fichier.");
                this.resetUI();
            }
        };
        reader.readAsText(file);
    }

    injectDemoData() {
        this.showLoader("Initialisation de la simulation...");

        const mockResults = {
            totalMessages: 4852,
            participants: ["Sankara", "Thomas"],
            stats: {
                bavard: { name: "Sankara", count: 2940 },
                ghoster: { name: "Sankara", count: 184 },
                rapide: { name: "Thomas", count: 95 },
                simp: { name: "Thomas", count: 412 }
            }
        };

        setTimeout(() => {
            const loaderText = document.getElementById('loader-text');
            if (loaderText) loaderText.innerText = "Génération...";
            
            setTimeout(() => {
                store.setAnalysisResults(mockResults);
            }, 500);
        }, 800);
    }

    showLoader(text) {
        const prompt = document.getElementById('drop-prompt');
        const loader = document.getElementById('drop-loader');
        const loaderText = document.getElementById('loader-text');
        
        if (prompt) prompt.classList.add('hidden');
        if (loader) loader.classList.remove('hidden');
        if (loaderText && text) loaderText.innerText = text;
    }

    resetUI() {
        const prompt = document.getElementById('drop-prompt');
        const loader = document.getElementById('drop-loader');
        if (prompt) prompt.classList.remove('hidden');
        if (loader) loader.classList.add('hidden');
    }
}