"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const MusicCommandManager_1 = require("./classes/managers/MusicCommandManager");
const path_1 = require("path");
(0, forgescript_1.generateMetadata)((0, path_1.join)(__dirname, "natives"), "natives", MusicCommandManager_1.handlerName, true, void 0, (0, path_1.join)(__dirname, "events"))
    .then(() => forgescript_1.Logger.info("Documentation generation done"))
    .catch((e) => forgescript_1.Logger.error(e));
