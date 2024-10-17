const { GuildQueueEvent } = require('../../../dist')

module.exports = [{
    type: GuildQueueEvent.Connection,
    code: "$!sendMessage[$env[queue;metadata;text;id];Established a connection with <#$env[queue;channel;id]>]"
},{
    type: GuildQueueEvent.ConnectionDestroyed,
    code: "$!sendMessage[$env[queue;metadata;text;id];Connection with voice channel was forcefully destroyed.]"
},{
    type: GuildQueueEvent.AudioTrackAdd,
    code: "$!sendMessage[$env[queue;metadata;text;id];The track $bold[\"$env[track;title]\"] was added to the queue.]"
},{
    type: GuildQueueEvent.AudioTracksAdd,
    code: `
        $jsonLoad[tracks;$env[tracks]]

        $arrayMap[tracks;track;
            $return[$env[track;title]]
        ;mappedTracks]

        $!sendMessage[$queue[metadata;text;id];
            $title[Multiple tracks were added to the queue]
            $description[$arrayJoin[mappedTracks;\n]]
            $color[Greem]
        ]
    `
}]