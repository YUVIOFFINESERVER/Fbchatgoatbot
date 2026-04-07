const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "Yuvi",
		countDown: 5,
		role: 0,
		description: { en: "Shows bot and owner information dashboard" },
		category: "info"
	},

	onStart: async function ({ message, api, event }) {
		try {
			const uptime = process.uptime();
			const hours = Math.floor(uptime / (60 * 60));
			const minutes = Math.floor((uptime % (60 * 60)) / 60);
			const seconds = Math.floor(uptime % 60);

			const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
			
			const infoMessage = `◆ADMIN AND BOT INFORMATION◆\n\n.:BoT NaMe:. (Yuvi-X) ❤️\n.:BoT Prefix:. #\n\nOWNER:- [ ⚔️ YUVI VERMA ⚔️ ]\nContact my owner for any issue.😊\n\nHis Facebook id:-\nhttps://www.facebook.com/yuvi.verma\n\n➟UPTIME☆\nToday Is: [${time}]\nBoT Is Running ${hours}:${minutes}:${seconds}.\n\nThanks For Using (Yuvi-X) ❤️ BoT!`;

			const imageUrl = "https://i.postimg.cc/mD8Nf9Z8/gojo.jpg"; 

			const imgStream = await global.utils.getStreamFromURL(imageUrl).catch(() => null);

			if (imgStream) {
				return message.reply({ body: infoMessage, attachment: imgStream });
			} else {
				return message.reply(infoMessage);
			}
		} catch (err) {
			return message.reply("Error: " + err.message);
		}
	}
};
