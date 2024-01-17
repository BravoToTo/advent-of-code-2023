const fs = require("fs");
const text = fs.readFileSync("./Adventofcode/Unfinished/Day 1 Trebuchet/input_data.txt").toString();
const input_data = text.split('\n');

let map = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9]
]);

const valid_starting_letters = ['o', 't', 'f', 's', 'e', 'n'];


const test = "asd";
// console.log(valid_starting_letters.includes(test[0]));
// check_possibilities(test);

function check_possibilities(text) {
    let possibilities = [];
    for (const key of map.keys()) {
        if (key.match(`^${test}\\w+`)) {
            possibilities.push(key);
        }
        if (possibilities.length === 2) { //Improves performance. (There's no more than two digits that start with the same letter)
            break;
        }
    }
}



function calibration_value(input_data) {
    let sum = 0;
    input_data.forEach((line) => {
        let left = 0;
        let right = line.length - 2;
        while (left < right) {
            if (Number.isNaN(Number.parseInt(line[left]))) {
                left++;
            };
            if (Number.isNaN(Number.parseInt(line[right]))) {
                right--;
            };
            if (Number.isInteger(Number.parseInt(line[left])) && Number.isInteger(Number.parseInt(line[right]))) {
                const joined_value = Number.parseInt(line[left].toString() + line[right].toString());
                sum += joined_value;
                break;
            }
        };
    });
    return sum;
};

function calibration_value_tier2(input_data) {
    let sum = 0;
    input_data.forEach((line) => {
        let left = 0;
        let right = line.length - 2;
        let left_letter = '';
        let right_letter = '';
        while (left < right) {
            if (Number.isNaN(Number.parseInt(line[left]))) {
                left++;
            };
            if (Number.isNaN(Number.parseInt(line[right]))) {
                right--;
            };
            if (Number.isInteger(Number.parseInt(line[left])) && Number.isInteger(Number.parseInt(line[right]))) {
                const joined_value = Number.parseInt(line[left].toString() + line[right].toString());
                sum += joined_value;
                break;
            }
        };
    });
    return sum;
};

const start = Date.now();
let totalSum = calibration_value(input_data);
const end = Date.now();
console.log("Total sum =",totalSum);
console.log(`Execution time: ${end - start} ms`);