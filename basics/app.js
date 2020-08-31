const http = require("http");

const server = http.createServer((request, response) => {
  
    console.log(request);

    console.log(request.url, request.method, request.headers);

    /*
    process.exit();

    Process.exit basically hard exites the event loop and therefore the program shuts down because there is no more work to do,
    nodejs sees that there is no more work to do and it basically closes the program and gives control back to the terminal. 
    */

});

server.listen(3000);
