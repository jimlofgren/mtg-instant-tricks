var React = require('react');
var api = require('../utils/api');

function SelectColor (props) {
    var colors = [{id: 'w', name: 'white'},
                  {id: 'u', name: 'blue'},
                  {id: 'b', name: 'black'},
                  {id: 'r', name: 'red'},
                  {id: 'g', name: 'green'}]
    return (
        <ul className='colors'>
            {colors.map(function (color) {
                return (
                    <li
                        onClick={props.onSelect.bind(null, color.name)}
                        key={color.name}>
                        <i 
                            className={'ms ms-2x ms-cost ms-' + color.id}
                            style={color.name !== props.selectedColor ? {color: 'gray'} : null}>
                        </i>
                    </li>
                )
            })}
        </ul>
    )
}

function CardGrid (props) {
    console.log({props})
    return (
        <ul className='cards'>
            {props.cards.map(function (card, index) {
                return (
                    <li key={card.name} className='card'>
                        <img src={card.imageUrl} alt={card.name + ' ' + card.originalText} />
                    </li>
                )
            })}
        </ul>    
    )
}

function SelectExpansion (props) {
    var expansions = [{id: 'rix', name: 'Rivals of Ixalan'},
                      {id: 'dom', name: 'Dominaria'}];
    return (
        <ul className='expansions'>
            {expansions.map(function (expansion) {
                return (
                    <li 
                        key={expansion.name} 
                        onClick={props.onSelect.bind(null, expansion.id)}>
                        <i 
                            className={'ss ss-2x ss-' + expansion.id} 
                            style={expansion.id !== props.selectedExpansion ? {color: 'gray'} : null}>
                        </i>
                    </li>
                )
            })}
        </ul>
    )
}

function LoadingScreen (props) {
    return (
        <div className='loading'>Loading...</div>
    )
}

class Instants extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedColor: null,
            cards: null,
            selectedExpansion: 'rix'
        };

        this.updateColor = this.updateColor.bind(this);
        this.updateExpansion = this.updateExpansion.bind(this);
    }

    componentDidMount() {
        this.updateColor(this.state.selectedColor, this.state.selectedExpansion)
    }

    updateColor(color) {
        this.setState(function () {
            return {
                selectedColor: color,
                selectedExpansion: this.state.selectedExpansion,
                cards: null
            }
        });

        api.fetchCards(color, this.state.selectedExpansion)
            .then(function (cards) {
                this.setState(function () {
                    return {
                        cards: cards
                    }
                });
            }.bind(this));
    }

    updateExpansion(expansion) {
        this.setState(function () {
            return {
                selectedColor: null,
                selectedExpansion: expansion,
                cards: null
            }
        });

        api.fetchCards(null, expansion)
            .then(function (cards) {
                this.setState(function () {
                    return {
                        cards: cards
                    }
                });
            }.bind(this));
    }

    render() {
        return (
            <div>
                <SelectExpansion 
                    selectedExpansion={this.state.selectedExpansion}
                    onSelect={this.updateExpansion} />
                <SelectColor
                    selectedColor={this.state.selectedColor}
                    onSelect={this.updateColor} />
                {!this.state.cards ? <LoadingScreen /> : <CardGrid cards={this.state.cards} />}
            </div>
        )
    }
}

module.exports = Instants;
