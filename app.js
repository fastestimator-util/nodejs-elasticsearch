const express = require('express');
const esClient = require('./client');
const searchDoc = require('./search');

const app = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 3200;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ encoded: false }));

app.get("/search/:text", async (req, res) => {
    console.log(`Searching for ${req.params.text}`);
    
    const body = {
        query: { 
            "multi_match": {
                "query" : req.params.text,
                "fields": ["title^3", "body"],
                "fuzziness": "auto"
            }
        },
        highlight : {
            "fields" : {
                "body" : {}
            }
        }
    }

    try { 
        const resp = await searchDoc('fe', body);

        res.status(200).send(resp);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`Running at  port ${port}`);
});