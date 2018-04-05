import React from 'react';


class Screen extends React.Component {

    constructor(){
        super();

    }




    render() {
        return(
            <div className="screen">
                <div>{this.props.score}</div>
                <div>{this.props.time}</div>
            </div>
        );
    }

}

export default Screen;

