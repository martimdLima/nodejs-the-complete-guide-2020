const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  // default path
  if (url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Greetings User</title><head>");
    response.write(
      '<body><h1>Greetings User</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add User</button></form></body>'
    );
    response.write("</html>");
    return response.end();
  }

  // users path
  if (url === "/users") {
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>Assignment 1</title></head>");
    response.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body>"
    );
    response.write("</html>");
    return response.end();
  }

  //
  if (url === "/create-user") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]);
    });
    response.statusCode = 302;
    response.setHeader("Location", "/users");
    response.end();
  }
};

exports.handler = requestHandler;
