const fs = require("fs");
const input_data = fs.readFileSync("./Adventofcode/Unfinished/Day 5 If You Give A Seed A Fertilizer/input_data.txt").toString();

function lowestLocationNumber(input_data) {
    const seeds = input_data.substring(input_data.indexOf("seeds: ") + "seeds: ".length, input_data.indexOf("seed-to-soil map:")).split(' ').map(str => { return parseInt(str) });
    const seed_to_soil = input_data.substring(input_data.indexOf("seed-to-soil map:") + "seed-to-soil map:".length, input_data.indexOf("soil-to-fertilizer map:")).split('\r\n').filter(str => str.length > 0);
    const soil_to_fertilizer = input_data.substring(input_data.indexOf("soil-to-fertilizer map:") + "soil-to-fertilizer map:".length, input_data.indexOf("fertilizer-to-water map:")).split('\r\n').filter(str => str.length > 0);
    const fertilizer_to_water = input_data.substring(input_data.indexOf("fertilizer-to-water map:") + "fertilizer-to-water map:".length, input_data.indexOf("water-to-light map:")).split('\r\n').filter(str => str.length > 0);
    const water_to_light = input_data.substring(input_data.indexOf("water-to-light map:") + "water-to-light map:".length, input_data.indexOf("light-to-temperature map:")).split('\r\n').filter(str => str.length > 0);
    const light_to_temperature = input_data.substring(input_data.indexOf("light-to-temperature map:") + "light-to-temperature map:".length, input_data.indexOf("temperature-to-humidity map:")).split('\r\n').filter(str => str.length > 0);
    const temperature_to_humidity = input_data.substring(input_data.indexOf("temperature-to-humidity map:") + "temperature-to-humidity map:".length, input_data.indexOf("humidity-to-location map:")).split('\r\n').filter(str => str.length > 0);
    const humidity_to_location = input_data.substring(input_data.indexOf("humidity-to-location map:") + "humidity-to-location map:".length).split('\r\n').filter(str => str.length > 0);

    let lowestLocation = Infinity;
    const part_two = false; // Activar o desactivar parte 2.
    if (part_two) {
        // Brute-force solution (very high runtime)
        for (let i = 0; i < seeds.length; i += 2) {
            for (let j = seeds[i]; j <= seeds[i] + seeds[i + 1]; j++) {
                lowestLocation = Math.min(lowestLocation, mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(j, seed_to_soil), soil_to_fertilizer), fertilizer_to_water), water_to_light), light_to_temperature), temperature_to_humidity), humidity_to_location));
            }
        }
    } else {
        seeds.forEach(seed => {
            lowestLocation = Math.min(lowestLocation, mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(mapNumber(seed, seed_to_soil), soil_to_fertilizer), fertilizer_to_water), water_to_light), light_to_temperature), temperature_to_humidity), humidity_to_location));
        });
    }
    return lowestLocation;
}

function mapNumber(srcNumber, map) {
    for (let i = 0; i < map.length; i++) { // test srcNumber with every map available
        const mapInt = map[i].split(' ').map(str => { return parseInt(str) }); // parse map to Int [Dest_Start, Src_Start, Range_Length]
        if (srcNumber >= mapInt[1] && srcNumber <= mapInt[1] + mapInt[2] - 1) { // srcNumber in range of map?
            return mapInt[0] + srcNumber - mapInt[1];
        }
    };
    return srcNumber;
};

const lowestLocation = lowestLocationNumber(input_data);
console.log("Tier 1 result:", lowestLocation);