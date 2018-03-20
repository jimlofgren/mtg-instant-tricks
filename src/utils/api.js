const mtg = require('mtgsdk')

module.exports = {
    fetchCards: function (color) {
        return Promise.all([
                                mtg.card.where({  set: 'rix',
                                 colors: color,
                                 text: 'Flash' }),
                                mtg.card.where({  set: 'rix',
                                 colors: color,
                                 type: 'Instant' })
                                ])

            .then(cards => {
                var concatinatedCards = cards[0].concat(cards[1]);
                var sortedCards = concatinatedCards.sort(function(a, b) {
                                                    return a.cmc - b.cmc
                                                });
                return sortedCards
            })
    }
};