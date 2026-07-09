// js/slides/SlideBavard.js
import { store } from '../core/store.js';
import { SlideGhosting } from './SlideGhosting.js';

export class SlideBavard {
    constructor() {
        this.parentContainer = null;
    }

    template(state) {
        const total = state.totalMessages;
        const winner = state.stats.bavard;
        
        // Calcul du pourcentage d'occupation de l'espace du chat
        const percentage = Math.round((winner.messageCount / total) * 100);
        const formattedWinnerCount = new Intl.NumberFormat('fr-FR').format(winner.messageCount);

        return `
            <div class="max-w-4xl mx-auto px-6 text-center animate-fade-in flex flex-col justify-between min-h-[78vh] py-8">
                <!-- Top badging -->
                <div class="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center justify-center gap-2">
                    <span>STALKEE WRAPPED</span> 
                    <span class="text-zinc-800">//</span> 
                    <span class="text-[#E0FE00]">VERDICT 01</span>
                </div>

                <!-- Main content -->
                <div class="my-auto py-6 flex flex-col items-center">
                    <h2 class="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-6">
                        QUI MONOPOLISE <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#E0FE00] to-lime-400">LA PAROLE ?</span>
                    </h2>
                    
                    <p class="text-zinc-400 text-xs md:text-sm max-w-sm mx-auto font-mono uppercase tracking-wide mb-10 leading-relaxed">
                        Il n'y a aucun équilibre ici. L'un de vous deux traite ce chat comme son journal intime.
                    </p>

                    <div class="w-full max-w-xl flex flex-col items-center gap-6">
                        <!-- Le gagnant (Coins ultra-arrondis et épurés) -->
                        <div class="text-2xl md:text-4xl font-black tracking-tight text-white uppercase bg-zinc-950 border border-zinc-800 px-10 py-5 rounded-full shadow-2xl flex items-center gap-3">
                            <span class="text-xl md:text-2xl">👑</span> ${winner.name}
                        </div>
                        
                        <!-- La data choc -->
                        <p class="text-zinc-400 text-sm md:text-lg font-mono uppercase tracking-wide max-w-md leading-normal mt-2">
                            A envoyé <span class="text-[#E0FE00] font-black">${formattedWinnerCount}</span> messages,<br class="hidden md:block"> 
                            soit <span class="text-white font-black bg-zinc-900 px-2 py-0.5 rounded">${percentage}%</span> de toute votre conversation.
                        </p>
                    </div>
                </div>

                <!-- Bottom action -->
                <div class="flex flex-col items-center gap-3 mt-4">
                    <!-- Bouton premium aux bords arrondis -->
                    <button id="next-slide-btn" class="bg-white text-black hover:bg-[#E0FE00] font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-[#e0fe001a]">
                        Qui se fait attendre ? ⇢
                    </button>
                    <div class="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">
                        Clique ou appuie sur Espace pour avancer
                    </div>
                </div>
            </div>
        `;
    }

    render(container) {
        this.parentContainer = container;
        this.parentContainer.innerHTML = this.template(store.state);
        this.bindEvents();
    }

    bindEvents() {
        const nextBtn = document.getElementById('next-slide-btn');
        if (!nextBtn) return;

        nextBtn.addEventListener('click', () => this.next());

        this.keyListener = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.next();
            }
        };
        window.addEventListener('keydown', this.keyListener);
    }

    next() {
        window.removeEventListener('keydown', this.keyListener);

        // On instancie et on passe au "Ghost Detector"
        const slideGhosting = new SlideGhosting();
        slideGhosting.render(this.parentContainer);
    }
}