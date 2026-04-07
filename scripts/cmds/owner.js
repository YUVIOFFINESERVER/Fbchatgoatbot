const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
	config: {
		name: "owner",
		version: "2.5",
		author: "Yuvi",
		countDown: 5,
		role: 0,
		description: { en: "Shows owner info with video on #Owner" },
		category: "admin"
	},

	onStart: async function ({ api, event, message }) {
		return this.onEvent({ api, event, message });
	},

	onEvent: async function ({ api, event, message }) {
		// Ye check karega ki message exact #Owner hai ya nahi
		if (event.body && event.body.toLowerCase() === "#owner") {
			
			const ownerInfo = {
				name: '𒁍 ⟬ 𓆩Yuvi ‣⃟ ⃝𑁍𓆪᭄ 達 ⟭ ꪹ 爾 ᯽⸺›⁐‡𖣴‣ ⸨⸙⸩',
				gender: '𝗠𝗮𝗹𝗲',
				relationship: 'Single',
				fb: 'https://facebook.com/swordigo.swordslush',
				bio: '𝗗𝗶𝘀𝗰𝗼𝗻𝗻𝗲𝗰𝘁 𝗺𝗲 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝘄𝗼𝗿𝗹𝗱 𝗼𝗳 𝘁𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆 𝗮𝗻𝗱 𝗶 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗴𝘂𝗶𝗱𝗲.'
			};

			const infoText = `◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n\n` +
				`Name: ${ownerInfo.name}\n` +
				`Gender: ${ownerInfo.gender}\n` +
				`Relationship: ${ownerInfo.relationship}\n` +
				`Fb: ${ownerInfo.fb}\n` +
				`Bio: ${ownerInfo.bio}\n\n` +
				`Thanks For Using Yuvi-X BoT! ❤️`;

			// Jo video link tumne abhi catbox wali di thi
			const videoUrl = "https://files.catbox.moe/vhpdvq.mp4"; 
			const cacheDir = path.join(__dirname, "cache");
			const tempPath = path.join(cacheDir, `owner_vid_${event.senderID}.mp4`);

			try {
				if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

				const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
				await fs.writeFile(tempPath, Buffer.from(response.data, "utf-8"));

				api.setMessageReaction('🚀', event.messageID, (err) => {}, true);

				return message.reply({
					body: infoText,
					attachment: fs.createReadStream(tempPath)
				}, () => {
					if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
				});

			} catch (e) {
				console.log(e);
				return message.reply(infoText);
			}
		}
	}
};
