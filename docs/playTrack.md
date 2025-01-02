# $playTrack
Play a track by query.
## Usage
```
$playTrack[channel id,query,engine?,fallback engine?,...block extractors?]
```
## Fields
|       Name       |                                    Description                                     |  Type   | Required | Rest |
|------------------|------------------------------------------------------------------------------------|---------|----------|------|
| Channel ID       | Voice channel ID to play the track on.                                             | Channel | Yes      | No   |
| Query            | Track name to be searched.                                                         | String  | Yes      | No   |
| Engine           | The query search engine, can be extractor name to target an specific one. (custom) | String  | No       | No   |
| Fallback Engine  | Fallback search engine to use.                                                     | Enum    | No       | No   |
| Block Extractors | List of extractors to block.                                                       | String  | No       | Yes  |

View source on [GitHub](https://github.com/Cyberghxst/forgemusic/blob/dev/src/natives/playTrack.ts)