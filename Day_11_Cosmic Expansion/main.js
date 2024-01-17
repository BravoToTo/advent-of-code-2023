const fs = require("fs");
const path = require("path");
const input_data = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();

function sumShortestPath(input_data, part) {

    /**
     * @param {string[]} cosmos
     * @return {string[]}
     */
    function expandSpace(cosmos) {
        let newCosmos = [];
        let usedColumns = new Set();
        cosmos.forEach(row => {
            newCosmos.push(row);
            if (!row.match(/#/g)) { newCosmos.push(row) };
            const regex = RegExp(/#/, 'g');
            while (null !== (match = regex.exec(row))) { usedColumns.add(match.index) };
        });

        const emptyColumns = [];
        for (let i = 0; i < cosmos[0].length; i++) {
            if (!usedColumns.has(i)) { emptyColumns.push(i) };
        };

        for (let i = 0; i < newCosmos.length; i++) {
            for (let j = 0; j < emptyColumns.length; j++) {
                newCosmos[i] = newCosmos[i].substring(0, emptyColumns[j] + j) + '.' + newCosmos[i].substring(emptyColumns[j] + j);
            };
        };

        return newCosmos;
    };

    /**
     * @param {string[]} cosmos
     * @return {Number[]} galaxyPositions
     */
    function findGalaxies(cosmos) {
        let galaxyPositions = [];
        const regex = RegExp(/#/, 'g');
        cosmos.forEach((row, index) => {
            while (null !== (match = regex.exec(row))) { galaxyPositions.push([index, match.index]) };
        });
        return galaxyPositions;
    };

    /**
     * @param {Number[]} galaxyPos1
     * @param {Number[]} galaxyPos2
     * @return {Number}
     */
    function calculateDistance(galaxyPos1, galaxyPos2) {
        return (Math.abs(galaxyPos1[0] - galaxyPos2[0]) + (Math.abs(galaxyPos1[1] - galaxyPos2[1])));
    };

    /**
     * @param {string[]} cosmos
     * @return {object} affected
     * @return {Number[]} affectedCosmos.rows
     * @return {Number[]} affectedCosmos.cols
     */
    function getAffectedCosmos(cosmos) {
        let affected = {
            'rows': [],
            'cols': []
        };
        let usedColumns = new Set();
        cosmos.forEach((row, index) => {
            if (!row.match(/#/g)) { affected.rows.push(index) };
            const regex = RegExp(/#/, 'g');
            while (null !== (match = regex.exec(row))) { usedColumns.add(match.index) };
        });

        const emptyColumns = [];
        for (let i = 0; i < cosmos[0].length; i++) {
            if (!usedColumns.has(i)) { emptyColumns.push(i) };
        };

        affected.cols = emptyColumns;
        return affected;
    };

    /**
     * @param {Number[]} galaxyPos1
     * @param {Number[]} galaxyPos2
     * @param {object} affectedCosmos
     * @param {Number[]} affectedCosmos.rows
     * @param {Number[]} affectedCosmos.cols
     * @return {Number}
     */
    function calculateRealDistance(galaxyPos1, galaxyPos2, affectedCosmos) {
        const multiplier = 1000000;
        const minRows = Math.min(galaxyPos1[0], galaxyPos2[0]);
        const maxRows = Math.max(galaxyPos1[0], galaxyPos2[0]);
        const rowsAffectedCounter = affectedCosmos.rows.filter(value => {
            if (value > minRows && value < maxRows) {
                return value;
            };
        }).length;

        const minCols = Math.min(galaxyPos1[1], galaxyPos2[1]);
        const maxCols = Math.max(galaxyPos1[1], galaxyPos2[1]);
        const colsAffectedCounter = affectedCosmos.cols.filter(value => {
            if (value > minCols && value < maxCols) {
                return value;
            };
        }).length;

        return (Math.abs(galaxyPos1[0] - galaxyPos2[0]) + (Math.abs(galaxyPos1[1] - galaxyPos2[1]))) + (rowsAffectedCounter + colsAffectedCounter) * multiplier - (rowsAffectedCounter + colsAffectedCounter);
    };

    const cosmos = input_data.split('\r\n');

    if (part === 1) {
        const newCosmos = expandSpace(cosmos);
        const galaxyPositions = findGalaxies(newCosmos);

        let sum = 0;
        for (let i = 0; i < galaxyPositions.length - 1; i++) {
            for (let j = i + 1; j < galaxyPositions.length; j++) {
                sum += calculateDistance(galaxyPositions[i], galaxyPositions[j]);
            };
        };
        return sum;
    } else if (part === 2) {
        const galaxyPositions = findGalaxies(cosmos);
        const affectedCosmos = getAffectedCosmos(cosmos);

        let sum = 0;
        for (let i = 0; i < galaxyPositions.length - 1; i++) {
            for (let j = i + 1; j < galaxyPositions.length; j++) {
                sum += calculateRealDistance(galaxyPositions[i], galaxyPositions[j], affectedCosmos);
            };
        };
        return sum;
    };
    return -1;
};

// const start = new Date();
// const result = sumShortestPath(input_data, 1);
// const end = new Date();

const start2 = new Date();
const result2 = sumShortestPath(input_data, 2);
const end2 = new Date();

// console.log("Tier 1 result:", result);
// console.log(`Running time first algorithm = ${(end - start) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time first algorithm = ${(end2 - start2) / 1000} seconds\n`);