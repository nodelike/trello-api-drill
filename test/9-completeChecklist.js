const { getCheckItems, updateCheckItem } = require("../api.js")

let cardID = "664e365cdce19138025824e0"
let checklistID = "664e366ac441959b2a62cb4f";

getCheckItems(checklistID)
    .then((checkItems) => {
        let completePromises = [];
        for(let item of checkItems){
            let completePromise = updateCheckItem(cardID, item.id, true)
            completePromises.push(completePromise);
        }
        return Promise.all(completePromises);
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(`Error in updating checkItems state to complete: ${error}`);
    })
