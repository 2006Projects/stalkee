class Store {
    constructor() {
        // L'état de l'application (State)
        this.state = {
            isAnalyzed: false,    // Indique si le Wrapped est prêt à être affiché
            totalMessages: 0,     // Volume total de messages traités
            participants: [],     // Liste des noms des participants découverts
            stats: null           // Résultats détaillés (bavard, ghosting, simpmeter...)
        };

        // Liste des fonctions de mise à jour de l'UI
        this.listeners = [];
    }

    /**
     * Permet à un composant de s'abonner aux changements du store
     * @param {Function} callback - La fonction à exécuter lors d'un changement d'état
     */
    subscribe(callback) {
        this.listeners.push(callback);
    }

    /**
     * Alerte tous les abonnés que les données ont changé
     */
    notify() {
        this.listeners.forEach(callback => callback(this.state));
    }

    /**
     * Action : Stocke les résultats du calcul et bascule l'UI vers le Wrapped
     * @param {Object} results - Les données calculées par l'analyseur
     */
    setAnalysisResults(results) {
        this.state.totalMessages = results.totalMessages;
        this.state.participants = results.participants;
        this.state.stats = results.stats;
        this.state.isAnalyzed = true;
        
        this.notify(); // On déclenche la mise à jour globale
    }

    /**
     * Action : Réinitialise l'application pour une nouvelle analyse
     */
    reset() {
        this.state.isAnalyzed = false;
        this.state.totalMessages = 0;
        this.state.participants = [];
        this.state.stats = null;
        
        this.notify(); // On fait revenir tout le monde à la case départ
    }
}

// Export d'une instance unique (Pattern Singleton)
export const store = new Store();