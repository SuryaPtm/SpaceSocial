const { white, green } = require("chalk");
const { readdirSync } = require('fs');

module.exports = async (client) => {
    const loadcommand = dirs =>{
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            const eName = file.split('.')[0];
            if (dirs = "rest")
                client.rest.on(eName, evt.bind(null, client));
            else if (eName = "ready")
                client.once(eName, evt.bind(null, client));
            else
                client.on(eName, evt.bind(null, client));
        }
    };
    ["client", "guild", "rest"].forEach((x) => loadcommand(x));
    console.log(white('[') + green('INFO') + white('] ') + green('Event ') + white('Events') + green(' Loaded!'));
};