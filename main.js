const { ClickHouse } = require("clickhouse");

const hostname = "clickhouse-headless.data";
const database = "default";
const username = "default";
const password = "base64ExampleString";

const main = async () => {
  const ck = new ClickHouse({
    url: hostname,
    port: 8123,
    format: "json",
    raw: false,
    config: { database },
    basicAuth: { username, password },
    queryOptions: { maxRetries: 10, retryOnNetworkError: true },
  });

  const sql_log = `
    SELECT * FROM log_trigger_info '
    ORDER BY timestamp DESC LIMIT 0, 5
  `;
  const logs = await ck.query(sql_log).toPromise();
  console.log("logs:\n", logs);
};

main();
