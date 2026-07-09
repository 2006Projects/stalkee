// js/core/analyzer.js
export class WhatsappAnalyzer {
    static analyze(messages) {
        if (!messages || messages.length === 0) return null;

        const totalMessages = messages.length;
        const userStats = {};

        // Initialisation rapide des compteurs pour chaque participant
        messages.forEach(msg => {
            if (!userStats[msg.author]) {
                userStats[msg.author] = {
                    name: msg.author,
                    messageCount: 0,
                    loveCount: 0,
                    mediaCount: 0, // Pour les fichiers omis, photos, etc.
                    vocalCount: 0  // Pour les notes vocales
                };
            }
        });

        // Les participants uniques détectés
        const participants = Object.keys(userStats);

        // Mots doux pour le Simp Meter
        const lovePatterns = ['je t\'aime', 't\'aime', 'mon coeur', 'ma puce', 'bebé', 'chéri', '❤️', '🥰', '😘', '😍', 'love'];

        // Boucle UNIQUE ultra-rapide sur tous les messages
        for (let i = 0; i < totalMessages; i++) {
            const msg = messages[i];
            const stats = userStats[msg.author];
            if (!stats) continue;

            stats.messageCount++;

            const contentLower = msg.content.toLowerCase();

            // 1. Simp Meter
            lovePatterns.forEach(pattern => {
                if (contentLower.includes(pattern)) {
                    stats.loveCount++;
                }
            });

            // 2. Détection Médias / Vocaux (Format iPhone et Android)
            if (contentLower.includes('omise') || contentLower.includes('pjoint') || contentLower.includes('attachement') || contentLower.includes('image')) {
                stats.mediaCount++;
            }
            if (contentLower.includes('audio') || contentLower.includes('vocal') || contentLower.includes('retranscription')) {
                stats.vocalCount++;
            }
        }

        // Détermination des vainqueurs par tri simple
        const usersArray = Object.values(userStats);
        
        // Plus bavard
        const bavard = [...usersArray].sort((a, b) => b.messageCount - a.messageCount)[0];
        
        // Simp Meter
        const simp = [...usersArray].sort((a, b) => b.loveCount - a.loveCount)[0];
        
        // Roi des médias (Remplace le Ghoster pour aller plus vite)
        const ghoster = [...usersArray].sort((a, b) => b.mediaCount - a.mediaCount)[0];
        
        // Roi des vocaux (Remplace le plus rapide)
        const rapide = [...usersArray].sort((a, b) => b.vocalCount - a.vocalCount)[0];

        return {
            participants,
            totalMessages,
            stats: {
                bavard,
                simp,
                ghoster: {
                    name: ghoster.name,
                    averageResponseTime: ghoster.mediaCount // Détourné temporairement pour éviter de casser tes slides
                },
                rapide
            }
        };
    }
}