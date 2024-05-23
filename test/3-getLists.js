const { getLists } = require("../api.js")

let boardID = "664e3641c22ffd95abce22b5";

getLists(boardID)
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(`Error in getting lists by board ID: ${error}`);
    })
