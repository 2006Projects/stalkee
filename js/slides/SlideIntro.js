// js/slides/SlideIntro.js
import { store } from '../core/store.js';
import { SlideBavard } from './SlideBavard.js';

export class SlideIntro {
    constructor() {
        this.parentContainer = null;
    }

    template(state) {
        // Formate le nombre pour avoir des espaces (ex: 45 320 messages)
        const formattedMessages = new Intl.NumberFormat('fr-FR').format(state.totalMessages);
        
        // On récupère les noms des participants découverts
        const names = state.participants.join(' x ');

        return `
            <div class="max-w-4xl mx-auto px-6 text-center animate-fade-in flex flex-col justify-between min-h-[78vh] py-8">
                <!-- Top badging -->
                <div class="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center justify-center gap-2">
                    <span>STALKEE WRAPPED</span> 
                    <span class="text-zinc-800">//</span> 
                    <span class="text-[#E0FE00]">DOSSIER EXCLUSIF</span>
                </div>

                <!-- Main content -->
                <div class="my-auto py-6 flex flex-col items-center">
                    <!-- Badge Participants ultra-arrondi -->
                    <div class="text-[10px] font-mono text-[#E0FE00] uppercase tracking-wider bg-zinc-950 border border-zinc-800 px-5 py-2 rounded-full inline-block mb-6 shadow-md">
                        ⇢ ${names}
                    </div>
                    
                    <h2 class="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-6">
                        VOTRE ANNÉE <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#E0FE00] to-lime-400">EN CHIFFRES.</span>
                    </h2>
                    
                    <p class="text-zinc-400 text-xs md:text-sm max-w-sm mx-auto font-mono uppercase tracking-wide mb-10 leading-relaxed">
                        Au total, votre historique de discussion WhatsApp contient un volume de :
                    </p>

                    <!-- Le compteur choc (Design minimaliste et imposant) -->
                    <div class="flex flex-col items-center bg-zinc-950 border border-zinc-800 px-12 py-6 rounded-3xl shadow-2xl min-w-[280px]">
                        <div class="text-5xl md:text-7xl font-black tracking-tight font-mono text-white">
                            ${formattedMessages}
                        </div>
                        <div class="text-[9px] text-zinc-500 uppercase tracking-widest font-mono mt-2">
                            Messages échangés
                        </div>
                    </div>
                </div>

                <!-- Bottom action -->
                <div class="flex flex-col items-center gap-3 mt-4">
                    <!-- Bouton premium arrondi -->
                    <button id="next-slide-btn" class="bg-white text-black hover:bg-[#E0FE00] font-black text-xs uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl hover:shadow-[#e0fe001a]">
                        Découvrir les verdicts ⇢
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

        // Événement au clic pour passer à la slide suivante
        nextBtn.addEventListener('click', () => this.next());

        // Raccourci clavier (Touche Espace pour passer à la suite)
        this.keyListener = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.next();
            }
        };
        window.addEventListener('keydown', this.keyListener);
    }

    next() {
        // Nettoyage de l'écouteur global avant de changer d'écran
        window.removeEventListener('keydown', this.keyListener);

        // On instancie et on passe à la slide "Le plus bavard"
        const slideBavard = new SlideBavard();
        slideBavard.render(this.parentContainer);
    }
}