  const {
      REST,
      Routes
  } = require('discord.js');
  require("dotenv").config();

  const commands = [{
      name: 'ping',
      description: 'Replies with Pong!'
  }, {
      name: 'hey',
      description: 'Replies with Hey there!'
  }, {
      name: 'kata-kata',
      description: 'Ini adalah kata - kata dari padhee.'
  }, {
      name: 'embed',
      description: 'This is replies with embed.'
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