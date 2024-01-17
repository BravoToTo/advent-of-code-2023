const fs = require("fs");
const text = fs.readFileSync("./Adventofcode/Unfinished/Day 4 Scratchcards/input_data.txt").toString();
const input_data = text.split('\r\n');

function calculatePoints(input_data) {
    let sum = 0;
    input_data.forEach(card => {
        const winning_numbers = card.split(':')[1]
            .split('|')[0]
            .trim()
            .split(' ')
            .filter(str => str.length > 0)
            .map(str => { return parseInt(str) }); //.map es opcional ya que la estructura de datos es regular.
        const my_numbers = card.split(':')[1]
            .split('|')[1]
            .trim()
            .split(' ')
            .filter(str => str.length > 0)
            .map(str => { return parseInt(str) }); //.map es opcional ya que la estructura de datos es regular.
        const numbers_won = [];
        winning_numbers.forEach(num => {
            if (my_numbers.includes(num)) {
                numbers_won.push(num);
            }
        });
        if (numbers_won.length !== 0) {
            sum += Math.pow(2, numbers_won.length - 1);
        };
    });
    return sum;
}

const sum = calculatePoints(input_data);
console.log("Tier 1 result:", sum);