"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
function default_1(client) {
    return client.getExtension(ForgeMusic_1.ForgeMusic).distube;
}
