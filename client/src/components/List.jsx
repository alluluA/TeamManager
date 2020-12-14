import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = props => {
    const [players, setPlayers]  = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [complete, setComplete] = useState([]);
    const [inProgress, setInprogress] = useState([]);
    const [longest, setLongest] = useState(0);

    useEffect(()=>{
        getAll();
    }, [])
    console.log(players);
    
    const getAll =() =>{
        axios.get('http://localhost:8000/api/')
    .then(res => {
        console.log('completed ', res.data.Players.filter(p => p.state === 'complete'))
        setPlayers(res.data.Players) 
        console.log('res: ', res)})
    .catch(err => console.log('Error: ', err))
    }

    const updateState = project =>{
        let state = 'backlog'
        if(project.state == 'backlog'){
            state = 'inProgress';
        }else if(project.state == 'inProgress'){
            state = 'completed';
        }else{
            del(project._id);
        }
        axios.put(`http://localhost:8000/api/edit/${project._id}`,{
            state
        })
        .then(res =>{console.log('Response: ',res )
        getAll();
    } )
        .catch(err => console.log('Error: ',err)) 

    }
    const del = player =>{
        console.log('clicked');
        // let dele = confirm(`Are you sure you want to remove ${ player.name }`)
        //     if ( dele ){
            axios.delete(`http://localhost:8000/api/delete/${ player._id }`)
            .then(res => {
                console.log('res: ', res)
                getAll();
            })
            .catch(err => console.log('Error: ', err))
        // }
    }

    return (
        <div>
            <div className="container">
                <h3><a href="/players/list">List</a> | <a href="/players/addplayer">Add Player</a></h3>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col bg-info">Team Name</th>
                    <th scope="col table-warning">Preferred Position</th>
                    <th scope="col table-success">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                players.map((player, i) =>{
                    return(
                        <tr>
                            <td >{ player.name }</td>
                            <td>{ player.pref }</td>
                            <td><button className='btn btn-outline-danger btn-block' onClick={ e => del(player) }>DELETE</button></td>
                        </tr>
                    )
                }) }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default List;
