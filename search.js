const esClient = require('./client');

const searchDoc = async function(indexName, payload) {
    return await esClient.search({
        index: indexName,
        // type: mappingType,
        body: payload
    });
}

module.exports = searchDoc;

async function test() {
    const body = {
        query: { "match_phrase": { "body": "data" } },
        highlight : {
            "fields" : {
                "body" : {}
            }
        }
    }

    try {
        const resp = await searchDoc('fe1.0', body);
        // console.log(resp);
        console.log(resp.hits[0]);
    } catch (e) {
        console.log(e);
    }
}

// test();