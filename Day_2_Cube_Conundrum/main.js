const fs = require("fs");
const text = fs.readFileSync("./Adventofcode/Unfinished/Day 2 Cube Conundrum/input_data.txt").toString();
const input_data = text.split('\n');

const config = {
    "red": 12,
    "green": 13,
    "blue": 14
};

function findSumOfValidIDs(input_data) {
    let sum = 0;
    input_data.forEach(data => {
        const gameId = data.split(':')[0];
        const gameSets = data.split(':')[1].split(';');
        let gamePossible = true;
        for (i = 0; i < gameSets.length; i++) {
            let individualCubes = gameSets[i].split(',');
            for (j = 0; j < individualCubes.length; j++) {
                if (individualCubes[j].includes('red')) {
                    if (Number(individualCubes[j].match(/\d+/g, '')[0]) > config.red) {
                        gamePossible = false;
                        break;
                    }
                };
                if (individualCubes[j].includes('green')) {
                    if (Number(individualCubes[j].match(/\d+/g, '')[0]) > config.green) {
                        gamePossible = false;
                        break;
                    }
                };
                if (individualCubes[j].includes('blue')) {
                    if (Number(individualCubes[j].match(/\d+/g, '')[0]) > config.blue) {
                        gamePossible = false;
                        break;
                    }
                };
            };
            if (!gamePossible) {
                break;
            }
        };
        if (gamePossible) {
            sum += Number(gameId.replace('Game ', ''));
        }
    });
    return sum;
}

function findSumOfPower(input_data) {
    let sum = 0;
    let minimumReds = [];
    let minimumGreens = [];
    let minimumBlues = [];
    input_data.forEach(data => {
        const gameSets = data.split(':')[1].split(';');
        let minimumRed = -Infinity;
        let minimumGreen = -Infinity;
        let minimumBlue = -Infinity;
        for (i = 0; i < gameSets.length; i++) {
            let individualCubes = gameSets[i].split(',');
            for (j = 0; j < individualCubes.length; j++) {
                if (individualCubes[j].includes('red')) {
                    minimumRed = Math.max(minimumRed, Number(individualCubes[j].match(/\d+/g, '')[0]))
                };
                if (individualCubes[j].includes('green')) {
                    minimumGreen = Math.max(minimumGreen, Number(individualCubes[j].match(/\d+/g, '')[0]))
                };
                if (individualCubes[j].includes('blue')) {
                    minimumBlue = Math.max(minimumBlue, Number(individualCubes[j].match(/\d+/g, '')[0]))
                };
            };
        };
        minimumReds.push(minimumRed);
        minimumGreens.push(minimumGreen);
        minimumBlues.push(minimumBlue);
    });
    if (minimumReds.length !== minimumGreens.length || minimumReds.length !== minimumBlues.length) {
        return -1;
    } else {
        for (let i = 0; i < minimumReds.length; i++) {
            sum += minimumReds[i] * minimumGreens[i] * minimumBlues[i];
        }
        return sum;
    }
}



const sum = findSumOfValidIDs(input_data);
console.log("Tier 1 result:", sum);
const sum2 = findSumOfPower(input_data);
console.log("Tier 2 result:", sum2);