const fs = require("fs");
const path = require("path");
const input_data = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();

function sumExtrapolatedValues(input_data, tier) {
    let extrapolatedValues = 0;
    const report = input_data.split('\r\n');
    report.forEach(line => {
        const originalValue = line.split(' ');
        let values = originalValue;
        const histories = [];
        let sum = Infinity;
        let tries = 0;
        while (sum !== 0) {
            let differences = [];
            sum = 0;
            for (let i = 1; i < values.length; i++) {
                differences.push(values[i] - values[i - 1]);
                if (values[i] - values[i - 1] !== 0) { sum++; };
            };
            histories.push(differences);
            values = differences;
            tries++;
        };

        let lineExtrapolatedValue = 0;
        switch (tier) {
            case 1:
                for (let i = histories.length - 2; i >= 0; i--) {
                    lineExtrapolatedValue += histories[i][histories[i].length - 1];
                };
                extrapolatedValues += lineExtrapolatedValue + Number(originalValue[originalValue.length - 1]);
                break;
            case 2:
                for (let i = histories.length - 2; i >= 0; i--) {
                    lineExtrapolatedValue = histories[i][0] - lineExtrapolatedValue;
                };
                extrapolatedValues += Number(originalValue[0]) - lineExtrapolatedValue;
                break;
            default:
                return -1;
        }
    });
    return extrapolatedValues;
};

const start = new Date();
const result = sumExtrapolatedValues(input_data, 1);
const end = new Date();

const start2 = new Date();
const result2 = sumExtrapolatedValues(input_data, 2);
const end2 = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time first algorithm = ${(end - start) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time first algorithm = ${(end2 - start2) / 1000} seconds\n`);