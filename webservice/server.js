//https://www.youtube.com/watch?v=-HPZ1leCV8k&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=3

const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log("request made");
    console.log(req.url);
    console.log(req.method);
    if (req.url+"" == "/" || req.url+"" == "/index.html") {
        res.setHeader('Content-Type', 'text/html');
        getFile("./webapp/index.html",res);
    } else if (req.url+"" == "/client.js") {
        res.setHeader('Content-Type', 'text/javascript');
        getFile("./webapp/client.js",res);
    } else if (req.url+"" == "/favicon.ico") {
        res.setHeader('Content-Type', 'image/png');
        getFile("./webapp/favicon.ico",res);
    } else {
        doSearch(res,searchFromURL(req.url+""));
    }
});

server.listen(3003, 'localhost', () => {
    console.log('listening for request on port 3003');
});

function getFile(file, res) {
    console.log("sending file");
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            console.log("writing for file", file);
            res.write(data);
            res.end();
            console.log("written");
        }
    });
}

function doSearch(res, search) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(search);
    res.end();
}
function searchFromURL(url) {
    return url.substring(url.indexOf("/",2)+1).replace("%20"," ");
}

async function getTMDB(search) {

}