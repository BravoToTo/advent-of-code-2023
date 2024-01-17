const fs = require("fs");
const path = require("path");
const input_data = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();

function findFurthestPosition(input_data, part = 1, saveData = false) {
    if (part !== 1 && part !== 2) { return -1 };

    function findStartingPosition(pipeMatrix) {
        // Assuming there's only ONE starting position.
        for (let i = 0; i < pipeMatrix.length; i++) {
            for (let j = 0; j < pipeMatrix[i].length; j++) {
                if (pipeMatrix[i][j] === 'S') {
                    return [i, j];
                };
            };
        };
        return -1;
    };

    function getVertices(pipeMatrix, pipePosition) {
        //pipePosition = [row, col];
        let vertices = {};
        if (pipePosition[0] !== 0 && pipePosition[0] !== pipeMatrix.length - 1) {
            vertices.up = pipeMatrix[pipePosition[0] - 1][pipePosition[1]];
            vertices.down = pipeMatrix[pipePosition[0] + 1][pipePosition[1]];
        } else if (pipePosition[0] === 0) {
            vertices.down = pipeMatrix[pipePosition[0] + 1][pipePosition[1]];
        } else {
            vertices.up = pipeMatrix[pipePosition[0] - 1][pipePosition[1]];
        };
        if (pipePosition[1] !== 0 && pipePosition[1] !== pipeMatrix[pipePosition[0]].length - 1) {
            vertices.left = pipeMatrix[pipePosition[0]][pipePosition[1] - 1];
            vertices.right = pipeMatrix[pipePosition[0]][pipePosition[1] + 1];
        } else if (pipePosition[1] === 0) {
            vertices.right = pipeMatrix[pipePosition[0]][pipePosition[1] + 1];
        } else {
            vertices.left = pipeMatrix[pipePosition[0]][pipePosition[1] - 1];
        };
        return vertices;
    };

    function getPipe(pipeMatrix, pipePosition) {
        // Gets Pipe Type.
        return pipeMatrix[pipePosition[0]][pipePosition[1]];
    }

    function reverseDirection(direction) {
        switch (direction) {
            case 'up':
                return 'down'
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return '';
        };
    };

    function findNextPipe(previousDirection, currentPipePosition, pipeVertices, saveData) {
        const currentPipe = getPipe(pipeMatrix, currentPipePosition);

        const pipeTypes = {
            '|': ['up', 'down'],
            '-': ['left', 'right'],
            'L': ['up', 'right'],
            'J': ['up', 'left'],
            '7': ['left', 'down'],
            'F': ['right', 'down'],
            'S': ['up', 'down', 'left', 'right'],
            '.': []
        };

        const nextIndex = {
            'up': [-1, 0],
            'down': [1, 0],
            'left': [0, -1],
            'right': [0, 1]
        };

        //Reverse previousDirection
        previousDirection = reverseDirection(previousDirection);
        let nextDirection;
        let nextPipePosition;

        if (previousDirection === '') {
            // Need to check which of possibleNextDirections can connect to 'S'
            for (let i = 0; i < Object.values(pipeVertices).length; i++) {
                const pipe = Object.values(pipeVertices)[i];
                const neededDirection = reverseDirection(Object.keys(pipeVertices)[i]);
                if (pipeTypes[pipe].includes(neededDirection)) {
                    nextDirection = Object.keys(pipeVertices)[i];
                    break;
                };
            };
            nextPipePosition = [currentPipePosition[0] + nextIndex[nextDirection][0], currentPipePosition[1] + nextIndex[nextDirection][1]];
        } else {
            const possibleNextDirections = pipeTypes[currentPipe];
            // console.log(possibleNextDirections, currentPipe);
            nextDirection = Object.keys(pipeVertices).filter(vertex => vertex !== previousDirection && possibleNextDirections.includes(vertex))[0];
            // console.log([previousDirection], possibleNextDirections, pipeVertices);
            nextPipePosition = [currentPipePosition[0] + nextIndex[nextDirection][0], currentPipePosition[1] + nextIndex[nextDirection][1]];
        };
        // console.log(currentPipe, currentPipePosition, nextDirection, nextPipePosition);

        if (currentPipe !== 'S') {
            let aux = pipeMatrix[currentPipePosition[0]].split('');
            aux[currentPipePosition[1]] = '*'
            pipeMatrix[currentPipePosition[0]] = aux.join('');
        };

        return [nextPipePosition, nextDirection]; //nextPipe
    };

    function findMaze(pipeMatrix, startingPosition) {
        let pipeVertices = getVertices(pipeMatrix, startingPosition);
        let nextStep = findNextPipe('', startingPosition, pipeVertices, saveData);

        const tries = 10000000;
        let steps = 1;
        while (steps < tries) {
            pipeVertices = getVertices(pipeMatrix, nextStep[0]);
            nextStep = findNextPipe(nextStep[1], nextStep[0], pipeVertices, saveData);

            steps++;
            if (getPipe(pipeMatrix, nextStep[0]) === 'S') {
                if (saveData) { fs.writeFileSync(path.resolve(__dirname, './input_data_modified.txt'), pipeMatrix.join('\r\n')) };
                // console.log('LOOPED');
                return steps / 2;
            };
        };
        return -1; // Limit reached
    };

    const pipeMatrix = input_data.split('\r\n');
    let startingPosition = findStartingPosition(pipeMatrix);

    if (part === 1) { return findMaze(pipeMatrix, startingPosition) };

    findMaze(pipeMatrix, startingPosition);
    startingPosition = findStartingPipe(pipeMatrix);
    isOutsideLoop(pipeMatrix, [7,51]);

    //Need to find starting pipe to start checking I/O
    function findStartingPipe(pipeMatrix) {
        for (let i = 0; i < pipeMatrix.length; i++) {
            const match = pipeMatrix[i].match(/[^*IO]/);
            if (match) { return [i, match.index] };
        };
        return -1;
    };

    function isOutsideLoop(pipeMatrix, startingPosition) {
        if (startingPosition[0] === 0 || startingPosition[0] === pipeMatrix.length - 1 || startingPosition[1] === 0 || startingPosition[1] === pipeMatrix[startingPosition[0]].length - 1) {
            return true;
        };

        let rayDirection;
        let minDistance;
        if (startingPosition[0] < pipeMatrix.length - 1 - startingPosition[0]) {
            minDistance = startingPosition[0];
            rayDirection = 'up';
        } else {
            minDistance = pipeMatrix.length - 1 - startingPosition[0];
            rayDirection = 'down';
        };
        if (startingPosition[1] < pipeMatrix[startingPosition[0]].length - 1 - startingPosition[1]) {
            if (minDistance > startingPosition[1]) {
                minDistance = startingPosition[1];
                rayDirection = 'left';
            };
        } else {
            if (minDistance > pipeMatrix[startingPosition[0]].length - 1 - startingPosition[1]) {
                minDistance = pipeMatrix[startingPosition[0]].length - 1 - startingPosition[1];
                rayDirection = 'right';
            };
        };
        
        let indexDirection = [];
        switch (rayDirection) {
            case 'up':
                indexDirection = [-1,0];
                break;
            case 'down':
                indexDirection = [1,0];
                break;
            case 'left':
                indexDirection = [0,-1];
                break;
            case 'right':
                indexDirection = [0,1];
                break;
        };
        console.log("Ray Direction ->",rayDirection);
        let nextPosition = startingPosition;
        let counter = 0;
        let mazePipe = false;
        console.log(nextPosition, getPipe(pipeMatrix, nextPosition));
        for (let i = 0; i < minDistance; i++) {
            nextPosition = [nextPosition[0] + indexDirection[0], nextPosition[1] + indexDirection[1]];
            let nextPipe = getPipe(pipeMatrix, nextPosition);
            if (nextPipe === '*') {
                mazePipe = true;
            };
            if (nextPipe !== '*' && mazePipe === true) {
                counter++;
                console.log("counter++ ->",counter);
                mazePipe = false;
            }
            console.log(nextPosition, nextPipe);
        };
        console.log(counter);

    };
};



const start = new Date();
const result = findFurthestPosition(input_data, 2, false);
const end = new Date();

// const start2 = new Date();
// const result2 = sumExtrapolatedValues(input_data, 2);
// const end2 = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time first algorithm = ${(end - start) / 1000} seconds\n`);

// console.log("Tier 2 result:", result2);
// console.log(`Running time first algorithm = ${(end2 - start2) / 1000} seconds\n`);