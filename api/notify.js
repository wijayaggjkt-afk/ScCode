import { addStat } from "./stats.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { domain, type, link } = req.body;

  // tambah statistik
  addStat(type);

  const text = `
📥 Downloader Digunakan

🌐 Domain : ${domain}
📱 Platform : ${type}
🔗 Link :
${link}

🕒 ${new Date().toLocaleString("id-ID")}
`;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text
    })
  });

  res.json({ status: true });
}
