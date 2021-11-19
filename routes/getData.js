const express = require("express");
const Data = require("../models/Data");

const router = express.Router();

let skip = 0,
    limit = 15;

router.get("/", async (req, res) => {

    const count = await Data.count();

    try {
        //fetching the documents with a limit of 15 documents per page
        const result = await Data.find({}, {
            _id: 0
        }).sort({
            publishedAt: -1
        }).skip(skip).limit(limit); //applied pagination

        //if documents found in the databse
        if (result && skip <= count) {
            skip += limit;
            return res.status(200).json({ //return the fethed docments
                message: "Documents fetched",
                result: result
            });
        } else {
            return res.status(200).json({
                message: "Nothing found!",
                result: []
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

router.post("/getData", async (req, res) => {
    try {
        let term = req.body.term; //extracting the user search term

        //using the regex matching to search for all the documents in the database and fetch them
        const result = await Data.find({
            $or: [{
                title: new RegExp(term, 'i') //matching term in title
            }, {
                description: new RegExp(term, 'i') //matching term in description
            }]
        });

        //if document found
        if (result) {
            return res.status(200).json({ //return the results to the client
                message: "Documents Fetched",
                result: result
            });
        } else {
            console.log("No result found");
            return res.status(200).json({
                message: "Nothing found!",
                result: []
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            eror: error
        });
    }
})

module.exports = router;