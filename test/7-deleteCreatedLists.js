const { deleteList, create3ListAndCard } = require("../api.js");

// creating board
create3ListAndCard("Nature")
    .then((createdCards) => {
        //deletion process
        let deletePromises = [];
        for(let card of createdCards){
            let deletePromise = deleteList(card.idList);
            deletePromises.push(deletePromise);
        }

        return Promise.all(deletePromises);
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(`Error in creating & deleting board and 3 list and card for each, simultaneously: ${error}`);
    })