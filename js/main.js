import { store } from './core/store.js';
import { Navbar } from './components/Navbar.js';
import { DropZone } from './components/DropZone.js';
import { SlideIntro } from './slides/SlideIntro.js';

class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        
        // Instanciation des composants fondamentaux
        this.navbar = new Navbar();
        this.dropZone = new DropZone();
        this.slideIntro = new SlideIntro();

        this.init();
    }

    init() {
        // 1. On s'abonne aux changements d'état du Store
        store.subscribe((state) => {
            this.renderApp(state);
        });

        // 2. Premier rendu au chargement du site
        this.renderApp(store.state);
    }

    /**
     * Aligne l'interface utilisateur avec l'état actuel du Store
     * @param {Object} state - L'état global de l'application
     */
    renderApp(state) {
        // On vide proprement le conteneur principal
        this.appContainer.innerHTML = '';

        // Conteneur interne pour isoler l'écran du moment
        const screenContainer = document.createElement('div');
        screenContainer.className = "flex-grow flex flex-col justify-center w-full";
        screenContainer.id = "screen-content";
        this.appContainer.appendChild(screenContainer);

        // Routage dynamique simple basé sur le State
        if (!state.isAnalyzed) {
            // Écran d'accueil : On charge l'interface d'import
            this.dropZone.render(screenContainer);
        } else {
            // Écran de résultats : On bascule sur le Wrapped (Début avec la Slide d'Intro)
            this.slideIntro.render(screenContainer);
        }

        // Toujours injecter la Navbar en haut, peu importe l'écran actif
        this.navbar.render(this.appContainer);
    }
}

// Lancement officiel de l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new App();
});