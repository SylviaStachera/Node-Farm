const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (template, product) => {
	let output = template.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);

	if (!product.organic) {
		output = output.replace("{%NOT_ORGANIC%}", "not-organic");
	}

	return output;
};

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

//1. Create a server
//2. Routing - url pathName
//3. API
