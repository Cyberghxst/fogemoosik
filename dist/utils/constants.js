"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_PATTERN = exports.FFMPEGFilters = void 0;
/**
 * The list including the names of valid filters.
 */
var FFMPEGFilters;
(function (FFMPEGFilters) {
    FFMPEGFilters["8D"] = "8D";
    FFMPEGFilters["Dim"] = "dim";
    FFMPEGFilters["Gate"] = "gate";
    FFMPEGFilters["Haas"] = "haas";
    FFMPEGFilters["Mono"] = "mono";
    FFMPEGFilters["LoFi"] = "lofi";
    FFMPEGFilters["MSTLR"] = "mstlr";
    FFMPEGFilters["MSTRR"] = "mstrr";
    FFMPEGFilters["Phase"] = "phaser";
    FFMPEGFilters["Treble"] = "treble";
    FFMPEGFilters["FadeIn"] = "fadein";
    FFMPEGFilters["Chorus"] = "chorus";
    FFMPEGFilters["Tremolo"] = "tremolo";
    FFMPEGFilters["Vibrato"] = "vibrato";
    FFMPEGFilters["Reverse"] = "reverse";
    FFMPEGFilters["Karaoke"] = "karaoke";
    FFMPEGFilters["Flanger"] = "flanger";
    FFMPEGFilters["EarRape"] = "earrape";
    FFMPEGFilters["Chorus2D"] = "chorus2d";
    FFMPEGFilters["Chorus3D"] = "chorus3d";
    FFMPEGFilters["Expander"] = "expander";
    FFMPEGFilters["Mcompand"] = "mcompand";
    FFMPEGFilters["Pulsator"] = "pulsator";
    FFMPEGFilters["Subboost"] = "subboost";
    FFMPEGFilters["Compresor"] = "compresor";
    FFMPEGFilters["BassBoost"] = "bassboost";
    FFMPEGFilters["Vaporwave"] = "vaporwave";
    FFMPEGFilters["Nightcore"] = "nightcore";
    FFMPEGFilters["Normalizer"] = "normalizer";
    FFMPEGFilters["Surrounding"] = "surrounding";
})(FFMPEGFilters || (exports.FFMPEGFilters = FFMPEGFilters = {}));
/**
 * Capture pattern for song placeholders.
 */
exports.PLACEHOLDER_PATTERN = /\{[a-zA-Z0-9._]+(?:\.[a-zA-Z0-9._]+)*\}/g;
