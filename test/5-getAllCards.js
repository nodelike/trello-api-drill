const { getAllCards } = require("../api.js")

let boardID = "664e3641c22ffd95abce22b5";

getAllCards(boardID)
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(`Error in getting all cards by board ID: ${error}`);
    })