module.exports.data = {
    name: 'play',
    description: 'Воспроизвести песню через бота.',
    type: 1,
    options: [
        {
            name: 'query',
            description: 'Название трека или url',
            type: 3,
            required: true,
            autocomplete: true
        }
    ]
}