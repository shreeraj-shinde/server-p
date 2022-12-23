const { on } = require('events');

http = require('http');     

port = 8081;

let  list = ["Complete Homework","Complete Dev Course"]

http.createServer((req , res) =>{
   const{method , url} = req
   console.log(method , url);
   if(url === "/todos"){
    if(method === "GET"){
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.write(list.toString());
    }else if(method === "POST"){
        let body = "";
     req.on("error" ,(err) =>{
        console.log(err)
     }).on("data" ,(chunk)=>{
        body = body + chunk;
        console.log(chunk);
     }).on("end" , ()=>{
        body = JSON.parse(body);
        let newList = list;
        newList.push(body.Hi);
        console.log("DAta : ",newList);
     })
    }else if(method === "DELETE"){
      let body = "";
      req.on("error" ,(err) =>{
         console.log(err);
      }).on("data", ( chunk)=>{
         body = body + chunk
      }).on("end" ,()=>{
         body = JSON.parse(body)
         let del = body.Hi;
         let updatedList = [];
         // list.find((element,index)=>{
         //    if (del === element){
         //       list.splice(index , 1);
         //       res.write(list.toString())
         //    }
         // })
         for(let i= 0 ; i < list.length; i++){
            if (list[i] != del){
               updatedList.push(list[i]);
            }
         }
         console.log(updatedList)
         res.write(updatedList.toString());
         list = updatedList;
      })
    }else{
         res.writeHead(404);
    }

   }else{
    res.writeHead(404)
   }
   res.end()
}).listen(port,() =>{
    console.log(`Server Running at port:${port}`);
})