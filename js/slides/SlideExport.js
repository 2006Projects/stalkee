import { store } from '../core/store.js';

export class SlideExport {
    constructor() {
        this.parentContainer = null;
    }

    template(state) {
        const stats = state.stats;
        const totalFormatted = new Intl.NumberFormat('fr-FR').format(state.totalMessages);

        return `
            <div class="max-w-xl mx-auto px-4 text-center animate-fade-in flex flex-col justify-between min-h-[82vh] py-4">

                <!-- LA CARD STYLISEE WRAPPED (Optimisation Grid absolue pour html2canvas) -->
                <div id="bilan-card" class="bg-[#0b0f0c] border-2 border-zinc-900 rounded-[32px] p-6 md:p-8 my-auto text-left relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full block font-mono">
                    
                    <!-- Cercles de couleurs de fond stables -->
                    <div class="absolute -right-20 -top-20 w-52 h-52 bg-[#E0FE00]/10 rounded-full blur-[80px] pointer-events-none"></div>
                    <div class="absolute -left-16 -bottom-16 w-44 h-44 bg-emerald-950/20 rounded-full blur-[60px] pointer-events-none"></div>

                    <!-- En-tête Wrapped avec structure de table/bloc rigide -->
                    <div class="relative z-10 w-full border-b border-zinc-900 pb-6 clear-both block h-[100px]">
                        <div class="float-left w-[calc(100%-110px)] text-left">
                            <h2 class="text-3xl font-black tracking-tighter uppercase text-white leading-none m-0 p-0 block">
                                CONVERSATION
                            </h2>
                            <h2 class="text-3xl font-black tracking-tighter uppercase text-[#E0FE00] leading-none m-0 p-0 block mt-1">
                                DÉCORTIQUÉE.
                            </h2>
                            <div class="mt-3 block">
                                <p class="text-[10px] text-white uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 inline-block m-0">
                                    ⇢ ${state.participants.join(' x ')}
                                </p>
                            </div>
                        </div>
                        
                        <!-- Badge Message fixe en float pour éviter les bugs flex -->
                        <div class="float-right bg-[#E0FE00] text-black w-[95px] h-[75px] rounded-2xl shadow-xl flex flex-col items-center justify-center text-center p-2 box-border">
                            <span class="text-xl font-black tracking-tighter leading-none m-0 p-0 block">${totalFormatted}</span>
                            <span class="text-[7px] font-bold tracking-widest uppercase mt-1 m-0 p-0 block">MESSAGES</span>
                        </div>
                    </div>

                    <!-- GRILLE DES VERDICTS (Grille explicite avec hauteurs fixes sans troncature destructive) -->
                    <div class="space-y-4 py-6 relative z-10 w-full block clear-both">
                        
                        <!-- Verdict 1: Bavard -->
                        <div class="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl grid grid-cols-12 items-center min-h-[76px] box-border">
                            <div class="col-span-8 text-left leading-relaxed">
                                <div class="text-[9px] text-zinc-500 tracking-wider uppercase block leading-tight">👑 LE PLUS BAVARD</div>
                                <div class="text-[11px] text-zinc-400 uppercase tracking-wide block leading-relaxed mt-1 pb-1">
                                    Monopolise l'espace
                                </div>
                            </div>
                            <div class="col-span-4 text-right flex justify-end">
                                <span class="bg-white text-black text-xs font-black uppercase px-4 py-2.5 rounded-full tracking-wider shadow-md inline-block text-center w-[110px] box-border">
                                    ${stats.bavard.name}
                                </span>
                            </div>
                        </div>

                        <!-- Verdict 2: Médias -->
                        <div class="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl grid grid-cols-12 items-center min-h-[76px] box-border">
                            <div class="col-span-8 text-left leading-relaxed">
                                <div class="text-[9px] text-zinc-500 tracking-wider uppercase block leading-tight">📸 COMPULSION MÉDIAS</div>
                                <div class="text-[11px] text-zinc-400 uppercase tracking-wide block leading-relaxed mt-1 pb-1">
                                    Mèmes, photos & stickers
                                </div>
                            </div>
                            <div class="col-span-4 text-right flex justify-end">
                                <span class="bg-zinc-800 text-white border border-zinc-700 text-xs font-black uppercase px-4 py-2.5 rounded-full tracking-wider shadow-md inline-block text-center w-[110px] box-border">
                                    ${stats.ghoster.name}
                                </span>
                            </div>
                        </div>

                        <!-- Verdict 3: Vocaux -->
                        <div class="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl grid grid-cols-12 items-center min-h-[76px] box-border">
                            <div class="col-span-8 text-left leading-relaxed">
                                <div class="text-[9px] text-zinc-500 tracking-wider uppercase block leading-tight">🎙️ ACCRO AUX VOCAUX</div>
                                <div class="text-[11px] text-zinc-400 uppercase tracking-wide block leading-relaxed mt-1 pb-1">
                                    Podcasts improvisés
                                </div>
                            </div>
                            <div class="col-span-4 text-right flex justify-end">
                                <span class="bg-zinc-800 text-white border border-zinc-700 text-xs font-black uppercase px-4 py-2.5 rounded-full tracking-wider shadow-md inline-block text-center w-[110px] box-border">
                                    ${stats.rapide.name}
                                </span>
                            </div>
                        </div>

                        <!-- Verdict 4: Simp Meter -->
                        <div class="bg-[#141a14] border border-[#E0FE00]/20 p-4 rounded-2xl grid grid-cols-12 items-center min-h-[76px] box-border">
                            <div class="col-span-8 text-left leading-relaxed">
                                <div class="text-[9px] text-[#E0FE00] tracking-wider uppercase block leading-tight">🥰 LE SENTIMENTAL</div>
                                <div class="text-[11px] text-zinc-400 uppercase tracking-wide block leading-relaxed mt-1 pb-1">
                                    Sensibilité maximale
                                </div>
                            </div>
                            <div class="col-span-4 text-right flex justify-end">
                                <span class="bg-[#E0FE00] text-black text-xs font-black uppercase px-4 py-2.5 rounded-full tracking-wider shadow-md inline-block text-center w-[110px] box-border">
                                    ${stats.simp.name}
                                </span>
                            </div>
                        </div>

                    </div>

                    <!-- Note de bas de carte authentique -->
                    <div class="pt-2 border-t border-zinc-900 relative z-10 block clear-both h-[15px] w-full text-[8px] text-zinc-600 tracking-widest uppercase">
                        <div class="float-left">Par Stalkee</div>
                        <div class="float-right text-[#E0FE00]/40">STK-2026</div>
                    </div>
                </div>

                <!-- ACTIONS ASSOCIEES -->
                <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mx-auto relative z-20">
                    <button id="download-verdict-btn" class="w-full bg-white text-black hover:bg-[#E0FE00] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-2">
                        <span>Télécharger</span> <span>💾</span>
                    </button>

                    <button id="reset-app-btn" class="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                        <span>Recommencer</span> <span>✕</span>
                    </button>
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
        const resetBtn = document.getElementById('reset-app-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => store.reset());
        }

        const downloadBtn = document.getElementById('download-verdict-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const card = document.getElementById('bilan-card');
                if (!card) return;

                const originalText = downloadBtn.innerHTML;
                downloadBtn.innerHTML = "<span>GÉNÉRATION...</span> ⏳";
                downloadBtn.disabled = true;

                // Attente stricte du chargement des polices et configuration robuste
                document.fonts.ready.then(() => {
                    window.html2canvas(card, {
                        backgroundColor: '#0b0f0c',
                        scale: 3, 
                        logging: false,
                        useCORS: true,
                        width: card.clientWidth,
                        height: card.clientHeight
                    }).then(canvas => {
                        const imageURL = canvas.toDataURL('image/png');
                        const downloadLink = document.createElement('a');
                        downloadLink.href = imageURL;
                        downloadLink.download = 'stalkee-wrapped.png';
                        
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);

                        downloadBtn.innerHTML = originalText;
                        downloadBtn.disabled = false;
                    }).catch(err => {
                        console.error("Erreur de rendu :", err);
                        downloadBtn.innerHTML = originalText;
                        downloadBtn.disabled = false;
                    });
                });
            });
        }
    }
}