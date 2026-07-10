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

                <p class="text-zinc-400 text-xs md:text-sm max-w-md mx-auto font-mono mb-10 uppercase tracking-wide">
                    Dépose le fichier contenant l'historique d'une discussion WhatsApp et découvre instantanément les statistiques secrètes de votre relation.
                </p>

                <!-- Zone de Drop native -->
                <div id="drop-area" class="w-full max-w-2xl bg-[#111] border-2 border-dashed border-zinc-800 hover:border-[#E0FE00] rounded-2xl p-10 md:p-16 cursor-pointer group transition-all duration-300">
                    <input type="file" id="file-input" class="hidden" accept=".txt">
                    
                    <div class="flex flex-col items-center justify-center space-y-4" id="drop-prompt">
                        <div class="text-base font-semibold text-zinc-200 group-hover:text-[#E0FE00] transition-colors">
                            Glisse ton fichier <span class="font-mono text-[#E0FE00]">_chat.txt</span> ici ou clique
                        </div>
                        <p class="text-xs text-zinc-500 max-w-xs mx-auto">
                            Exporte ta discussion WhatsApp sans les médias et dépose le fichier texte ici.
                        </p>
                    </div>

                    <!-- Loader caché par défaut pendant l'analyse -->
                    <div class="hidden flex-col items-center justify-center space-y-4" id="drop-loader">
                        <div class="w-8 h-8 border-4 border-t-[#E0FE00] border-zinc-800 rounded-full animate-spin"></div>
                        <div class="text-xs font-mono tracking-widest text-zinc-400 uppercase">Calcul des verdicts...</div>
                    </div>
                </div>
            </div>

        <!-- --- SECTION PREMIUM : LE PROCÉSSUS --- -->
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
                <!-- Étape 1 -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-4">01</div>
                    <h3 class="text-white font-bold text-sm uppercase mb-2">Exporter</h3>
                    <p class="text-zinc-400 text-xs leading-relaxed">
                        Ouvre l'application WhatsApp, va dans les paramètres de la discussion choisie et clique sur <span class="text-zinc-200">"Exporter la conversation"</span> (sans médias).
                    </p>
                </div>

                <!-- Étape 2 -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-4">02</div>
                    <h3 class="text-white font-bold text-sm uppercase mb-2">Déposer</h3>
                    <p class="text-zinc-400 text-xs leading-relaxed">
                        Glisse et dépose le fichier texte obtenu (<span class="text-[#E0FE00]">_chat.txt</span>) directement dans la zone de numérisation ci-dessus.
                    </p>
                </div>

                <!-- Étape 3 -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-4">03</div>
                    <h3 class="text-white font-bold text-sm uppercase mb-2">Calculer</h3>
                    <p class="text-zinc-400 text-xs leading-relaxed">
                        Notre algorithme local traite l'historique en une fraction de seconde pour extraire les patterns et préparer les verdicts.
                    </p>
                </div>

                <!-- Étape 4 -->
                <div class="bg-[#111] border border-zinc-800 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                    <div class="text-3xl font-black text-zinc-800 group-hover:text-[#E0FE00] transition-colors mb-4">04</div>
                    <h3 class="text-white font-bold text-sm uppercase mb-2">Consulter</h3>
                    <p class="text-zinc-400 text-xs leading-relaxed">
                        Découvre tes résultats personnalisés à travers tes slides et partage ton bilan consolidé certifié.
                    </p>
                </div>
            </div>

            <!-- Note de confidentialité -->
            <div class="mt-6 p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-left">
                <p class="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-wide">
                    SÉCURITÉ DES DONNÉES ⇢ Aucun fichier n'est envoyé vers un serveur. L'intégralité du traitement de la conversation s'effectue localement dans ton navigateur web.
                </p>
            </div>
        </div>

        <!-- --- FOOTER MINIMALISTE --- -->
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

        if (!dropArea || !fileInput) return;

        // Déclenche l'input file au clic sur la zone
        dropArea.addEventListener('click', () => fileInput.click());

        // Changement de l'input file via explorateur
        fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));

        // Drag & Drop Événements graphiques
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

        // Capture du fichier déposé
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

        // Bascule visuelle vers le Loader
        document.getElementById('drop-prompt').classList.add('hidden');
        document.getElementById('drop-loader').classList.remove('hidden');

        const reader = new FileReader();
        
        reader.onload = (event) => {
            const rawText = event.target.result;
            
            // 1. Extraction brute des messages via le Parser
            const cleanedMessages = WhatsappParser.parse(rawText);
            
            // 2. Calcul mathématique instantané via l'Analyzer optimisé
            const computedResults = WhatsappAnalyzer.analyze(cleanedMessages);

            if (!computedResults) {
                alert('Fichier vide ou illisible.');
                this.resetUI();
                return;
            }

            // 3. On bombarde les résultats dans le Store central
            // C'est ce déclencheur qui va faire basculer l'écran grâce à main.js
            setTimeout(() => {
                store.setAnalysisResults(computedResults);
            }, 600); // Léger délai artificiel pour une transition fluide
        };

        reader.readAsText(file);
    }

    resetUI() {
        document.getElementById('drop-prompt').classList.remove('hidden');
        document.getElementById('drop-loader').classList.add('hidden');
    }
}