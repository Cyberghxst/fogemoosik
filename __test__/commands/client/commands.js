module.exports = [{
    name: "play",
    type: "messageCreate",
    code: `
        $c[Checking if the message author is connected to a voice channel.]
        $if[$voiceID[$guildID;$authorID]==;
            $!sendMessage[$channelID;You must be connected to a voice channel.]
            $stop
        ]

        $c[Checking if client and message author are in the same channel.]
        $if[$and[$voiceID[$guildID;$authorID]!=;$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $!sendMessage[$channelID;You must be connected to my voice channel.]
            $stop
        ]

        $c[Checking if message has arguments.]
        $if[$message==;
            $!sendMessage[$channelID;You must provide a song name.]
            $stop
        ]

        $c[Trying to play the track.]
        $#playTrack[$voiceID[$guildID;$authorID];$message]
    `
},{
    name: "stop",
    type: "messageCreate",
    code: `
        $c[Checking if the message author is connected to a voice channel.]
        $if[$voiceID[$guildID;$authorID]==;
            $!sendMessage[$channelID;You must be connected to a voice channel.]
            $stop
        ]

        $c[Checking if client and message author are in the same channel.]
        $if[$and[$voiceID[$guildID;$authorID]!=;$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $!sendMessage[$channelID;You must be connected to my voice channel.]
            $stop
        ]

        $c[Stop the track only if is playing.]
        $if[$isPlaying;$!stopTrack]
    `
},{
    name: "skip",
    type: "messageCreate",
    code: `
        $c[Checking if the message author is connected to a voice channel.]
        $if[$voiceID[$guildID;$authorID]==;
            $!sendMessage[$channelID;You must be connected to a voice channel.]
            $stop
        ]

        $c[Checking if client and message author are in the same channel.]
        $if[$and[$voiceID[$guildID;$authorID]!=;$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $!sendMessage[$channelID;You must be connected to my voice channel.]
            $stop
        ]

        $c[Skip the track only if is playing.]
        $if[$isPlaying;$!skipTrack]
    `
},{
    name: "search",
    type: "messageCreate",
    code: `
        $c[Checking if the message author is connected to a voice channel.]
        $if[$voiceID[$guildID;$authorID]==;
            $!sendMessage[$channelID;You must be connected to a voice channel.]
            $stop
        ]

        $c[Checking if client and message author are in the same channel.]
        $if[$and[$voiceID[$guildID;$authorID]!=;$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $!sendMessage[$channelID;You must be connected to my voice channel.]
            $stop
        ]

        $c[Checking if message has arguments.]
        $if[$message==;
            $!sendMessage[$channelID;You must provide a song name.]
            $stop
        ]

        $c[Making the search.]
        $arrayLoad[results;,;$trim[$searchTrack[$message;{track.url}|{position}.- **{track.title}** by *{track.author}*;auto;YOUTUBE;3;true]]]

        $c[Checking if there are any results.]
        $if[$arrayLength[results]==0;
            $!sendMessage[$channelID;There are no results for: $bold["$message"]]
            $stop
        ]

        $c[Mapping the results.]
        $arrayMap[results;text;
            $return[[$advancedTextSplit[$env[text];|;1]\\]($advancedTextSplit[$env[text];|;0])]
        ;new_results]

        $c[Sending a message with the results.]
        $!sendMessage[$channelID;
            $title[Search Results]
            $description[$arrayJoin[new_results;\n]]
            $color[Green]
        ]
    `
},{
    name: "queue",
    type: "messageCreate",
    code: `
        $c[Checking if the message author is connected to a voice channel.]
        $if[$voiceID[$guildID;$authorID]==;
            $!sendMessage[$channelID;You must be connected to a voice channel.]
            $stop
        ]

        $c[Checking if client and message author are in the same channel.]
        $if[$and[$voiceID[$guildID;$authorID]!=;$voiceID[$guildID;$clientID]!=;$voiceID[$guildID;$authorID]!=$voiceID[$guildID;$clientID]];
            $!sendMessage[$channelID;You must be connected to my voice channel.]
            $stop
        ]

        $c[Sending the queue.]
        $!sendMessage[$channelID;$if[$queueLength==0;No tracks in the queue.;
            $title[Guild Queue]
            $description[$queue]
            $color[Green]
        ]]
    `
},{
    type: "ready",
    code: `
        $c[Ready message.]
        $log[Client is connected and ready to be used.]

        $c[Log system resource usage.]
        $setInterval[
            $logger[Info;CURRENT_CPU_USAGE: $cpu]
            $logger[Info;CURRENT_RAM_USAGE: $ram MB]
        ;30s]
    `
},{
    name: "ping",
    type: "messageCreate",
    code: "$!sendMessage[$channelID;Poing!]"
}]