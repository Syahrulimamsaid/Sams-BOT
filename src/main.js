    const {
        Client,
        IntentsBitField,
        EmbedBuilder,
        Embed
    } = require('discord.js');
    require("dotenv").config();
    const Reply = require('./model/Reply');

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

    client.on('messageCreate', message => {
        const reply = new Reply(message);
        reply.getReply();
    });

    client.on('interactionCreate', interaction => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'ping') {
            interaction.reply('Pong!');
        } else if (interaction.commandName === 'hey') {
            interaction.reply('Hey there!');
        } else if (interaction.commandName === 'kata-kata') {
            interaction.reply('Ini adalah kata - kata dari padhee.');
        } else if (interaction.commandName === 'embed') {
            let status;
            const time = new Date().getHours();
            if (time >= 0 && time < 12) {
                status = 'Morning';
            } else if (time >= 12 && time < 18) {
                status = 'Afternoon';
            } else {
                status = 'Evening';
            }
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Good ${status}`).setDescription('Have a nice day!').setFields({
                    name: 'Tugas Hari Ini',
                    value: '1. Belajar\n2. Bekerja\n3. Istirahat',
                    inline: true
                }, {
                    name: 'Tugas Besok',
                    value: '1. Belajar\n2. Bekerja\n3. Istirahat',
                    inline: true
                });

            interaction.reply({
                embeds: [embed]
            });
        }

    });