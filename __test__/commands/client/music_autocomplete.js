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
        $let[query;$searchTrack[$focusedOptionValue;{track.title}|{track.url};;;25;true]]

        $log[RESULTS: [$focusedOptionValue\\] $get[query]]

        $c[If no results, then we return an option for it.]
        $if[$get[query]==;
            $addChoice[Make a search by entering something...;none]
            $autocomplete
            $stop
        ]

        $c[Load the result to an array.]
        $arrayLoad[search;,;$trim[$get[query]]]

        $c[Append the cleaned options to the autocomplete menu.]
        $arrayForEach[search;result;
            $addChoice[$advancedTextSplit[$env[result];|;0];$advancedTextSplit[$env[result];|;1]]
        ]

        $c[Display the options.]
        $autocomplete
    `
}