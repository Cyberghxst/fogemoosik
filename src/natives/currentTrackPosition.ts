import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$currentTrackPosition",
    version: "1.0.0",
    description: "Returns the position of the current audio track.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(getNode(ctx.guild).getTrackPosition(useQueue(ctx.guild).currentTrack))
    }
})