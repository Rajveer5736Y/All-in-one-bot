export default {
      name: 'rename',

      async execute(message, args) {

            // Ignore bots
            if (message.author.bot) return;

            // Admin only
            if (!message.member.permissions.has('Administrator')) {
                  return message.reply(
                        '❌ Only administrators can use this command.'
                  );
            }

            // Check if name was provided
            if (!args.length) {
                  return message.reply(
                        '❌ Usage: !rename <new channel name>'
                  );
            }

            // Join all words into one channel name
            const newName = args.join('-').toLowerCase();

            try {

                  await message.channel.setName(newName);

                  await message.reply(
                        `✅ Channel renamed to: ${newName}`
                  );

            } catch (error) {

                  console.error(error);

                  await message.reply(
                        '❌ Failed to rename the channel.'
                  );
            }
      }
};
