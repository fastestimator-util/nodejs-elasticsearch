const express = require('express');
var cors = require('cors');
var fs = require('fs');
var https = require('https');

const searchDoc = require('./search');

const app = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 3200;

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ encoded: false }));

app.get("/search/:version/:text", async (req, res) => {
    console.log(`Searching ${req.params.version} for ${req.params.text}`);

    const body = {
        query: {
            "dis_max": {
                "queries": [
                    {
                        "match": {
                            "title": {
                                "query": req.params.text,
                                "fuzziness": "auto",
                                "boost": 3
                            }

                        }
                    },
                    {
                        "match": {
                            "body": req.params.text
                        }
                    }
                ],
                "tie_breaker": 0.7
            }
        },
        highlight: {
            "fields": {
                "body": {}
            }
        }
    }

    try {
        const resp = await searchDoc(req.params.version, body); 

        res.status(200).send(resp);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})

https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert')
}, app)
    .listen(port, () => {
        console.log(`Running at  port ${port}`);
    });