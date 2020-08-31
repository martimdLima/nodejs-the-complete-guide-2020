const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request);

    /*   
    Process.exit basically hard exites the event loop and therefore the program shuts down because there is no more work to do,
    nodejs sees that there is no more work to do and it basically closes the program and gives control back to the terminal. 
    */
   
  //process.exit();
});

server.listen(3000);
