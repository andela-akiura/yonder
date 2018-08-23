import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Main extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = Main;
