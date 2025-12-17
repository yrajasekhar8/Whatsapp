const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {
  try {
    const { name, phone, service, amount } = JSON.parse(event.body);

    const { error } = await supabase.from("bills").insert([
      { customer_name: name, phone, service, amount }
    ]);

    if (error) throw error;

    const message =
      `Hi ${name},\n\n` +
      `Service: ${service}\n` +
      `Bill Amount: ₹${amount}\n\n` +
      `Thank you for shopping with us.\n- Sekhar Store`;

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
