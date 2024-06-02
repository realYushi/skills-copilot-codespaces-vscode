//Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

// Create an HTTP server
http.createServer( function(req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Hello, World.\n');
            res.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.write('Not found');
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data, 'utf8');
                    res.end();
                }
            });
            break;
        case '/comments.json':
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function(data) {
                    body += data;
                });
                req.on('end', function() {
                    var POST = qs.parse(body);
                    comments.push(POST);
                    fs.writeFile(__dirname + path, JSON.stringify(comments), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.writeHead(200, {'Content-Type': 'text/plain'});
                            res.write('Thanks for the comment\n');
                            res.end();
                        }
                    });
                });
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(comments));
                res.end();
            }
            break;
        default:
            res.writeHead(404);
            res.write('Not found');
            res.end();
            break;
    }
}).listen(3000);
console.log('Server is running at http://localhost:3000/');

// Path: comments.json
//Create an empty array
[]

// Path: index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form id="comment-form">
        <input type="text" id="name" placeholder="Name" />
        <input type="text" id="comment" placeholder="Comment" />
        <button type="submit">Submit</button>
    </form>