const fs = require("fs");
const path = require("path");
const input_data = fs.readFileSync(path.resolve(__dirname, './input_data.txt')).toString();

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right
    };
};

function calculateSteps2(input_data) {
    function gcd(a, b) {
        if (b === 0) { return a };
        return gcd(b, a % b);
    };

    function lcm(a, b) {
        return a * b / gcd(a, b);
    };

    function findCycle(allNodes, node, endingNodes, directions) {
        let j = 0;
        let steps = 0;
        const tries = 10000000000;
        while (steps < tries) {
            if (directions[j] === 'L') {
                node = allNodes[node.left];
            } else {
                node = allNodes[node.right];
            };
            steps++;
            if (endingNodes.includes(node.data)) {
                return steps;
            };
            (j !== directions.length - 1) ? j++ : j = 0;
        };
    };
    
    const nodesRaw = input_data.match(/[A-Z]{3}(?=[^A-Z\n\r])/g);
    const directions = input_data.substring(0, input_data.indexOf('\n\r') - 1);
    
    let nodes = [];
    let indexes = {};
    let startingElements = [];
    let endingElements = [];
    for (let i = 0; i < nodesRaw.length; i += 3) {
        nodes.push(new Node(nodesRaw[i], nodesRaw[i + 1], nodesRaw[i + 2]));
        indexes[nodesRaw[i]] = nodes.length - 1;
        if (nodesRaw[i][2] === 'Z') {
            endingElements.push(nodes.length - 1);
        };
        if (nodesRaw[i][2] === 'A') {
            startingElements.push(nodes.length - 1);
        };
    };

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].data = indexes[nodes[i].data];
        nodes[i].left = indexes[nodes[i].left];
        nodes[i].right = indexes[nodes[i].right];
    };

    let startingNodes = [];
    startingElements.forEach(element => {
        startingNodes.push(nodes[element]);
    });

    let allCycles = []
    startingNodes.forEach(node => {
        allCycles.push(findCycle(nodes, node, endingElements, directions));
    });

    let steps;
    if (allCycles.length > 2) {
        steps = lcm(allCycles[0], allCycles[1]);
        for (let i = 2; i < allCycles.length; i++) {
            steps = lcm(steps, allCycles[i]);
        };
    };

    return steps;
};


function calculateSteps(input_data, mode) {
    const nodesRaw = input_data.match(/[A-Z]{3}(?=[^A-Z\n\r])/g);
    const directions = input_data.substring(0, input_data.indexOf('\n\r') - 1);

    let nodes = [];
    let indexes = {};
    let startElement, endElement;
    for (let i = 0; i < nodesRaw.length; i += 3) {
        nodes.push(new Node(nodesRaw[i], nodesRaw[i + 1], nodesRaw[i + 2]));
        indexes[nodesRaw[i]] = nodes.length - 1;
        if (nodesRaw[i] === 'ZZZ') {
            endElement = nodes.length - 1;
        };
        if (nodesRaw[i] === 'AAA') {
            startElement = nodes.length - 1;
        };
    };

    let j, steps, element;
    switch (mode) {
        case 0:
            j = 0;
            steps = 0;
            element = 'AAA';
            while (element !== 'ZZZ') {
                let node = nodes.find(value => value.data === element);
                if (directions[j] === 'L') {
                    element = node.left;
                } else {
                    element = node.right;
                };
                steps++;
                (j !== directions.length - 1) ? j++ : j = 0;
            };
            return steps;
        case 1:
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].data = indexes[nodes[i].data];
                nodes[i].left = indexes[nodes[i].left];
                nodes[i].right = indexes[nodes[i].right];
            };

            j = 0;
            steps = 0;
            element = startElement;
            const tries = 10000000;
            while (element !== endElement && steps < tries) {
                let node = nodes[element];
                if (directions[j] === 'L') {
                    element = node.left;
                } else {
                    element = node.right;
                };
                steps++;
                (j !== directions.length - 1) ? j++ : j = 0;
            };
            return steps;

        default:
            return -1;
    };
};

const start = new Date();
const result = calculateSteps(input_data, 0); // Algoritmo inicial (mal optimizado)
const end = new Date();

const start1 = new Date();
const result1 = calculateSteps(input_data, 1); // Algoritmo optimizado
const end1 = new Date();

const start2 = new Date();
const result2 = calculateSteps2(input_data);
const end2 = new Date();

console.log("Tier 1 result:", result);
console.log(`Running time first algorithm = ${(end - start) / 1000} seconds\n`);

console.log("Tier 1 result:", result1);
console.log(`Running time second algorithm = ${(end1 - start1) / 1000} seconds\n`);

console.log("Tier 2 result:", result2);
console.log(`Running time first algorithm = ${(end2 - start2) / 1000} seconds\n`);