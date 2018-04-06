import React from 'react';
import Square from "./Square";
import Screen from "./Screen";


class Game extends React.Component {

    gameParams = {
        width: 10,
        height: 20,
        newEnemyInterval: 4
    };

    constructor(){
        super();

        this.state = {
            interval: null,
            time: 0,
            squares: [],
            speed: 50,
            score: 0,
            iterator: 4,
            player: 4
        };

    }

    componentWillMount(){

        this.createInitialSquares();

        this.initKeyHandlers();

        this.state.interval = setInterval(()=>{

            this.updateGame();

            this.setState({
                time: this.state.time + (this.state.speed/1000)
            })
        },this.state.speed)
    }

    createInitialSquares(){
        let squares = [];
        for(let i = 0; i<this.gameParams.height; i++){
            for(let j = 0;j<this.gameParams.width;j++){
                let isPlayer = (i===this.gameParams.height-1 && j===this.state.player);
                squares.push(
                    <Square isPlayer={isPlayer} isEnemy={false} y={i} x={j}/>
                )
            }
            squares.push(<br/>)
        }
        this.setState({
            squares: squares
        });

    }

    initKeyHandlers(){
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 37 && this.state.player >0){
                this.setState({
                    player: this.state.player-1
                })
            }
            if(e.keyCode === 39 && this.state.player <this.gameParams.width-1){
                this.setState({
                    player: this.state.player+1
                })
            }
        });
    }


    updateGame(){

        let newSquares = this.createNewFirstLine();

        let updatedSquares = this.updateSquares();

        let squares = newSquares.concat(updatedSquares);

        this.setState({
            squares: squares,
        });

    }

    createNewFirstLine(){
        let columnForNewEnemy = this.createNewEnemy();

        let newSquares = [];
        for(let i = 0; i < this.gameParams.width; i++){
            let isEnemy = (columnForNewEnemy === i);

            newSquares.push(
                <Square isPlayer={false} isEnemy={isEnemy} y={0} x={i}/>
            )
        }
        newSquares.push(
            <br/>
        );

        return newSquares;
    }

    createNewEnemy(){
        let column;
        let iterator = this.state.iterator;
        if(iterator === this.gameParams.newEnemyInterval){
            column = Math.floor(Math.random() * this.gameParams.width);
            iterator = 0
        }else{
            iterator += 1;
        }
        this.setState({
            iterator: iterator
        });

        return column;
    }
    updateSquares(){
        let updatedSquares = [];
        let oldSquares = this.state.squares;
        let score = this.state.score;
        oldSquares.forEach(oldSquare =>{
            if((oldSquare.props.y !== undefined)) {
                if (oldSquare.props.y !== this.gameParams.height-1) {

                    let isPlayer = (oldSquare.props.y === (this.gameParams.height-2) && oldSquare.props.x === this.state.player);
                    let isEnemy = oldSquare.props.isEnemy;

                    updatedSquares.push(
                        <Square isPlayer={isPlayer} isEnemy={isEnemy} y={oldSquare.props.y + 1}
                                x={oldSquare.props.x}/>
                    );
                    if (oldSquare.props.x === 9) {
                        updatedSquares.push(
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
            score: score,
        });

        return updatedSquares;

    }





    render() {
        this.state.squares.forEach(square=>{
           if(square.props.isPlayer && square.props.isEnemy){
                clearInterval(this.state.interval);
               alert(`Game Over!\nYour Score: ${this.state.score}\nTime: ${Math.floor(this.state.time)}s`);
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

