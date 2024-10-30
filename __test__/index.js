const { ForgeMusic, GuildQueueEvent, YoutubeiExtractor } = require("../dist")
const { ForgeClient } = require("@tryforge/forgescript")
require("dotenv").config()

const music = new ForgeMusic({
    connectOptions: {
        pauseOnEmpty: false,
        leaveOnEmpty: false,
        leaveOnEnd: false,
        leaveOnStop: false
    },
    events: [
        GuildQueueEvent.AudioTrackAdd,
        GuildQueueEvent.Connection,
        GuildQueueEvent.ConnectionDestroyed,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Error
    ],
    extractorsLoadFilter: (extractor) => extractor !== "YouTubeExtractor"
})

const client = new ForgeClient({
    extensions: [
        music
    ],
    events: [
        'interactionCreate',
        "messageCreate",
        "ready"
    ],
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    token: process.env.TOKEN,
    prefixes: ["."]
})

music.player.extractors.register(YoutubeiExtractor, {})

client.applicationCommands.load('./__test__/commands/application_commands')
client.commands.load('./__test__/commands/client')
music.commands.load('./__test__/commands/music')

client.login()