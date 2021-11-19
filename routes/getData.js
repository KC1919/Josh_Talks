const express=require("express");
const Data=require("../models/Data");

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
            return res.status(200).json({message:"Documents fetched", result:result});
        }
        else{
            return res.status(200).json({message:"Nothing found!", result:[]});
        }
    } catch (error) {
        return console.log(error);
    }
})
                                                 
router.post("/getData",async(req,res)=>{
    try {
        let term=req.body.term; //extracting the user search term
        console.log(term);
        //using the regex matching to search for all the documents in the database and fetch them
        const result=await Data.find( {$or:[{ title:new RegExp(term,'i')},{ description:new RegExp(term,'i')}]} );

        if(result){
            return res.status(200).json({message:"Documents Fetched", result:result});
        }else{
            console.log("No result found");
            return res.status(200).json({message:"Nothing found!", result:[]});
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;