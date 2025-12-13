import { addStat } from "./stats.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { domain, type, link } = req.body;
    if (!type || !link) {
      return res.json({ status: false });
    }

    addStat(type);

    const text =
`📥 Downloader Digunakan

🌐 Domain : ${domain}
📱 Platform : ${type}
🔗 Link :
${link}

🕒 ${new Date().toLocaleString("id-ID")}`;

    const tg = await fetch(
      `https://api.telegram.org/bot8513113980:AAHDEHF8L5_3bOEgoC8sODxMEZlb529ayXA/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: 7202245315,
          text
        })
      }
    );

    const r = await tg.json();
    if (!r.ok) return res.json({ status: false, error: r });

    res.json({ status: true });
  } catch (e) {
    res.json({ status: false, error: String(e) });
  }
}
