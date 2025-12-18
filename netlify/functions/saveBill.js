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
const googleReviewLink = "https://g.page/r/XXXXXXX/review";

// Emoji-safe Unicode characters
const PRAY = "\u{1F64F}";
const RECEIPT = "\u{1F9FE}";
const MONEY = "\u{1F4B0}";
const STORE = "\u{1F3EA}";
const SMILE = "\u{1F60A}";
const STAR = "\u{2B50}";
const FLOWER = "\u{1F338}";

const message =
  `${PRAY} Hi ${name},\n\n` +
  `${RECEIPT} *Service*: ${service}\n` +
  `${MONEY} *Bill Amount*: ₹${amount}\n\n` +
  `Thank you for choosing *Sekhar Store* ${STORE}\n` +
  `We truly appreciate your support ${SMILE}\n\n` +
  `${STAR} Please share your Google review:\n` +
  `${googleReviewLink}\n\n` +
  `Have a great day! ${FLOWER}`;



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
