/*web-server
const http = require('http');
http.createServer(function(req, res) {
res.write("online");
res.end();
}).listen(8080);
*/
let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'UTF-8', (error, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
});

server.listen(3000);
console.log('Start Server!');

//start
const { Client, GatewayIntentBits, Partials, Events} = require('discord.js');
require("dotenv").config()

//file load
const pingFile = require('./commands/ping.js');

//discord.js check
if(Client){
  console.log("file access ok");
  console.log("discord.js access ok")
}else{
  console.log("failure")
};

//待機
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time*1000));//timeはミリ秒

//discord.js setting
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    //GatewayIntentBits.GuildBans,
    //GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
}); //clientインスタンスを作成する

console.log("client access ok");

//discord command
client.on('messageCreate', message => {
  if (message.mentions.users.has(client.user.id)) {
    message.reply('呼びましたか？')
  }
});

//slash command
client.on(Events.InteractionCreate, async interaction => {
  //slashに対する処理
  if (!interaction.isChatInputCommand()) return;
  // pingコマンドに対する処理
  if (interaction.commandName === pingFile.data.name) {
    try {
      await pingFile.execute(interaction);
    } catch (error) {
        console.error(error);
      }
  }
})


console.log("discord login access ok")
//discord login
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})


client.login(process.env.token);

console.log("login ok");
console.log("All complete");
console.log("discord-app start");
console.log("mention app start")
console.log("Success");
