var React = require('react');
var api = require('../utils/api');

function SelectColor (props) {
    var colors = ['white', 'blue', 'black', 'red', 'green']
    return (
        <ul className='colors'>
            {colors.map(function (color) {
                return (
                    <li
                        style={color === props.selectedColor ? {color: '#c0ffee'} : null}
                        onClick={props.onSelect.bind(null, color)}
                        key={color}>
                        {color}
                    </li>
                )
            })}
        </ul>
    )
}

// SelectColor should be able to set multiple colors
// colors should be images instead of text

function CardGrid (props) {
    return (
        <ul className='cards'>
            {props.cards.map(function (card, index) {
                return (
                    <li key={card.name} className='card'>
                        <img src={card.imageUrl} alt={'image for ' + card.name} />
                    </li>
                )
            })}
        </ul>    
    )
}

class Instants extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectedColor: null,
            cards: null
        };

        this.updateColor = this.updateColor.bind(this);
    }

    componentDidMount() {
        this.updateColor(this.state.selectedColor)
    }

    updateColor(color) {
        this.setState(function () {
            return {
                selectedColor: color,
                cards: null
            }
        });

        api.fetchCards(color)
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
                <SelectColor
                    selectedColor={this.state.selectedColor}
                    onSelect={this.updateColor} />
                {!this.state.cards ? <p>LOADING!</p> : <CardGrid cards={this.state.cards} />}
            </div>
        )
    }
}

module.exports = Instants;
