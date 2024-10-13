import { NodeResolvable, useQueue } from "discord-player"

export default function(node: NodeResolvable) {
    return useQueue(node).node
}