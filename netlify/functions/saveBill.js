const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Use POST method" })
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" })
    };
  }

  try {
    const { name, phone, service, amount } = JSON.parse(event.body);

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { error } = await supabase.from("bills").insert([
      { customer_name: name, phone, service, amount }
    ]);

    if (error) throw error;

  const message =
    `🙏 Hi ${name},\n\n` +
    `🧾 *Service*: ${service}\n` +
    `💰 *Bill Amount*: ₹${amount}\n\n` +
    `Thank you for choosing *Sekhar Store* 🏪\n` +
    `We truly appreciate your support 😊\n\n` +
    `⭐ Please share your Google review:\n` +
    `${googleReviewLink}\n\n` +
    `Have a great day! 🌸`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        whatsapp: `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
