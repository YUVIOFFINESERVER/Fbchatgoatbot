const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    author: "Tokodori",
    role: 0,
    shortDescription: " ",
    longDescription: "",
    category: "admin",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const ownerInfo = {
        name: '𒁍 ⟬ 𓆩YUVi ‣⃟ ⃝𑁍𓆪᭄ 達 ⟭ ꪹ 爾 ᯽⸺›⁐‡𖣴‣ ⸨⸙⸩',
        gender: '𝗠𝗮𝗹𝗲',
        favourite: 'Favourite emoji 🙂👈',
        Fb: 'https://www.facebook.com/profile.php?id=100056840426152',
        Relationship: 'Single',
        bio: '𝗗𝗶𝘀𝗰𝗼𝗻𝗻𝗲𝗰𝘁 𝗺𝗲 𝗳𝗿𝗼𝗺 𝘁𝗵𝗲 𝘄𝗼𝗿𝗹𝗱 𝗼𝗳 𝘁𝗲𝗰𝗵𝗻𝗼𝗹𝗼𝗴𝘆 𝗮𝗻𝗱 𝗶 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗴𝘂𝗶𝗱𝗲. 𝗜 𝘄𝗶𝗹𝗹 𝗵𝗲𝗹𝗽 𝘆𝗼𝘂 𝘁𝗼 𝗹𝗲𝗮𝗿𝗻 𝗮𝗻𝗱 𝗴𝗿𝗼𝘄. 𝗜 𝘄𝗶𝗹𝗹 𝗯𝗲 𝘆𝗼𝘂𝗿 𝗳𝗿𝗶𝗲𝗻𝗱 𝗮𝗻𝗱 𝗴𝘂𝗶𝗱𝗲 𝘆𝗼𝘂 𝘁𝗵𝗿𝗼𝘂𝗴𝗵 𝘁𝗵𝗲 𝗷𝗼𝘂𝗿𝗻𝗲𝘆 𝗼𝗳 𝗰𝗼𝗱𝗶𝗻𝗴'
      };

      // yaha pe direct image link dalna h (not ibb.co page link)
      const imageUrl = 'https://ibb.co/fY4CrHRh';  

      const tmpFolderPath = path.join(__dirname, 'tmp');
      if (!fs.existsSync(tmpFolderPath)) {
        fs.mkdirSync(tmpFolderPath);
      }

      const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imgPath = path.join(tmpFolderPath, 'owner_image.jpg');
      fs.writeFileSync(imgPath, Buffer.from(imgResponse.data, 'binary'));

      const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:

Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Relationship: ${ownerInfo.Relationship}
Favourite: ${ownerInfo.favourite}
Fb: ${ownerInfo.Fb}
Bio: ${ownerInfo.bio}
      `;

      await api.sendMessage({
        body: response,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, event.messageID);

      fs.unlinkSync(imgPath);

      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    } catch (error) {
      console.error('Error in ownerinfo command:', error);
      return api.sendMessage('An error occurred while processing the command.', event.threadID);
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
