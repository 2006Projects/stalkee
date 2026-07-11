// js/core/NotificationManager.js
export class NotificationManager {
    constructor() {
        this.container = null;
        // Contenus percutants et psychologiques pour pousser à l'action
        this.impactPunches = [
            { title: "ALERTE ANALYSE", body: "Un utilisateur à Yaoundé vient de découvrir un ghosting de 3 mois." },
            { title: "VERDICT CRUCIAL", body: "Rapport généré : Score de 'Simp' détecté supérieur à 85% sur un profil." },
            { title: "STALKEE INSIGHT", body: "64% des utilisateurs découvrent que leur 'crush' répond en moins de 2 min... à quelqu'un d'autre." },
            { title: "MIGRATION TEXTE", body: "3,400 messages analysés en 0.4s. Fiabilité du verdict : 99.8%." }
        ];
    }

    init() {
        // 1. Enregistrement du Service Worker pour les vraies push mobiles
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker installé pour les Push notifications.'))
                .catch(err => console.error('Erreur SW:', err));
        }

        // 2. Création du conteneur de notifications simulées à l'écran
        this.createContainer();

        // 3. Déclencher la première notification factice après 2.5 secondes
        setTimeout(() => this.triggerFakeNotification(), 2500);
        
        // Puis une autre toutes les 25 secondes pour simuler une activité intense
        setInterval(() => this.triggerFakeNotification(), 25000);
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-toast-container';
        // Positionné en haut pour le mobile (style iOS/Android push)
        this.container.className = 'fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[9999] space-y-3 pointer-events-none';
        document.body.appendChild(this.container);
    }

    triggerFakeNotification() {
        const punch = this.impactPunches[Math.floor(Math.random() * this.impactPunches.length)];
        
        const toast = document.createElement('div');
        // Design ultra-sombre, bordure fine zinc et accents vert fluo Stalkee
        toast.className = 'w-full bg-[#09090B]/95 border border-zinc-800 backdrop-blur-md p-4 rounded-xl shadow-2xl flex items-start gap-3 pointer-events-auto transform translate-y-[-20px] opacity-0 transition-all duration-500 ease-out font-mono';
        
        toast.innerHTML = `
            <div class="w-2 h-2 rounded-full bg-[#E0FE00] mt-1.5 animate-pulse shrink-0"></div>
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-black text-white uppercase tracking-widest">${punch.title}</span>
                    <span class="text-[8px] text-zinc-600">MAINTENANT</span>
                </div>
                <p class="text-[11px] text-zinc-400 mt-1 leading-relaxed">${punch.body}</p>
            </div>
            <button class="text-zinc-600 hover:text-white text-xs font-sans select-none ml-2">×</button>
        `;

        // Événement de fermeture au clic sur la croix
        toast.querySelector('button').addEventListener('click', () => this.closeToast(toast));

        this.container.appendChild(toast);

        // Forcer le reflow pour déclencher l'animation d'apparition
        setTimeout(() => {
            toast.classList.remove('translate-y-[-20px]', 'opacity-0');
        }, 10);

        // Auto-destruction du toast après 7 secondes
        setTimeout(() => this.closeToast(toast), 7000);
    }

    closeToast(toast) {
        if (!toast) return;
        toast.classList.add('opacity-0', 'scale-95');
        setTimeout(() => toast.remove(), 500);
    }

    /**
     * À appeler via un bouton "Activer les notifications" dans ton UI
     * pour demander officiellement les vrais droits natifs à l'appareil
     */
    async requestTruePushPermission() {
        if (!('Notification' in window)) return false;
        
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            this.triggerFakeNotification(); // Notification de succès
            return true;
        }
        return false;
    }
}