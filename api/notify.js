import { BOT_TOKEN, CHAT_ID } from "./infobot.js";
import { addStat } from "./stats.js";

export default async function handler(req, res){
  if(req.method !== "POST"){
    return res.status(405).end();
  }

  try{
    const { domain, type, link } = req.body;
    if(!type || !link){
      return res.json({ status:false });
    }

    addStat(type);

    const text = `
📥 Downloader Digunakan

🌐 Domain : ${domain}
📱 Platform : ${type}
🔗 Link :
${link}

🕒 ${new Date().toLocaleString("id-ID")}
`;

    const tg = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );

    const r = await tg.json();
    if(!r.ok){
      return res.json({ status:false, telegram:r });
    }

    res.json({ status:true });

  }catch(e){
    res.json({ status:false, error:String(e) });
  }
}
