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
                            style={color.name === props.selectedColor ? {border: '1px solid black'} : null}>
                        </i>
                    </li>
                )
            })}
        </ul>
    )
}

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
                {!this.state.cards ? <LoadingScreen /> : <CardGrid cards={this.state.cards} />}
            </div>
        )
    }
}

module.exports = Instants;
