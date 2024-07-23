const { test, expect } = require("@playwright/test");
const fs = require("fs");

// Load data from data.json
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

test.describe("GoRest API Tests", () => {
  let userId;

  test("Create a new user", async ({ request }) => {
    const newUserEmail = `john.doe.${Date.now()}@example.com`; // Ensure a unique email each time
    const response = await request.post(
      "https://gorest.co.in/public/v2/users",
      {
        headers: {
          Authorization: data.authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          name: data.newUser.name,
          gender: data.newUser.gender,
          email: newUserEmail,
          status: data.newUser.status,
        },
      }
    );

    // Log the response status and text
    console.log(
      `Create User Response: ${response.status()} ${await response.text()}`
    );
    expect(response.ok()).toBeTruthy();

    // Parse and log the response body
    const responseBody = await response.json();
    console.log(`Response Body: ${JSON.stringify(responseBody)}`);

    // Store the user ID for future tests
    userId = responseBody.id;
    expect(userId).toBeTruthy();
  });

  test("Update user details", async ({ request }) => {
    const updatedUserEmail = `john.doe.updated.${Date.now()}@example.com`;
    const response = await request.patch(
      `https://gorest.co.in/public/v2/users/${userId}`,
      {
        headers: {
          Authorization: data.authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          name: data.updatedUser.name,
          email: updatedUserEmail,
          status: data.updatedUser.status,
        },
      }
    );

    // Log the response status and text
    console.log(
      `Update User Response: ${response.status()} ${await response.text()}`
    );
    expect(response.ok()).toBeTruthy();

    // Parse and log the response body
    const responseBody = await response.json();
    console.log(`Response Body: ${JSON.stringify(responseBody)}`);
  });

  test("Delete user", async ({ request }) => {
    const response = await request.delete(
      `https://gorest.co.in/public/v2/users/${userId}`,
      {
        headers: {
          Authorization: data.authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    // Log the response status and text
    console.log(
      `Delete User Response: ${response.status()} ${await response.text()}`
    );
    expect(response.ok()).toBeTruthy();
  });
});
