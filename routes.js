const http = require("http");
const fs = require("fs");
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write(`<html>
        <head> <title> Enter message</title> </head>
        <body>
            <form action="/message" method="POST">
                <input type="text" name="message">
                <input type="submit">
            </form>
        </body>
        </html>`);
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunkData)=>{
            body.push(chunkData);
        });
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            var message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=>{
                if(!err){
                    
                }
                else{
                    console.log("writeFile error", err);
                }
            });
        });
        res.statusCode = 302;
        res.setHeader("Location","/");
        return res.end();
    }
    res.setHeader("Content-type", "text/html");
    res.write(`<html>
    <head> <title> First node Application</title> </head>
    <body><h1> Hello NODE js server</h1></body>
    </html>`);
    res.end();
};

module.exports = {
    handler: requestHandler,
    someText:'Some hardcode text here'
};

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text here';
// exports.handler = requestHandler;
// exports.someText = 'Some hardcoded string';



