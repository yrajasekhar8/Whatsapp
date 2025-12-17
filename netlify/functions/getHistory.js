const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const phone = event.queryStringParameters.phone;

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

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
    