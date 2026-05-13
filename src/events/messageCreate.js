import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';

export default {
  name: Events.MessageCreate,

  async execute(message, client) {
    try {
      if (message.author.bot || !message.guild) return;

      // Your future message events go here

    } catch (error) {
      logger.error('Error in messageCreate event:', error);
    }
  }
};
