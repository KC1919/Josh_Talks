const Data = require("../models/Data");

let date = "2021-11-05T08:06:51Z"

const {
    google
} = require("googleapis");  //importing the "googleapis" package

//configuring the service to be used to make the "api calls"
const service = google.youtube({
    version: 'v3',
    auth: process.env.API_KEY //api key
})


//function to fetch latest videos from youtube, using the youtube api
const fetch = async (req,res) => {

    try {
        //making an api-call
        const response = await service.search.list({
            "part": [
                "snippet" //setting the parameteres
            ],
            "region": "IN",
            "q": "cricket",
            "type": "video",
            "publishedAfter": date,
            "order": "date",
            "maxResults": 10
        })
        let videos = response.data.items;

        if (videos.length) {

            //looping through the fetched videos
            videos.map(async (video) => {

                //making an object with current video information
                const videoData = {
                    title: video.snippet.title,
                    description: video.snippet.description,
                    thumbnail: video.snippet.thumbnails.medium.url,
                    publishedAt: video.snippet.publishedAt,
                    videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
                }

                date = videoData.publishedAt;

                try {
                    const result = await Data.create(videoData); //saving the video info into the database

                    if (result) { //if the video info saved successfully
                        console.log("Video Data saved successfully!");
                    } else { //if not then we return an error to the user
                        console.log("Failed to save video data");
                        return res.status(400).json({
                            message: "Failed to save video data"
                        });
                    }
                } catch (error) { //if there is an internal server error, then also we throw it to the user
                    console.log("Failed to save data, internal server error", error);
                    return res.status(500).json({
                        message: "Failed to save data, internal server error",
                        error: error
                    })
                }
            })
        }
    } catch (error) {
        if (error)
            console.log("There was an error using api", error);
        return res.status(500).json({
            message: "There was an error using api",
            error: error
        });
    }
}

module.exports = fetch;