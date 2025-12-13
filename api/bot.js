import { getStats } from "./stats.js";

export default async function handler(req, res) {
  const msg = req.body?.message;
  if (!msg) return res.end();

  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/stats") {
    const s = getStats();

    const reply =
`📊 STATISTIK DOWNLOADER

📥 Total : ${s.total}
📸 Instagram : ${s.ig}
🎵 TikTok : ${s.tt}`;

    await fetch(
      `https://api.telegram.org/bot8513113980:AAHDEHF8L5_3bOEgoC8sODxMEZlb529ayXA/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 7202245315,
          text: reply
        })
      }
    );
  }

  res.json({ ok: true });
}
