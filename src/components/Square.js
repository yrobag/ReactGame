import React from 'react';


class Square extends React.Component {

    constructor(){
        super();
    }


    render() {

        let filed ='empty square';

        if(this.props.isPlayer){
            filed = 'player square'
        }else if(this.props.isEnemy){
            filed = 'enemy square'
        }

        return(
            <div className={filed}>

            </div>
        );
    }

}

export default Square;

