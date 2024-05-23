const { deleteList, create3ListAndCard } = require("../api.js");

create3ListAndCard("Fitness")
    .then((createdCards) => {
        return createdCards.reduce((promise, card) => {
            return promise.then(() => {
                return deleteList(card.idList)
            })
        }, Promise.resolve());
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(`Error in creating & deleting board and 3 list and card for each, sequentiallly: ${error}`);
    })