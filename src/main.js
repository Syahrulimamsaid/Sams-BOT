const {
    Client,
    IntentsBitField
} = require('discord.js');
require("dotenv").config();


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.login(process.env.DISCORD_TOKEN);

client.on('clientReady', () => {
    console.log(`Success Login.`);
});

client.on('messageCreate', msg => {
    console.log(msg);
});