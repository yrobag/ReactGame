import React from 'react';
import Square from "./Square";
import Screen from "./Screen";


class Game extends React.Component {



    constructor(){
        super();

        this.state = {
            interval: null,
            time: 0,
            squares: [],
            speed: 100,
            score: 0,
            iterator: 4,
            player: 4
        };

        // this.receiveClick = this.receiveClick.bind(this);
    }

    componentWillMount(){
        let squares = [];
        for(let i = 0; i<20; i++){
            for(let j = 0;j<10;j++){
                let isPlayer = (i===19 && j===this.state.player);
                squares.push(
                    <Square isPlayer={isPlayer} isEnemy={false} y={i} x={j}/>
                )
            }
            squares.push(<br/>)
        }
        this.setState({
            squares: squares
        });



        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 37 && this.state.player >0){
                this.setState({
                    player: this.state.player-1
                })
            }
            if(e.keyCode === 39 && this.state.player <9){
                this.setState({
                    player: this.state.player+1
                })
            }
        });



        this.state.interval = setInterval(()=>{
            let score = this.state.score;
            let column;
            let iterator = this.state.iterator + 1;
            if(this.state.iterator === 4){
                column = Math.floor(Math.random() * 10);
                iterator = 0;
            }

            let oldSquares = this.state.squares;
            let newSquares = [];
            for(let i = 0; i < 10; i++){
                let isEnemy = (column === i);

                newSquares.push(
                    <Square isPlayer={false} isEnemy={isEnemy} y={0} x={i}/>
                )
            }
            newSquares.push(
                <br/>
            );
            oldSquares.forEach(oldSquare =>{
                if((oldSquare.props.y !== undefined)) {
                    if (oldSquare.props.y !== 19) {
                        let isPlayer = (oldSquare.props.y === 18 && oldSquare.props.x === this.state.player);
                        newSquares.push(
                            <Square isPlayer={isPlayer} isEnemy={oldSquare.props.isEnemy} y={oldSquare.props.y + 1}
                                    x={oldSquare.props.x}/>
                        );
                        if (oldSquare.props.x === 9) {
                            newSquares.push(
                                <br/>
                            )
                        }
                    }else{
                        if(oldSquare.props.isEnemy){
                            score += 1;
                        }
                    }
                }
            });

            this.setState({
                time: this.state.time + (this.state.speed/1000),
                squares: newSquares,
                iterator: iterator,
                score: score
            })
        },this.state.speed)
    }



    render() {
        this.state.squares.forEach(square=>{
           if(square.props.isPlayer && square.props.isEnemy){
                clearInterval(this.state.interval);
               alert('Game Over!');
           }
        });


        return(
            <div>
                <Screen time={this.state.time} score={this.state.score}/>
                <div className="container">
                    {this.state.squares}
                </div>
            </div>
        );
    }

}

export default Game;

