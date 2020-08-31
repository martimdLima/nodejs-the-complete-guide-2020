const http = require("http");

const server = http.createServer((request, response) => {
  
    console.log(request);

    // Access the information of the request
    console.log(request.url, request.method, request.headers);

    // Sending Responses
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>Test Page</title><head>');
    response.write('<body><h1>NodeJs Test Content</h1></body>');
    response.write('</html>');
    response.end();

    /*
    process.exit();

    Process.exit basically hard exites the event loop and therefore the program shuts down because there is no more work to do,
    nodejs sees that there is no more work to do and it basically closes the program and gives control back to the terminal. 
    */
});

server.listen(3000);
