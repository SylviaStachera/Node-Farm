const fs = require("fs");
const http = require("http");
const url = require("url");

const pageOverview = fs.readFileSync(`${__dirname}/page/overview.html`, "utf-8");
const pageCard = fs.readFileSync(`${__dirname}/page/overview.html`, "utf-8");
const pageProduct = fs.readFileSync(`${__dirname}/page/overview.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	//Page overview
	if (pathName === "/overview" || pathName === "/") {
		res.writeHead(200, { "Content-type": "text/html" });
		res.end(pageOverview);

		//Page product
	} else if (pathName === "/product") {
		res.end("Hello from product");

		//Api
	} else if (pathName === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);

		//Not found
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
