import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = props => {
    const [players, setPlayers]  = useState([]);

    useEffect(()=>{
        getAll();
    }, [])
    console.log(players);
    
    const getAll =() =>{
        axios.get('http://localhost:8000/api/')
    .then(res => {
        setPlayers(res.data.Players) 
        console.log('res: ', res)})
    .catch(err => console.log('Error: ', err))
    }

    const updateState = (player, status) =>{
        let state = status;
        axios.put(`http://localhost:8000/api/edit/${player._id}`,{
            state
        })
        .then(res =>{console.log('Response: ',res )
        getAll();
    })
        .catch(err => console.log('Error: ',err)) 

    }

    return (
        <div>
            <div className="container">
                <h1>Player Status - Game {props.id}</h1>
                <h3><a href="/players/list">List</a> | <a href="/players/addplayer">Add Player</a></h3>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col bg-info">Team Name</th>
                    <th scope="col table-success">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                players.map((player, i) =>{
                    return(
                        <tr>
                            <td >{ player.name }</td>
                            <td className='d-flex flex-row justify-content-between btn-group-justified custom-class'>{
                                player.state === 'playing'? <button className='btn btn-success btn-block'>Playing</button> : <button className='btn btn-light btn-block' onClick ={()=>{ updateState(player, 'playing')}}>Playing</button>
                                }
                                {
                                player.state === 'notplaying'? <button className='btn btn-danger btn-block'>Not Playing</button> : <button className='btn btn-light btn-block' onClick ={()=>{ updateState(player, 'notplaying')}}>Not Playing</button>
                                }
                                {
                                player.state === 'undecided'? <button className='btn btn-warning btn-block'>Undecided</button> : <button className='btn btn-light btn-block' onClick ={()=>{ updateState(player, 'undecided')}}>Undecided</button>
                                }
                                </td>
                        </tr>
                    )
                }) }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Game;
