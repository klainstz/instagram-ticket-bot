
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// carregar comandos
const commandsPath = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsPath)) {
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
}

// handler mensagem
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    // comando "cl" SEM prefixo
    if (message.content.trim().toLowerCase() === "cl") {
        const db = JSON.parse(fs.readFileSync("cl.json","utf8"));
        const allowedRole = db.allowedRole;
        if (!allowedRole) return message.reply("Nenhum cargo configurado para CL.");

        if (!message.member.roles.cache.has(allowedRole))
            return message.reply("Você não tem permissão para usar **cl**.");

        const channel = message.channel;
        const msgs = await channel.messages.fetch({ limit: 50 });
        channel.bulkDelete(msgs);

        return;
    }

    // comando com prefixo
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName);
    if (!cmd) return;

    cmd.run(client, message, args);
});

// iniciar bot
client.on("ready",()=>console.log(`Bot online como ${client.user.tag}`));
client.login(config.token);
