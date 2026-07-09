// js/slides/SlideSimp.js
import { store } from '../core/store.js';
import { SlideExport } from './SlideExport.js';

export class SlideSimp {
    constructor() {
        this.parentContainer = null;
    }

    template(state) {
        const winner = state.stats.simp;

        return `
            <div class="max-w-4xl mx-auto px-6 text-center animate-fade-in flex flex-col justify-between min-h-[78vh] py-8">
                <!-- Top badging -->
                <div class="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center justify-center gap-2">
                    <span>STALKEE WRAPPED</span> 
                    <span class="text-zinc-800">//</span> 
                    <span class="text-[#E0FE00]">VERDICT 03</span>
                </div>

                <!-- Main content -->
                <div class="my-auto py-6 flex flex-col items-center">
                    <h2 class="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-6">
                        LE SCORE <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#E0FE00] to-lime-400">SIMP METER.</span>
                    </h2>
                    
                    <p class="text-zinc-400 text-xs md:text-sm max-w-sm mx-auto font-mono uppercase tracking-wide mb-10 leading-relaxed">
                        Cœurs, mots doux, emojis affectueux... L'un de vous deux montre une vulnérabilité émotionnelle hors du commun.
                    </p>

                    <div class="w-full max-w-xl flex flex-col items-center gap-6">
                        <!-- Le gagnant (Bords premium ultra-arrondis) -->
                        <div class="text-2xl md:text-4xl font-black tracking-tight text-white uppercase bg-zinc-950 border border-zinc-800 px-10 py-5 rounded-full shadow-2xl flex items-center gap-3">
                            <span class="text-xl md:text-2xl">🥰</span> ${winner.name}
                        </div>
                        
                        <!-- La data choc -->
                        <div class="space-y-4 mt-2">
                            <p class="text-zinc-400 text-sm md:text-lg font-mono uppercase tracking-wide max-w-md leading-normal">
                                A envoyé un total de <span class="text-[#E0FE00] font-black">${winner.loveCount}</span> <br class="hidden md:block">
                                mots doux ou emojis d'amour détectés.
                            </p>
                            
                            <!-- Verdict brutaliste -->
                            <span class="inline-block text-[10px] text-zinc-500 font-mono uppercase tracking-widest bg-zinc-950/40 border border-zinc-900 px-4 py-2 rounded-xl max-w-md">
                                VERDICT ⇢ Officiellement désigné comme le pilier émotionnel (ou le canard) de ce chat.
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Bottom action -->
                <div class="flex flex-col items-center gap-3 mt-4">
                    <!-- Bouton premium arrondi -->
                    <button id="next-slide-btn" class="bg-white text-black hover:bg-[#E0FE00] font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-[#e0fe001a]">
                        Générer le récapitulatif ⇢
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

        // On passe à la toute dernière slide : L'écran de récapitulatif global
        const slideExport = new SlideExport();
        slideExport.render(this.parentContainer);
    }
}