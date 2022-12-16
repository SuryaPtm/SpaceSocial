const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
    shards: 'auto',
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ]
});

client.slash = new Collection();

client.config = require("./settings/config.js");
client.ownerId = client.config.OWNER_ID;
client.developers = client.config.DEV_ID;
client.color = client.config.EMBED_COLOR;

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

["loadCommands", "loadEvents", "loadDatabases", "loadCreate", "loadAuction"].forEach(x => require(`./handlers/${x}`)(client));

client.login(process.env.TOKEN);