const fs = require("fs");
const text = fs.readFileSync("./Adventofcode/Unfinished/Day 3 Gear Ratios/input_data.txt").toString();
const input_data = text.split('\r\n');

function sumValidParts(input_data) {
    let sum = 0;
    const regex = RegExp(/\d+/, 'g');
    for (let row = 0; row < input_data.length; row++) {
        let indexPairs = [];
        let numbers = [];
        while (null !== (matchArr = regex.exec(input_data[row]))) {
            indexPairs.push([matchArr.index, regex.lastIndex - 1]);
            numbers.push(matchArr[0]);
        };
        const validNumbers = checkNeighbors(input_data, numbers, indexPairs, row);
        validNumbers.forEach(num => {
            sum += Number(num);
        });
    };
    return sum;
};

function checkNeighbors(input_data, numbers, indexes, row) {
    const validNumbers = [];
    for (let i = 0; i < indexes.length; i++) {
        for (let j = indexes[i][0]; j <= indexes[i][1]; j++) {
            if (j !== 0 && (input_data[row][j - 1].match(/[^\.0-9]+/g))) {
                validNumbers.push(numbers[i]);
                break;
            };
            if (j !== input_data[row].length - 1 && input_data[row][j + 1].match(/[^\.0-9]+/g)) {
                validNumbers.push(numbers[i]);
                break;
            };
            if (row !== 0 && ((j !== 0 && input_data[row - 1][j - 1].match(/[^\.0-9]+/g)) || input_data[row - 1][j].match(/[^\.0-9]+/g) || (j !== input_data[row - 1].length - 1 && input_data[row - 1][j + 1].match(/[^\.0-9]+/g)))) {
                validNumbers.push(numbers[i]);
                break;
            };
            if (row !== input_data.length - 1 && ((j !== 0 && input_data[row + 1][j - 1].match(/[^\.0-9]+/g)) || input_data[row + 1][j].match(/[^\.0-9]+/g) || (j !== input_data[row + 1].length - 1 && input_data[row + 1][j + 1].match(/[^\.0-9]+/g)))) {
                validNumbers.push(numbers[i]);
                break;
            };
        }
    }
    return validNumbers;
};

const sum = sumValidParts(input_data);
console.log("Tier 1 result:", sum);