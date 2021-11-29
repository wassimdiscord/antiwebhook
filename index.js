const Discord = require("discord.js")
const client = new Discord.Client()

client.on("webhookUpdate", async (channel) => {

    let guild = channel.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return
    const action = await guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" }).then(async (audit) => audit.entries.first());
    if (action.executor.id === client.user.id) return;
    guild.members.cache.get(action.executor.id).kick(`Antiwebhook`).then(te => {
        const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
        channels.forEach(async channele => {
            await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerUser: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
            })
                .catch(err => { })
            channele.delete().catch(err => { })
        })
    }).catch(err => {
      
    })

}).login("token")

// by Wassim
