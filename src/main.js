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

    client.on('interactionCreate', async (interaction) => {
        // console.log(interaction.isButton());
        try {
            // if (!interaction.isChatInputCommand()) return;

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
            } else if (interaction.commandName == 'sum') {
                const num1 = interaction.options.get('number-1');
                const num2 = interaction.options.get('number-2');

                const result = num1.value + num2.value;
                interaction.reply(`The sum of ${num1.value} and ${num2.value} is ${result}`);
            } else if (interaction.isButton()) {
                await interaction.deferReply({ephemeral: true});
  
                const role = interaction.guild.roles.cache.get(interaction.customId);
                if (!role) {
                    interaction.editReply({
                        content: 'Role not found',
                    });
                    return
                }

                const hasRole = interaction.member.roles.cache.has(role.id);
                if (hasRole) {
                    await interaction.member.roles.remove(role);
                    await interaction.editReply(`The role ${role} removed`);
                    return;
                }

                await interaction.member.roles.add(role);
                await interaction.editReply(`The role ${role} has been added.`);
            } else {
                interaction.reply('Interaction not found');
            }
        } catch (e) {
            console.log(e);
        }
    });