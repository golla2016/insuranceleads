export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, phone, message } = req.body; // Get form data

  const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your bot token
  const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID"; // Replace with your chat ID

  const text = `📩 New Form Submission:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${message}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    return res
      .status(200)
      .json({ success: true, message: "Sent to Telegram!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send message" });
  }
}
