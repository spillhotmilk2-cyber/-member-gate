export default async function handler(req, res) {
  const email = String(req.query.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ ok: false });
  try {
    const r = await fetch(`${process.env.GAS_URL}?email=${encodeURIComponent(email)}`);
    const data = await r.json();
    if (data.ok) return res.json({ ok: true, url: process.env.NOTION_URL });
    return res.json({ ok: false });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
}