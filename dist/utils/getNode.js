"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const discord_player_1 = require("discord-player");
function default_1(node) {
    return (0, discord_player_1.useQueue)(node).node;
}
