require("dotenv").config();

// setup bot
const Discord = require("discord.js");
const bot = new Discord.Client();

// import bot commands
bot.commands = new Discord.Collection();
const botCommands = require("./commands");

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

// connect to client with token
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply("There was an error trying to execute that command");
  }
});
