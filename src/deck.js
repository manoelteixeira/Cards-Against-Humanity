const deck = require('./cards.json');

// Return the index of the blank character
const getBlankIndex = blackCard => {
    return blackCard.indexOf('_');
}

// Return the Number of blanck Spaces
const getNumOfBlankSpaces = blackCard => {
    return (blackCard.match(/_/g) || []).length;
}

// Replace the first blank space found in the black card
const replaceBlankSpace = (blackCard, whiteCard) => {
    let index = getBlankIndex(blackCard);
    let wCard = ' [' + whiteCard + '] ';
    let replaced = '';
    if(index != null){
        if(index === 0){
            replaced = wCard + blackCard.slice(1);
        }else{
            let pre = blackCard.slice(0, index);
            let pos = blackCard.slice(index + 1);
            replaced = pre + wCard + pos;
        }
    }
    return replaced;
}

// Return N amount of random cards. default = 1 card.
const getRandomCards = (deck, numCards = 1) => {
    const deckLength = deck.length;
    if(deckLength < numCards){
        throw 'ERRO: deck doesnt have enought cards'
    }
    if(numCards === 1){
        const index = Math.floor(Math.random() * Math.floor(deckLength - 1));
        return deck[index];
    }else{
        const cards = [];
        while(cards.length < numCards){
            const index = Math.floor(Math.random() * Math.floor(deckLength - 1));
            let newCard = deck[index];
            let cardExists = cards.findIndex(card => card === newCard);
            if(cardExists === -1){
                cards.push(newCard);
            }
        }
        return cards;
    }
}

const assembleCards = (blackCard, whiteCard) => {
    const numOfBlanks = getNumOfBlankSpaces(blackCard);
    if(typeof blackCard != 'string'){ // check if blackCard is a string
        throw "ERRO: Black Card is not a String";
    }

    if(typeof whiteCard === 'string'){ // check if whiteCard is a string
        return replaceBlankSpace(blackCard, whiteCard);
    } else if (Array.isArray(whiteCard)){ // if whiteCard is an array
        if(whiteCard.length !== numOfBlanks){ // Check if the correct number of whiteCards was provided.
            throw 'ERRO: Number of White Cards provided is not equal to the number of white cards needed';
        } else {
            let replaced = replaceBlankSpace(blackCard, whiteCard[0]);
            let whiteCardIndex = 1;
            while(getBlankIndex(replaced) != -1){
                replaced = replaceBlankSpace(replaced, whiteCard[whiteCardIndex]);
                whiteCardIndex ++;
                // console.log(replaced);
            }
            return replaced;   
        }
    }
}

const getRandomMessage = (deck) => {
    const blackCard = getRandomCards(deck.blackDeck);
    const numBlankSpaces = getNumOfBlankSpaces(blackCard);
    if(numBlankSpaces === 0){
        return assembleCards(blackCard, getRandomCards(deck.whiteDeck));
    }else{
        let cards = getRandomCards(deck.whiteDeck, numBlankSpaces);
        return assembleCards(blackCard, cards);
    }
}


module.exports = {
    deck: deck,
    assembleCards: assembleCards,
    replaceBlankSpace: replaceBlankSpace,
    getRandomMessage: getRandomMessage,
    getRandomCards: getRandomCards
}