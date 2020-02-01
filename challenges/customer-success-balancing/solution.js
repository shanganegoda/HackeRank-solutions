'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the csRush function below.
function csRush(n, m, css, customers, vacant_css) {
    // Filtro dos CSs que não estão de férias
    let cssTrabalhando = css.filter(item => !vacant_css.includes(item[0]));

    // Ordena de forma ascendente os CSs pelo nível de experiência
    cssTrabalhando.sort((a, b) => {
        return a[1] - b[1]
    })

    // Calcula a quantidade de clientes que cada CSs pode atender e
    // adiciona array
    customers.forEach(customer => {
        for (let index = 0; index < cssTrabalhando.length; index++){
            //incrementa o cliente
            if (cssTrabalhando[index][1] >= customer[1]) {
                if (!cssTrabalhando[index][2]) {
                    cssTrabalhando[index].push(1);
                    break;
                }
                cssTrabalhando[index][2] += 1;
                break;
            }
        }
    })

    // Realiza a troca de posição para achar o maior peso ordenando o resultado
    for (let index = 0; index < cssTrabalhando.length - 1; index++) {
        if (cssTrabalhando[index][2] > cssTrabalhando[index + 1][2] || 
            !cssTrabalhando[index + 1][2]) {
            let aux = cssTrabalhando[index + 1];
            cssTrabalhando[index + 1] = cssTrabalhando[index];
            cssTrabalhando[index] = aux;
        }
    }

    // Retorna o id do CS caso seja o único trabalhando
    if (cssTrabalhando.length == 1) {
        return cssTrabalhando[cssTrabalhando.length - 1][0];
    }

    // Retorna 0 caso o peso dos últimos CSs trabalhando sejam iguais
    if (cssTrabalhando[cssTrabalhando.length - 1][2] == 
        cssTrabalhando[cssTrabalhando.length - 2][2]) {
        return 0;
    }

    // Retorna o CSs trabalhando com a maior quantidade de clientes a atender
    return cssTrabalhando[cssTrabalhando.length-1][0];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let css = Array(n);

    for (let i = 0; i < n; i++) {
        css[i] = readLine().replace(/\s+$/g, '').split(' ').map(cssTemp => parseInt(cssTemp, 10));
    }

    const m = parseInt(readLine().trim(), 10);

    let customers = Array(m);

    for (let i = 0; i < m; i++) {
        customers[i] = readLine().replace(/\s+$/g, '').split(' ').map(customersTemp => parseInt(customersTemp, 10));
    }

    const vacant_cssCount = parseInt(readLine().trim(), 10);

    const vacant_css = readLine().replace(/\s+$/g, '').split(' ').map(vacant_cssTemp => parseInt(vacant_cssTemp, 10));

    const cs_distribution = csRush(n, m, css, customers, vacant_css);

    ws.write(cs_distribution + '\n');

    ws.end();
}
