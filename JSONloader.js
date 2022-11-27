const jsonfile = require('./bin/sitios.json');
const mongoose = require('mongoose');
const Site = require('./models/site.model.js');
require('./config/db.config')



const util = require('util');
const timer = util.promisify(setTimeout);

async function main() {

    for (let i = 0; i < jsonfile.length; i++) {
        console.log(jsonfile[i]);
        const site = new Site(jsonfile[i]);
        await timer(300);
        await site.save()
        .then(site => console.log(site))
        .catch(error => console.log(error));

        
    }
    console.log('Done');
}

main();