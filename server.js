// 👉 API: Link a session (e.g. from WhatsApp device)
app.post("/api/link", (req, res) => {
  const { code} = req.body;
  const session = sessions[code];

  if (!session) {
    return res.status(404).json({ success: false, message: "Session code not found."});
}

  if (session.sessionId) {
    return res.status(409).json({ success: false, message: "Session already linked."});
}

  const sessionId = uuidv4();
  session.sessionId = sessionId;

  const messageBody = `✅ You're officially linked!

Your XD session ID: *${sessionId}*

🔗 Tap into the ecosystem:
> *Telegram*: https://t.me/mrmosesxd
> *YouTube*: https://youtube.com/@marinyamestudios
> _*WhatsApp Channel*_: https://whatsapp.com/channel/0029VaFdPojJkK70RWo2Bf1l

This is _Marinyame Studios_
⚡ Stay sharp. Stay connected. Enjoy the ride.`;

  console.log(`[🔗] Session linked: ${code} → ${sessionId}`);
  console.log(`[📩] Message to ${session.phone}:\n${messageBody}`);

  // 🔔 Add WhatsApp message logic here to notify the user
  // sendWhatsAppMessage(session.phone, messageBody)

  res.json({ success: true, sessionId});
});
