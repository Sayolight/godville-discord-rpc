const http = require('http');
const RPC = require('discord-rich-presence')('740452515555966997');
const fs = require('fs');

let readfile = fs.readFileSync('config.json');
let config = JSON.parse(readfile);

// get godville info

function update() {
    let req = http.get(`http://godville.net/gods/api/${config['godname']}/${config['token']}`, function (res) {
        let data = '',
            gvdata;

        res.on('data', function (stream) {
            data += stream;
        });
        res.on('end', function () {
            gvdata = JSON.parse(data);
            RPC.updatePresence({
                details: `Дневник героя:`,
                state: gvdata['diary_last'],
                largeImageKey: 'godville_logo',
                largeImageText: 'Годвилль',
                smallImageKey: 'info',
                smallImageText: 'Бог ' + gvdata['godname'] + ' и его славный герой ' + gvdata['name'],
                instance: false,
            });

        });
    });

    req.on('error', function (e) {
        console.log(e.message);
    });
}
update();
setInterval(update, 61000);