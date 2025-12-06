
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "insta",
    run: async (client, message, args) => {

        if (!args[0] || args[0].toLowerCase() !== "painel")
            return message.reply("Use: `!insta painel`");

        const canal = message.guild.channels.cache.get(config.painelChannel);
        if (!canal) return message.reply("Canal do painel inválido.");

        const embed = new EmbedBuilder()
            .setTitle("Painel Instagram")
            .setDescription("Like: <:Like_tinder:1445271822416351305> / Dislike: <:X_tinder:1445272569799508099> / SuperLike: <:Superlike_tinder:1445272541504606238>")
            .setColor("Purple");

        const btn = new ButtonBuilder()
            .setCustomId("insta_open")
            .setEmoji("<:insta2:1446946981644730581>")
            .setLabel("Solicite seu ticket!")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(btn);
        canal.send({ embeds: [embed], components: [row] });

        message.reply("Painel enviado.");
    }
};
