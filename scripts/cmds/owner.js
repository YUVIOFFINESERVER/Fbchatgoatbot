const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
    config: {
        name: "owner",
        version: "2.6",
        author: "Yuvi",
        countDown: 5,
        role: 0,
        description: { en: "Shows owner info with video on #Owner" },
        category: "admin"
    },

    onStart: async function ({ api, event, message }) {
        // Direct event handle karne ke liye
        return this.onEvent({ api, event, message });
    },

    onEvent: async function ({ api, event, message }) {
        if (event.body && event.body.toLowerCase() === "#owner") {
            
            const infoText = `◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n\n` +
                `Name: 𒁍 ⟬ 𓆩Yuvi ‣⃟ ⃝𑁍𓆪᭄ 達 ⟭ ꪹ 爾 ᯽⸺›⁐‡𖣴‣ ⸨⸙⸩\n` +
                `Gender: 𝗠𝗮𝗹𝗲\n` +
                `Relationship: Single\n` +
                `Fb: https://facebook.com/swordigo.swordslush\n` +
                `Bio: 𝗗𝗶𝘀𝗰𝗼𝗻𝗻𝗲𝗰𝘁 𝗺𝗲 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝘄𝗼𝗿𝗹𝗱 𝗼𝗳 𝘁𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆 𝗮𝗻𝗱 𝗶 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗴𝘂𝗶𝗱𝗲.\n\n` +
                `Thanks For Using Yuvi-X BoT! ❤️`;

            const videoUrl = "https://files.catbox.moe/vhpdvq.mp4"; 
            const cacheDir = path.join(__dirname, "cache");
            const tempPath = path.join(cacheDir, `owner_video_${event.senderID}.mp4`);

            try {
                // Folder check aur create karna
                if (!fs.existsSync(cacheDir)) fs.ensureDirSync(cacheDir);

                // Video download (Binary format mein)
                const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
                await fs.writeFile(tempPath, Buffer.from(response.data)); // 'utf-8' hata diya

                // Reaction dena
                api.setMessageReaction('🚀', event.messageID, () => {}, true);

                // Message bhejni hai
                return api.sendMessage({
                    body: infoText,
                    attachment: fs.createReadStream(tempPath)
                }, event.threadID, () => {
                    // File delete karna bhejte hi
                    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                }, event.messageID);

            } catch (e) {
                console.error(e);
                return api.sendMessage(infoText, event.threadID, event.messageID);
            }
        }
    }
};
