test("Get to api/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const responseUpdateAt = responseBody.update_at;

  expect(responseUpdateAt).toBeDefined();

  const parsedUpdateAt = new Date(responseUpdateAt).toISOString();
  expect(responseUpdateAt).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.version).toEqual(16);

  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.num_connections).toBeGreaterThan(0);

  console.log(responseBody);
});
