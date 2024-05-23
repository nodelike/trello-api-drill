const env = require("./config.js");

const apiKey = env.API_KEY;
const token = env.TOKEN;

exports.getBoard = (boardID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/boards/${boardID}?key=${apiKey}&token=${token}`, {
            method: "GET",
            headers: { 'Context-Type': "application/json" }
        })
        .then(response => response.json())
        .then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.createBoard = (boardName) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.getLists = (boardID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/boards/${boardID}/lists?key=${apiKey}&token=${token}`, {
            method: "GET",
            headers: { 'Context-Type': "application/json" }
        })
        .then(response => response.json())
        .then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.getCards = (listID) =>{
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${token}`, {
            method: "GET",
            headers: { 'Context-Type': "application/json" }
        })
        .then(response => response.json())
        .then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.getAllCards = (boardID) => {
    return new Promise((resolve, reject) => {
        this.getLists(boardID)
            .then((lists) => {
                let cardPromises = [];
                for(let list of lists){
                    let card = this.getCards(list.id)
                    cardPromises.push(card);
                }

                return Promise.all(cardPromises);
            })
            .then((cards) => {
                resolve(cards);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.createList = (listName, boardID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/lists/?name=${listName}&idBoard=${boardID}&key=${apiKey}&token=${token}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then((list) => {
            resolve(list);
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.createCard = (listID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/cards?idList=${listID}&key=${apiKey}&token=${token}`, {
            method: "POST",
            headers: { 'Context-Type' : 'application/json' }
        })
        .then(response => response.json())
        .then((card) => {
            resolve(card);
        }).catch((error) => {
            reject(error);
        });
    });
}

exports.create3ListAndCard = (boardName) => {
    return new Promise((resolve, reject) => {
        this.createBoard(boardName)
            .then((board) => {
                let listPromises = []
    
                let listName = ["Goal1", "Goal2", "Goal3"]
                for(let i = 0; i < 3; i++){
                    let list = this.createList(listName[i], board.id)
                                .then((list) => {
                                    return this.createCard(list.id);
                                })
                    listPromises.push(list);
                }
            
                Promise.all(listPromises)
                    .then((data) => {
                        resolve(data);
                    }).catch((error) => {
                        reject(error);
                    })
            })
    })

}

exports.deleteList = (listID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/lists/${listID}/closed?value=true&key=${apiKey}&token=${token}`, {
            method: "PUT",
        })
        .then(response => response.json())
        .then((deletedCard) => {
            resolve(deletedCard);
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.getChecklists = (cardID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/cards/${cardID}/checklists?key=${apiKey}&token=${token}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then((checkItems) => {
            resolve(checkItems);
        }).catch((error) => {
            reject(error)
        })
    })
}

exports.getCheckItems = (checklistID) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.trello.com/1/checklists/${checklistID}/checkItems?key=${apiKey}&token=${token}`)
            .then(response => response.json())
            .then((checkItems) => {
                resolve(checkItems);
            }).catch((error) => {
                reject(error);
            })
    })
}

exports.updateCheckItem = (cardID, checkItemID, state) => {
    return new Promise((resolve, reject) => {
        let stateQuery = "state=" + (state ? "complete" : "incomplete");
        if(state){
            fetch(`https://api.trello.com/1/cards/${cardID}/checkItem/${checkItemID}?${stateQuery}&key=${apiKey}&token=${token}`, {
                method: "PUT"
            })
            .then(response => response.json())
            .then((checkItem) => {
                resolve(checkItem);
            }).catch((error) => {
                reject(error);
            })
        } else {
            setTimeout(() => {
                fetch(`https://api.trello.com/1/cards/${cardID}/checkItem/${checkItemID}?${stateQuery}&key=${apiKey}&token=${token}`, {
                    method: "PUT"
                })
                .then(response => response.json())
                .then((checkItem) => {
                    resolve(checkItem);
                }).catch((error) => {
                    reject(error);
                })
            }, 1000)
        }
    })
}
