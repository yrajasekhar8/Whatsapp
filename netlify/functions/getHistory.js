const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event) => {

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const phone = event.queryStringParameters.phone;

  if (!phone) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Phone number required" })
    };
  }

  const { data, error } = await supabase
    .from("bills")
    .select("*")
    .eq("phone", phone)
    .order("created_at", { ascending: false });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
