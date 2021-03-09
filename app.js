const {
    assembleCards,
    replaceBlankSpace,
    getRandomMessage,
    getRandomCards,
    deck
} = require('./src/deck');

const args = process.argv.slice(2);

const help = `
*********************

Usage: node app.js 
       node app.js [option] [parameter]
       node app.js [option] [parameter] [parameter]
Options:
    * -s            Show cards in the deck -> [parameter]: deck color
    * -rc           Return N random cards from the especified deck [parameter1]: deck color [parameter2]: Number of random cards (default = 1) 
    * -h, --help    Print command line options

Parametes:
    * blackDeck       Black Cards
    * whiteDeck       White Cards
*********************
`;



const validateDeck = option =>{
    if(option === "blackDeck"){
        return deck.blackDeck;
    }else if(option === "whiteDeck"){
        return deck.whiteDeck;
    }else{
        return null;
    }
}

if(args.length === 0){
    // Print a random message
    console.log(getRandomMessage(deck));
}else{
    switch(args[0]){ // Show Deck
        case "-s":
            if(validateDeck(args[1])){
                console.log(deck);
            } else{
                console.log(`Bad Parameter: ${args[1]}. Use --help for list of options`);
            }
            break;
        case "-rc": // Random Card
            let cards = validateDeck(args[1]);
            if(cards){
                if(args[2]){
                    let num = Number(args[2]);
                    console.log(getRandomCards(cards, num));
                }else{
                    console.log(getRandomCards(cards));
                }
            } else{
                console.log(`Bad Parameter: ${args[1]}. Use --help for list of options`);
            }
            break;
        case "-h":
        case "--help":
            console.log("help");
            break;
        default:
            console.log(`Bad Option: ${args[0]}. Use --help for list of options`);
            break;

    }
}


