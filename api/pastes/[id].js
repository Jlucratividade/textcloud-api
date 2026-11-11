
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Delete-Token"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "DELETE") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const id = req.query.id;
  const token = req.headers["x-delete-token"];

  if (!id || !token) {
    return res.status(400).json({
      error: "ID ou token de exclusão ausente"
    });
  }

  try {
    const response = await fetch(
      `https://pastebin.ai/api/v1/pastes/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          "X-Delete-Token": token
        }
      }
    );

    const data = await response.text();

    return res.status(response.status).send(data);

  } catch (error) {
    return res.status(502).json({
      error: "Falha ao conectar com Pastebin.ai"
    });
  }
}
