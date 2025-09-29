    class Reply {
        constructor(message) {
            this.message = message;
        }

        getReply() {
            const joks = [
                "Kenapa programmer selalu bingung saat di supermarket? Karena mereka tidak bisa menemukan 'array' yang mereka cari.",
                "Apa yang dikatakan oleh satu bit kepada bit lainnya? 'Kamu membuatku merasa lengkap.'",
                "Mengapa komputer selalu dingin? Karena mereka bekerja dengan banyak 'byte'.",
                "Kenapa programmer suka bekerja di tempat gelap? Karena mereka tidak suka 'bugs' yang terlihat.",
                "Apa yang dilakukan oleh programmer saat mereka bosan? Mereka 'debug' kehidupan mereka.",
                "Kenapa programmer tidak pernah lapar? Karena mereka selalu makan 'code'.",
            ];

            if (this.message.author.bot) return;

            if (this.message.content.toUpperCase() === 'HALLO' || this.message.content.toUpperCase() === 'HAI') {
                const index = Math.floor(Math.random() * joks.length);
                this.message.reply(this.message.content.toUpperCase() === 'HALLO' ? `Hai ${this.message.author.globalName}, Aku punya jokes nih, mau baca ? ` + joks[index] : this.message.content.toUpperCase() === 'HAI' ? `Hallo ${this.message.author.globalName}, Aku punya jokes nih, mau baca ? ` + joks[index] : joks[index]);
            }
        }
    }

    module.exports = Reply;