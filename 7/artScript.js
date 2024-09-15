const figlet = require('figlet');
const fs = require('fs');

// Leer el contenido del archivo txt
const text = fs.readFileSync('Command-line art.txt', 'utf8').trim();

figlet(text, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});