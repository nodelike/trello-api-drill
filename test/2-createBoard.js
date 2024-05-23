const { createBoard } = require("../api.js");

createBoard("Goals")
    .then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(`Error in creating a new board: ${error}`);
    })