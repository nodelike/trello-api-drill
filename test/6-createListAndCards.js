const { create3ListAndCard } = require("../api.js");

create3ListAndCard("Goals")
    .then((createdLists) => {
        console.log(createdLists)
    }).catch((error) => {
        console.log(`Error in creating board and 3 list and card for each: ${error}`);
    })

module.exports = create3ListAndCard;