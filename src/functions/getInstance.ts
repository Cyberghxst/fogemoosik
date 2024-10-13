import { ForgeMusic } from "@structures/ForgeMusic";
import { ForgeClient } from "@tryforge/forgescript";

export default function(client: ForgeClient) {
    return client.getExtension(ForgeMusic).distube
}