import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseChannel, VoiceBasedChannel } from "discord.js"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$voiceConnect",
    description: "Creates a voice connection between the client and a voice channel.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "The voice channel ID to create the connection with.",
            type: ArgType.Channel,
            required: true,
            rest: false,
            check: (c: BaseChannel) => c.isVoiceBased()
        },
        Arg.optionalBoolean("Deaf", "Whether deaf the client when it joins the voice channel."),
        Arg.optionalBoolean("Mute", "Whether mute the client when it joins the voice channel.")
    ],
    output: ArgType.Boolean,
    async execute(ctx, [voiceChannel, deaf, mute]) {
        const manager = getInstance(ctx.client)
        const voice = manager.voices.create(<VoiceBasedChannel>voiceChannel)
        
        voice.voiceState.setDeaf(deaf)
        voice.voiceState.setMute(mute)
        await voice.join(<VoiceBasedChannel>voiceChannel)
        
        return this.success(manager.voices.has(ctx.guild))
    }
})