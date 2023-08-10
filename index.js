const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const { replaceTemplate } = require("./modules/replaceTemplate");

const tempOverview = fs.readFileSync(`${__dirname}/page/overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/page/product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/page/card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { pathname, query } = url.parse(req.url, true);

	//Page overview
	if (pathname === "/overview" || pathname === "/") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
		const output = tempOverview.replace("{%PRODUCTCARD%}", cardsHtml);
		res.end(output);

		//Page product
	} else if (pathname === "/product") {
		res.writeHead(200, { "Content-type": "text/html" });
		const product = dataObj[query.id];
		const output = replaceTemplate(tempProduct, product);
		res.end(output);

		//Api
	} else if (pathname === "/api") {
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
