  const {
      REST,
      Routes,
      ApplicationCommandOptionType
  } = require('discord.js');
  require("dotenv").config();

  const commands = [{
      name: 'sum',
      description: 'Sum two numbers',
      options: [{
          name: 'number-1',
          description: 'Input number 1',
          type: ApplicationCommandOptionType.Number,
          required: true,
          choices: [{
              name: '1',
              value: 1
          }, {
              name: '2',
              value: 2
          }, {
              name: '3',
              value: 3
          }]
      }, {
          name: 'number-2',
          description: 'Input number 2',
          type: ApplicationCommandOptionType.Number,
          required: true,
          choices: [{
              name: '1',
              value: 1
          }, {
              name: '2',
              value: 2
          }, {
              name: '3',
              value: 3
          }]
      }]
  }];

  const rest = new REST({
      version: '10'
  }).setToken(process.env.DISCORD_TOKEN);

  (async () => {
      try {
          await rest.put(
              Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
                  body: commands
              }
          );

          console.log('Successfully registered application commands.');
      } catch (error) {
          console.error(error)
      }
  })();