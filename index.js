const fs=require("fs");
const http=require('http');
const url=require('url');
const replaceTemplate=require("./modules/replaceTemplate");

//Read Files
const cardTemplate=fs.readFileSync(`${__dirname}/templates/card-template.html`,'utf-8');
const overviewTemplate=fs.readFileSync(`${__dirname}/templates/overview-template.html`,'utf-8');
const productTemplate=fs.readFileSync(`${__dirname}/templates/product-template.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

//Server
const server=http.createServer((req,res)=>{
    const {pathname,query}=url.parse(req.url,true);
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'
        })
        const cards=dataObj.map((el)=>replaceTemplate(cardTemplate,el)).join('');
        const output=overviewTemplate.replace('{%PRODUCT_CARDS%}',cards);
        res.end(output);


    }else if(pathname==='/product'){
        res.writeHead(200,{
            'Content-type':'text/html'
        });
        const product=dataObj[query.id];
        const output=replaceTemplate(productTemplate,product);

        res.end(output);

    }else{
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end("<h1>path does not exist</h1>");
    }
});

server.listen(3000,()=>{
    console.log("server listening on port 3000");
})
