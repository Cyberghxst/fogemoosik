import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { BaseChannel, VoiceBasedChannel } from "discord.js";
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Channel;
    required: true;
    rest: false;
    check: (c: BaseChannel) => c is VoiceBasedChannel;
}, import("@tryforge/forgescript").IArg<ArgType.Boolean, boolean, false, import("@tryforge/forgescript").EnumLike>, import("@tryforge/forgescript").IArg<ArgType.Boolean, boolean, false, import("@tryforge/forgescript").EnumLike>], true>;
export default _default;
