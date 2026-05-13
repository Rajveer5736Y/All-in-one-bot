export default {
  name: 'guessthenumber',

  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return await message.reply('You need Administrator permission.');
    }

    const min = parseInt(args[0]);
    const max = parseInt(args[1]);

    if (isNaN(min) || isNaN(max)) {
      return await message.reply(
        'Usage: !guessthenumber <min> <max>'
      );
    }

    if (min >= max) {
      return await message.reply(
        'Minimum number must be smaller than maximum number.'
      );
    }

    const winningNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;
    try {
        await message.author.send(
        `🎯 The chosen number is: ${chosenNumber}`
        );
    } catch (err) {
        await message.reply(
        '❌ I could not DM you. Please enable DMs and try again.'
        );
        return;
    }

    const channel = message.channel;

    // Unlock channel
    await channel.permissionOverwrites.edit(
      message.guild.roles.everyone,
      {
        SendMessages: true,
      }
    );

    await channel.send(
      `🎲 Guess the number between **${min}** and **${max}**`
    );

    const filter = (msg) => {
      if (msg.author.bot) return false;

      const guessedNumber = parseInt(msg.content);

      return guessedNumber === winningNumber;
    };

    const collector = channel.createMessageCollector({
      filter,
      time: 1200000, // 5 minutes
    });

    collector.on('collect', async (msg) => {
      try {
        // Lock channel
        await channel.permissionOverwrites.edit(
          message.guild.roles.everyone,
          {
            SendMessages: false,
          }
        );

        // React to winning message
        await msg.react('✅');

        await channel.send(
          `🎉 ${msg.author} won! The number was **${winningNumber}**`
        );

        collector.stop();
      } catch (error) {
        console.error(error);
      }
    });

    collector.on('end', async (_, reason) => {
      if (reason === 'time') {
        await channel.send(
          `⏰ Time ended! The number was **${winningNumber}**`
        );

        await channel.permissionOverwrites.edit(
          message.guild.roles.everyone,
          {
            SendMessages: false,
          }
        );
      }
    });
  },
};
