const fs = require("fs");
const path = require("path");
const input_data = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();

function TotalWinnings(input_data) {
    const allHands = input_data.match(/[TJQKA2-9]{5}/g); // Array of hands
    const allBids = input_data.match(/ \d+/g).map(bid => parseInt(bid)); // Array of bids

    // Gets every hand value
    let set = [];
    for (let i = 0; i < allHands.length; i++) {
        let value = HandValue(allHands[i]);
        set.push({ 'hand': allHands[i], 'bid': allBids[i], 'value': value });
    };

    // Sort objects by its handValue
    set.sort(function (a, b) {
        return ((a.value < b.value) ? -1 : ((a.value == b.value) ? 0 : 1)); // -1 lower index, 0 equal, 1 higher index
    });

    // Calculates total winnings
    let winnings = 0;
    for (let i = 0; i < set.length; i++) {
        winnings += set[i].bid * (i + 1);
    };

    return winnings;
};

function HandValue(hand) {
    const cardValues = {
        'A': 14,
        'K': 13,
        'Q': 12,
        'J': 11,
        'T': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
    };
    
    let cardCount = {};
    let dividend = 1;
    let hand_value = 0;
    let max = 0;
    for (let i = 0; i < hand.length; i++) {
        hand_value += cardValues[hand[i]] * 100000000 / dividend;
        dividend *= 100;
        if (cardCount.hasOwnProperty(hand[i])) {
            cardCount[hand[i]] += 1;
        } else {
            cardCount[hand[i]] = 1;
        };
        max = Math.max(max, cardCount[hand[i]]);
    };

    switch (Object.keys(cardCount).length) {
        case 1:
            hand_value += 7 * 10000000000;
            break;
        case 2:
            if (max === 4) {
                hand_value += 6 * 10000000000;
            } else {
                hand_value += 5 * 10000000000;
            };
            break;
        case 3:
            if (max === 3) {
                hand_value += 4 * 10000000000;
            } else {
                hand_value += 3 * 10000000000;
            }
            break;
        case 4:
            hand_value += 2 * 10000000000;
            break;
        case 5:
            hand_value += 1 * 10000000000;
            break;
    };
    return hand_value;
};

const start = new Date();
const winnings = TotalWinnings(input_data);
const end = new Date();

console.log("Tier 1 result:", winnings);
console.log(`Running time = ${(end - start) / 1000} seconds`);