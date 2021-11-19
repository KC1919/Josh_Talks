const express=require("express");
const { count } = require("../models/Data");
const Data=require("../models/Data");
const mongoose=require("mongoose");

const router=express.Router();

let skip=0, limit=15;

router.get("/",async (req,res)=>{

    const count=await Data.count();
    // console.log(n);
    try {
        const result= await Data.find({},{_id:0}).sort({
            publishedAt: -1
        }).skip(skip).limit(limit); //applied pagination

        if(result && skip<=count){
            skip+=limit;
            res.render("search",{"videos":result});
        }
        else{
            res.render("search",{"videos":[]});
        }
    } catch (error) {
        return console.log(error);
    }
})
                                                 
router.post("/getData",async(req,res)=>{
    try {
        const term=req.body.term;
        console.log(term);
        const result=await Data.find( {$or:[{ title: { $regex: /${term}/,$options: 'i' }},{ description: { $regex: /${term}/,$options: 'i' } }]} );

        if(result){
            res.render("search",{"videos":result});
        }else{
            console.log("No result found");
            res.render("search",{"videos":[]});
            // return res.json("No results found!");
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;