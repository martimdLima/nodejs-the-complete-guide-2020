const fs = require("fs");

const requestHandler = (request, response) => {
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
      // blocking vs non-blocking code
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
};

//module.exports = requestHandler;

/* 
module.exports = {
    handler: requestHandler,
    textInfo: 'Text Information'
} 
*/

exports.handler = requestHandler;
exports.textInfo = "Text Information";
