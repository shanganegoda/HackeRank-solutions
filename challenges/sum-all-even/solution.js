'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function flatten(items) {
  const flat = [];

  items.forEach(item => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
}

/*
 * Complete the clearJunk function below.
 */
function sumAllEven(list) {
  var normalizeList = flatten(list);

  var oddNumbers = normalizeList.filter(value => value % 2 === 0);

  if (!oddNumbers) {
    return 0;
  }

  var onlyNumbers = oddNumbers.map(x => {
    var numero = parseInt(x);
    if (Number.isNaN(numero)) numero = 0;
    return numero;
  });

  var sumNumbers = onlyNumbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  return sumNumbers;
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const data = readLine();
  const res = sumAllEven(JSON.parse(data));

  ws.write(res + '\n');
  ws.end();
}
