require("dotenv").config();

// connect to client
const Discord = require("discord.js");
const client = new Discord.Client();
const guildId = "814000807824850955";
const token = process.env.TOKEN;

// setup function to return app/bot access
const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

// start client
client.on("ready", async () => {
  console.info("Bot ready");

  // import commands to guild and console log the array
  const commands = await getApp(guildId).commands.get();
  console.log(commands);

  // post sample command
  await getApp(guildId).commands.post({
    data: {
      name: "ping",
      description: "A simple ping pong command",
    },
  });

  // create websocket to listen for event
  // pulls from posted command (data.name.toLowerCase); in this case, ping
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();

    if (command === "ping") {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content: "Pong",
          },
        },
      });
    }
  });
});

client.login(token);
