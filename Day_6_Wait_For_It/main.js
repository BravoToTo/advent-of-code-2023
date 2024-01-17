const fs = require("fs");
const path = require("path");
const text = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();
const input_data = text.split('\r\n');

function calculateWays(input_data) {
    const race_time = input_data[0].match(/\d+/g);
    const record_distance = input_data[1].match(/\d+/g);

    let ways = 1;
    for (let i = 0; i < race_time.length; i++) {
        let hold = 1;
        let waysRace = 0;
        while (hold < race_time[i]) {
            const distance = (race_time[i] - hold) * hold;
            if (distance > record_distance[i]) {
                waysRace++;
            }
            hold++;
        };
        ways *= waysRace;
        waysRace = 0;
        hold = 1;
    };
    return ways;
};

function calculateWays2(input_data) {
    const race_time = Number(input_data[0].match(/\d+/g).join(''));
    const record_distance = Number(input_data[1].match(/\d+/g).join(''));

    let hold = race_time / 2;;
    let left = hold;
    let right = race_time;
    let depth = 0; // Por las dudas.
    while (depth < 1000 && (right - left) !== 1) {
        const distance = (race_time - hold) * hold;
        if (distance === record_distance) {
            right = hold;
            break;
        }
        if (distance < record_distance) {
            right = hold;
            hold = Math.round((hold + left) / 2);
        }
        if (distance > record_distance) {
            left = hold;
            hold = Math.round((hold + right) / 2);
        };
        depth++;
    };
    return 2 * (right - (race_time / 2)) - 1;
};



const ways = calculateWays(input_data);
console.log("Tier 1 result:", ways);

const ways2 = calculateWays2(input_data);
console.log("Tier 2 result:", ways2);
//26 13 17 17