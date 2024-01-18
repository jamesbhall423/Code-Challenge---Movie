//https://www.youtube.com/watch?v=-HPZ1leCV8k&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=3


const API_KEY = "YOUR API KEY";
const READ_ACCESS_TOKEN = "YOUR READ ACCESS TOKEN";

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
        doSearch(res,req.url.searchParams["search"]);
    }
});

server.listen(3004, 'localhost', () => {
    console.log('listening for request');
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
    const fetch = require('node-fetch');

    const url = 'https://api.themoviedb.org/3/search/movie?query='+search+'&include_adult=false&language=en-US&page=1';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWM1NGY3MTM3YjY4YmFiOWU5YWU4Njc0NGMxYTM5ZCIsInN1YiI6IjY1YTg4Mjg2MGU1YWJhMDEzMjdkYmJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.75bayZeqxceeaDBLNxCAd_dVAvNrQLtY8B5NnxBck2U'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}