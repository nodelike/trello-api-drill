const { getCards } = require("../api.js")

let listID = "664e3641c22ffd95abce22bc";

getCards(listID)
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(`Error in getting card by list ID: ${error}`);
    })
