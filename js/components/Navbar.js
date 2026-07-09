// js/components/Navbar.js
import { store } from '../core/store.js';

export class Navbar {
    template(state) {
        return `
            <header class="w-full max-w-6xl mx-auto mb-10 px-6 py-6 flex justify-between items-center border-b border-zinc-900">
                <div class="font-black tracking-tighter text-xl uppercase font-mono select-none">
                    Stalkee<span class="text-[#E0FE00]">.</span>
                </div>
                
                ${state.isAnalyzed ? `
                    <button id="nav-reset-btn" class="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors">
                        ✕ Fermer le dossier
                    </button>
                ` : `
                    <div class="text-[10px] font-mono tracking-widest text-zinc-600">
                        vBeta
                    </div>
                `}
            </header>
        `;
    }

    render(container) {
        // Pour éviter de dupliquer la navbar si elle existe déjà
        let existingNavbar = document.querySelector('header');
        if (existingNavbar) existingNavbar.remove();

        // On l'insère tout en haut du conteneur
        container.insertAdjacentHTML('afterbegin', this.template(store.state));
        this.bindEvents();
    }

    bindEvents() {
        const resetBtn = document.getElementById('nav-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => store.reset());
        }
    }
}