import database from "../../../../infra/database.js";

async function status(req, res) {
  const result = await database.query("Select 1 + 1;");
  console.log(result);
  return res.status(200).json({ chave: "valor" });
}

export default status;
