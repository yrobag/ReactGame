import React from 'react';


class Square extends React.Component {

    render() {

        let filed ='square';

        if(this.props.isPlayer){
            filed += ' player';
        }else if(this.props.isEnemy ){
            filed += ' enemy';
        }else{
            filed += ' empty';
        }

        return(
            <div className={filed}>
            </div>
        );
    }

}

export default Square;

