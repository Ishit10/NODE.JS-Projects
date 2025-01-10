const http = require('http');
const port = 2212;

const fs = require("fs");

http.createServer((req, res) => {
    let filename = ""

    switch (req.url) {
        case "/":filename = "home.html";
            break;

            case "/about":filename = "about.html";
            break;
            case "/contact":filename = "contact.html";
            break;
            case "/service":filename = "service.html";
            break;
    
        default:
            break;
    }

    fs.readFile(filename, (err, data)=>{
        if (!err){
            res.end(data);
        }
    })
})

.listen(port, (error)=>{
    if(error){
        console.log(error);
        return;
        
    }
    console.log(`server is runnig on this port ${port}`);
    
})