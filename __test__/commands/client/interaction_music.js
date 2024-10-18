module.exports = [{
    allowedInteractionTypes: ['slash'],
    type: 'interactionCreate',
    code: `
        $if[$and[$isAutocomplete==false;$commandName==play];
            $playTrack[$voiceID[$guildID;$authorID];$option[query]]
        ]
    `
}]