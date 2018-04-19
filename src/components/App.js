var React = require('react');
var ReactGA = require('react-ga')
var Instants = require('./Instants')

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            someData: null,
        };
        ReactGA.initialize('UA-117908076-1');
        ReactGA.pageview(window.location.pathname);
    };

    render() {
        return (
            <div className='container'>
                <Instants />
            </div>
        );
    }
}

module.exports = App;