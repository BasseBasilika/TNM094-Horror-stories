//The test to find if a keyword could be recognised 

const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'test.txt');
const outputPath = path.join(__dirname, 'output.txt');

//läs in filen 
fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //sätt ett keyword som ska hittas
    const keyword = "han"

    //gör allt till lowercase så att Han == han kan jämföras
    const lowerText = data.toLowerCase();

    //alla ord för sig () runt gör att dom behålls så när man sen gör
    //join so blir det inte konsigt 
    const split = lowerText.split(/([\r\n. ]+)/);
    console.log(split)


    //gå igenom alla ord var och en och se om det matchar keyword
    for (let i = 0; i < split.length; i++) {
        if (split[i] == keyword) {
            split[i] = keyword.toUpperCase();
        }
    }

    //skriv tillbaka texten som den var innan
    const join = split.join("");

    const result = join.replace(/(^\w|(?<=\.\s*)\w)/g, (char) =>
    char.toUpperCase()
);

    //skriv allt till output filen
    fs.writeFile(outputPath, result, (err) => {
        if (err) {
            console.error(err)
            return;
        }
        console.log("lowercase!")
    })
});