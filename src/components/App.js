var React = require('react');
var Instants = require('./Instants')

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Instants />
            </div>
        );
    }
}

module.exports = App;