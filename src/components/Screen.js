import React from 'react';


class Screen extends React.Component {

    render() {
        let time = Math.floor(this.props.time);
        return(
            <div className="screen">
                <div className="screen_value_wrapper">
                    SCORE: <span className="screen_value">{this.props.score}</span>
                </div>
                <div className="screen_value_wrapper">
                    TIME: <span className="screen_value">{time}</span>
                </div>
            </div>
        );
    }

}

export default Screen;

