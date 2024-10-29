const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const server = http.createServer((req, res) => {

    // step 1 what we want to server on the server.

    // yeh path .join ,meh jaha humne first param __dirname
    // diya hai toh woh current directory project ki store kr keh rukhta
    // hai usme meh merge krta jata hai as per the code.
    // jaise humne isko bataya hai kii
    // req.url==="/" hoo to aapki current project ki directory me
    // index.html ko merge kr dena yaa fir as per requested url server krna.

    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
    const extName = path.extname(filePath).toLowerCase().toString();

    // server ko ek map keh jariye hum
    // bata denge ki file ka type kya hai
    const mimeTypes = {
        '.html': 'text/html',
        '.css': "text/css",
        '.js': "text/javascript",
        '.png': "image/png",
    };
    const contentServe = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { 'Content-Type': "text/html" });
                res.end('404 File not found...');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }

        }
        else {
            res.writeHead(200, { 'Content-type': contentServe });
            res.end(content, "utf-8");

        }
    })

})

server.listen(port, () => {
    console.log(`server is up and running on the port ${port}`);
})
