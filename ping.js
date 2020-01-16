const esClient = require('./client');

esClient.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace("ES is down");
    }
    else {
        console.log("All is well");
    }
});