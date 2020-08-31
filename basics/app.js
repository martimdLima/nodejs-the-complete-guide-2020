const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Enter Message</title><head>");
    response.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    response.write("</html>");
    return response.end();
  }

  // Sending Responses
  if (url === "/message" && method === "POST") {
    const body = [];

    // parsing request bodies
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        // routing requests
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }

  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>Test Page</title><head>");
  response.write("<body><h1>NodeJs Test Content</h1></body>");
  response.write("</html>");
  response.end();
  /*
      process.exit();

      Process.exit basically hard exites the event loop and therefore the program shuts down because there is no more work to do,
      nodejs sees that there is no more work to do and it basically closes the program and gives control back to the terminal. 
      */
});

server.listen(3000);
