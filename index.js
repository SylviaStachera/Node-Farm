const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === "/overview" || pathName === "/") {
		res.end("Hello from overview");
	} else if (pathName === "/product") {
		res.end("Hello from product");
	} else if (pathName === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
	} else {
		res.writeHead(404);
		res.end("Page no found!");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Listening to request on port 8000");
});

//1. Create a server
//2. Routing - url pathName
//3. API
