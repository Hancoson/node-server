/**
 * Created by Guoxing.han on 2016-4-27.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function (req, res) {
    var _parse = url.parse(req.url);
    var _pathname = _parse.pathname;

    if (/\.js$/.test(_pathname)) {//静态资源
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        var _file = fs.readFileSync(path.join(__dirname, _pathname));
        res.write(_file, "binary");
    }
    else if (/\.css$/.test(_pathname)) {//静态资源
        res.writeHead(200, { 'Content-Type': 'text/css' });
        var _file = fs.readFileSync(path.join(__dirname, _pathname));
        res.write(_file, "binary");
    }
    else {//页面
        var _fileName = _pathname == "/login" ? "login" : "index";
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        var _file = fs.readFileSync(__dirname + "/pages/" + _fileName + ".html", 'utf-8');
        res.write(_file);

    }
    res.end();
});

server.listen(9001);
console.log('Server running at http://localhost:9001/');
