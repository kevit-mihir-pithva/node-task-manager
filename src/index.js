const app = require("./app");

// Port number from environment variables
const port = process.env.PORT;

/**
 * Start the Express server.
 * @function
 * @param {number} port - The port number on which the server will listen.
 */
app.listen(port, () => {
  console.log("Server is up on port: " + port);
});