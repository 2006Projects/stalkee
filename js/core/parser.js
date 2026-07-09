// js/core/parser.js
export class WhatsappParser {
    /**
     * Nettoie et extrait les messages du fichier texte WhatsApp (Format iPhone / Android universel)
     * @param {string} rawText - Le contenu brut du fichier .txt
     * @returns {Array} Liste des messages structurés
     */
    static parse(rawText) {
        const messages = [];
        
        // Découpage du fichier ligne par ligne
        const lines = rawText.split('\n');
        let currentMessage = null;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // Détection du format iPhone : [21/06/2026 19:20:34] Sarietta: Bonsoir
            if (line.startsWith('[')) {
                // On extrait ce qu'il y a entre crochets
                const closeBracketIndex = line.indexOf(']');
                if (closeBracketIndex === -1) continue;

                const dateTimePart = line.substring(1, closeBracketIndex); // "21/06/2026 19:20:34"
                const restOfLine = line.substring(closeBracketIndex + 1).trim(); // "Sarietta: Bonsoir"

                // On sépare l'auteur du contenu au premier ":"
                const firstColonIndex = restOfLine.indexOf(':');
                if (firstColonIndex === -1) continue;

                const author = restOfLine.substring(0, firstColonIndex).trim();
                const content = restOfLine.substring(firstColonIndex + 1).trim();

                const [date, time] = dateTimePart.split(' ');

                // On zappe les alertes système
                if (author.includes('chiffrés') || content.includes('chiffrés') || author.toLowerCase().includes('whatsapp')) {
                    currentMessage = null;
                    continue;
                }

                if (currentMessage) messages.push(currentMessage);

                currentMessage = {
                    date: date || '',
                    time: time || '',
                    author: author,
                    content: content
                };
            } 
            // Détection du format Android standard : 21/06/2026, 19:20 - Sarietta: Bonsoir
            else {
                const androidRegex = /^(\d{2}\/\d{2}\/\d{4}),?\s(\d{2}:\d{2}(?::\d{2})?)\s-\s([^:]+):\s(.*)$/;
                const match = line.match(androidRegex);

                if (match) {
                    if (currentMessage) messages.push(currentMessage);

                    const author = match[3].trim();
                    const content = match[4].trim();

                    if (author.includes('chiffrés') || content.includes('chiffrés')) {
                        currentMessage = null;
                        continue;
                    }

                    currentMessage = {
                        date: match[1],
                        time: match[2],
                        author: author,
                        content: content
                    };
                } else {
                    // Si la ligne ne commence pas par un marqueur de date, c'est un retour à la ligne dans le message
                    if (currentMessage) {
                        currentMessage.content += '\n' + line;
                    }
                }
            }
        }

        // On pousse le tout dernier message
        if (currentMessage) {
            messages.push(currentMessage);
        }

        return messages;
    }
}