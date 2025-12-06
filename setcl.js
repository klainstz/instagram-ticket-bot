
const fs = require("fs");

module.exports = {
    name: "setcl",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first();
        if (!role) return message.reply("Marque o cargo: `!setcl @cargo`");

        const db = { allowedRole: role.id };
        fs.writeFileSync("cl.json", JSON.stringify(db, null, 2));

        message.reply(`Cargo **${role.name}** agora pode usar \`cl\`.`);
    }
};
