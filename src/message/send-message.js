    const {
        Client,
        IntentsBitField,
        EmbedBuilder,
        Embed,
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle
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

    const roles = [{
        id: '1422938289593253928',
        label: 'Pro'
    }, {
        id: '1422938359889657926',
        label: 'Member'
    }, {
        id: '1422938436033187963',
        label: 'Newbie'
    }, ]

    client.login(process.env.DISCORD_TOKEN);

    client.on('clientReady', async (c) => {
        try {
            const channel = await client.channels.cache.get(process.env.GUILD_ID);

            if (!channel) return;

            const row = new ActionRowBuilder();

            roles.forEach((role) => {
                row.components.push(new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary));
            });

            await channel.send({
                content: 'Check your role',
                components: [row]
            });


        } catch (e) {
            console.log(e);
        }

    });