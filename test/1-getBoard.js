const { getBoard } = require("../api.js");

let boardID = "664e3641c22ffd95abce22b5";

getBoard(boardID)
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(`Error in getting board by ID: ${error}`);
    })