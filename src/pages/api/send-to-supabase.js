export default async function handler(req, res) {
  //   res.status(200).json(req.body);

  const response = await fetch("https://sehdatpndanlumnavgbc.supabase.co/rest/v1/foofest_festival", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: process.env.SUPABASE_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify(req.body),
  }).then((res) => res.json());
  // console.log(response);
  // res.redirect(307, "/");
  return res.status(200).json({ response });
}
