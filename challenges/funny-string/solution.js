'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'funnyString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function funnyString(s) {
    // Write your code here
    s = s.split("")

    let ascii_values = []
    let ascii_values_reverse = []

    let diffs = [];
    let diffs_reversed = [];

    s.forEach((ele) => {
        ascii_values.push(ele.charCodeAt(0))
    })

    ascii_values_reverse = ascii_values.map(e => e)
    ascii_values_reverse.reverse()

    for (let i = 1; i < ascii_values.length; i++) {
        diffs.push(Math.abs(ascii_values[i] - ascii_values[i - 1]));
        diffs_reversed.push(Math.abs(ascii_values_reverse[i] - ascii_values_reverse[i - 1]))
    }

    console.log(diffs)
    console.log(diffs_reversed)

    if (JSON.stringify(diffs) == JSON.stringify(diffs_reversed)) {
        return "Funny"
    } else {
        return "Not Funny"
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = funnyString(s);

        ws.write(result + '\n');
    }

    ws.end();
}
