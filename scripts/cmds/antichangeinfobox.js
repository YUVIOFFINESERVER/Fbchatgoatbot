const { getStreamFromURL, uploadImgbb } = global.utils;

module.exports = {
	config: {
		name: "antichangeinfobox",
		version: "5.0",
		author: "Yuvi",
		countDown: 5,
		role: 2, // Sirf Bot Admin (Yuvi) ise ON/OFF kar sakta hai
		category: "system"
	},

	onStart: async function ({ message, event, args, threadsData }) {
		if (!["on", "off"].includes(args[1])) return message.reply("Sahi tarika: #antichangeinfobox [name/nickname/avt] [on/off]");
		const { threadID } = event;
		const data = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
		
		if (args[1] === "off") {
			delete data[args[0]];
			message.reply(`✅ Anti-${args[0]} OFF ho gaya.`);
		} else {
			const threadInfo = await threadsData.get(threadID);
			if (args[0] === "name") data.name = threadInfo.threadName;
			else if (args[0] === "nickname") data.nickname = threadInfo.members.reduce((a, b) => ({ ...a, [b.userID]: b.nickname }), {});
			else if (args[0] === "avt") data.avatar = threadInfo.imageSrc;
			
			message.reply(`🔥 Anti-${args[0]} ON! Ab mere Baap (Yuvi) ke alawa koi kuch change nahi kar payega, chahe wo Group Admin hi kyun na ho!`);
		}
		await threadsData.set(threadID, data, "data.antiChangeInfoBox");
	},

	onEvent: async function ({ message, event, threadsData, api }) {
		const { threadID, logMessageType, logMessageData, author } = event;
		const data = await threadsData.get(threadID, "data.antiChangeInfoBox", {});
		if (!data) return;

		// AGAR BOT KHUD CHANGE KAR RAHA HAI TOH REACTION MAT KARO (LOOP ROKNE KE LIYE)
		if (author === api.getCurrentUserID()) return;

		// ⚡ STRICT LOGIC:
		// Agar badalne wala banda BOT ADMIN (Yuvi) NAHI hai, toh bot use turant reset karega.
		// Isme Group Admin bhi shamil hain, unki bhi nahi chalegi!
		const adminIDs = global.config.ADMINBOT || []; 
		if (!adminIDs.includes(author)) { 
			if (logMessageType === "log:user-nickname" && data.nickname) {
				api.changeNickname(data.nickname[logMessageData.participant_id] || "", threadID, logMessageData.participant_id);
			}
			if (logMessageType === "log:thread-name" && data.name) {
				api.setTitle(data.name, threadID);
			}
			if (logMessageType === "log:thread-image" && data.avatar) {
				api.changeGroupImage(await getStreamFromURL(data.avatar), threadID);
			}
		} else {
			// Agar TUNE (Bot Admin) change kiya hai, toh naya state save kar lo
			if (logMessageType === "log:thread-name") data.name = logMessageData.name;
			if (logMessageType === "log:user-nickname") data.nickname[logMessageData.participant_id] = logMessageData.nickname;
			await threadsData.set(threadID, data, "data.antiChangeInfoBox");
		}
	}
};
