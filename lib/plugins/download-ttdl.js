module.exports = {
   cmdName: () => ({
    name: ['ttvid'],
    alias: ['ttdl', 'ttvid'],
    react: '🔗',
    category: 'download',
    need: 'url',
    desc: 'Download videos from tiktok using URL'
  }),
  getCommand: async (args, pika, anyaV2) => {
    const { getBuffer } = require('../lib');
    if (!args[0]) return pika.reply('_TikTok video Url needed 🔗_');
    if (!args[0].match(/tiktok.com/gi)) return pika.reply('_Invalid TikTok video Url!_');
    const { key } = await anyaV2.sendMessage(pika.chat, { text: '```Downloading...```' }, { quoted:pika });
    const axios = require('axios');
    axios.get(`https://lovetik.com/api/ajax/search=${args[0]}`)
    .then(async (response) => anyaV2.sendMessage(pika.chat, { video: await getBuffer(response.data.data.play_url) }, { quoted:pika })
    .then(() => pika.edit('✅ Downloaded', key)))
    .catch((error) => {
      console.error(error);
      pika.edit('Error, while downloading the video.', key);
    });
  }
}
