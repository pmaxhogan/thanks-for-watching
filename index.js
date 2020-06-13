const express = require('express');
const app = express();

const makeVideo = require("./makevideo.js");

const cacheMap = Object.create(null);

// noinspection JSUnresolvedFunction
app.get("/video", async (req, res) => {
    if(!req.query.text || typeof req.query.text !== "string" || !req.query.text.length || req.query.text.length > 300){
        return res.status(400).send("Invalid or missing text parameter");
    }

    const text = req.query.text;
    if(text in cacheMap){
        console.log("found in cache: " + text);
        return res.status(200).sendFile(cacheMap[text]);
    }

    const path = await makeVideo(text);
    res.status(200).sendFile(path);
    console.log(path + ": " + text);
    cacheMap[text] = path;
});


app.listen(process.env.PORT || 5000);
