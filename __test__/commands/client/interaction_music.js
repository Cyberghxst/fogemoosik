module.exports = [{
    allowedInteractionTypes: ['slashCommand'],
    type: 'interactionCreate',
    code: `
        $if[$commandName==play;
            $playTrack[$voiceID[$guildID;$authorID];$option[query]]
        ]
    `
}]