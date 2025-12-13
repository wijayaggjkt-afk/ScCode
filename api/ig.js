export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "URL tidak boleh kosong"
    });
  }

  try {
    const response = await fetch(
      `https://lulli.vercel.app/api/snapsave?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Gagal fetch Instagram"
    });
  }
}
