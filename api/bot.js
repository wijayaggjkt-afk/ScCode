import { BOT_TOKEN } from "./infobot.js";
import { getStats } from "./stats.js";

export default async function handler(req, res){
  if(req.method !== "POST"){
    return res.status(405).end();
  }

  const update = req.body;
  const msg =
    update.message ||
    update.edited_message ||
    update.channel_post;

  if(!msg?.text){
    return res.json({ ok:true });
  }

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if(text === "/stats"){
    const s = getStats();

    const reply = `
📊 STATISTIK DOWNLOADER

📥 Total : ${s.total}
📸 Instagram : ${s.ig}
🎵 TikTok : ${s.tt}
`;

    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          chat_id: chatId,
          text: reply
        })
      }
    );
  }

  res.json({ ok:true });
}
