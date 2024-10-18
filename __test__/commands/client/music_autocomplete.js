module.exports = {
    type: "interactionCreate",
    allowedInteractionTypes: ["autocomplete"],
    code: `
        $c[Limit the command only as autocomplete and for query option.]
        $onlyIf[$and[$isAutocomplete;$focusedOptionName==query]]

        $c[If option value is empty, do not search.]
        $if[$trim[$focusedOptionValue]==;
            $addChoice[Make a search by entering something...;none]
            $autocomplete
            $stop
        ]

        $c[Search and return track title and URL.]
        $let[query;$searchTrack[$focusedOptionValue;{track.title}|{track.url},;youtube;;20;true]]

        $c[Load the result to an array.]
        $arrayLoad[search;,;$trim[$get[query]]]

        $c[If no results, then we return an option for it.]
        $if[$arrayLength[search]==0;
            $addChoice[No results;none]
            $autocomplete
            $stop
        ]

        $c[Clean-up empty results.]
        $arrayMap[search;got;
            $if[$env[got]!=;$return[$env[got]]]
        ;depured]

        $c[Append the cleaned options to the autocomplete menu.]
        $arrayForEach[depured;result;
            $addChoice[$advancedTextSplit[$env[result];|;0];$advancedTextSplit[$env[result];|;1]]
        ]

        $c[Display the options.]
        $autocomplete
    `
}