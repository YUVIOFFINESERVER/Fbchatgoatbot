module.exports = {
	config: {
		name: "adminmention",
		author: "Yuvi",
		role: 2,
		shortDescription: "Boss Nobita mention guard 💘",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

	onChat: function({ api, event }) {
		const adminUIDs = ["61567276533610", "61567276533610"];
		const taggedUIDs = Object.keys(event.mentions || {});
		
		for (const id of adminUIDs) {
			if (taggedUIDs.includes(id)) {
				const replies = [
					"Oye Mere boss ko baar baar mention karna band kar, woh Shizuka ke saath movie dekh rahe hain 🍿❤️",
					"Areee! Nobita ko mention karna band karo... Shizuka unka haath pakad ke baithi hai 😳💞",
					"Kya kam hai mujhe bolo boss ko mention mt kar",
					"Nobita abhi busy hai... Shizuka ke liye chocolate leke gaya hai 🍫🥰",
					"Mention mat karo Nobita ko, unka dhyaan Shizuka ke zulfon me uljha hua hai 😍",
					"Boss Nobita ke pass abhi time nahi hai, woh Shizuka ki aankhon me kho gaya hai 😌💖",
					"Tum Nobita ko mention kar rahe ho, aur Shizuka unke shoulder pe sir rakh ke muskura rahi hai 😚🌸",
					"⚠️ Warning! Nobita ko mention mat karo... unka pyaar sirf Shizuka ke liye reserved hai 😤💗"
				];
				
				return api.sendMessage({
					body: replies[Math.floor(Math.random() * replies.length)]
				}, event.threadID, event.messageID);
			}
		}
	},

	onStart: async function({}) {}
};
