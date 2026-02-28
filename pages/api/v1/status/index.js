import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();
  const dataBaseName = process.env.POSTGRES_DB;
  const PgConfigs = await database.query({
    text: "SELECT current_setting('server_version') as version, current_setting('max_connections') as max_conn, numbackends as actives_conn FROM pg_stat_database WHERE datname = $1",
    values: [dataBaseName],
  });
  return res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: parseInt(PgConfigs.rows[0].version),
        max_connections: parseInt(PgConfigs.rows[0].max_conn),
        num_connections: parseInt(PgConfigs.rows[0].actives_conn),
      },
    },
  });
}

export default status;
