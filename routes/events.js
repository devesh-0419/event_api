const express=require('express');
const router=express();
const client= require('../index');

//routes

//creating new event
router.get('/events',async (req,res)=>{
    try {
      // let id = req.query
     // console.log('req.query', id)
     if(req.query.id){
     //   let projection={};
        let data = await client.client.db("DT").collection("event")
                                               .find({"_id":parseInt(req.query.id)})
                                               //.project(projection)
                                               .toArray();
        return res.send(data);
     }
    else{

        let recency = req.query.type
        if(recency==="latest"){recency =1;}
        else{recency=-1}
        let page = parseInt(req.query.page)||0;
        let eventPerPage = parseInt(req.query.limit)||3
        let data = await client.client.db("DT").collection("event")
                                               .find()
                                               .skip(page*eventPerPage)
                                               .limit(eventPerPage)
                                               .sort({schedule:recency})
                                               .toArray();
        return res.send(data);
       }
      
       
       
       // console.log('data', data);
       
       
    } catch (e) {
       console.error(e);
    }

});




router.post('/events',async (req,res)=>{
    try {
        let map=req.body
        let id = req.body.uid;
        map["schedule"]=new Date(map["schedule"]);
        delete map["uid"];
        map["_id"]=id;

     let data= await client.client.db("DT").collection("event").findOne({"_id":id});
     
if(data){
    
   return res.status(403).send("event exist please check details");
}
else{

   // console.log('map', map)
    data = await client.client.db("DT").collection("event").insertOne(map);
     
    return res.status(200).json({"_id" :data.insertedId});
}
    
   } catch (e) {
    console.error(e);
   }
});



router.put('/events/:id',async(req,res)=>{
    try {
       
     const updatedItem={
            $set:req.body,
        };
        let data = await client.client.db("DT").collection("event").updateOne({"_id":parseInt(req.params.id)},updatedItem);
        res.json({modified:data.modifiedCount});
    } catch (e) {
        console.error(e)
    }


});



router.delete('/events/:id',async(req,res)=>{
     let id = parseInt(req.params.id)
    let data = await client.client.db("DT").collection("event").deleteOne({"_id":id});

    if(data.deletedCount){
        return res.send("Event has been deleted..")
    }
    else{
        return res.send("Event already deleted or not present..")
    }

});

module.exports=router;