const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong!と反応してくれます'),
  execute: async function(interaction) {
    await interaction.reply('pong!');
  },
};