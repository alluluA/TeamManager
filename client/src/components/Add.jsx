import React,{ useState} from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Add = props => {
    const [name, setName] = useState('');
    const [pref, setPref] = useState('');
    const [valid, setValid] = useState(false);
    const [errors, setErrors] = useState({});

    const create = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/new',{
            name,
            pref,
        })
        .then(res => {
            console.log('Response: ',res)
            if(res.data.error){
                setErrors(res.data.error.errors)
            }else{
                home();
            }
        })
        .catch(err => {
            console.log('Error: ',err)}) 
    }
    const home = ()=>{
        setName('');
        navigate('/players/list');
    }
    const validate = e =>{
        setName( e.target.value );
        (e.target.value.length >= 2) ? setValid(true) : setErrors({name: 'Name should be at least 2 characters'})
    }

    return (
        <div className='container m-2'>
            <h3><a href="/players/list">List</a> | <a href="/status/game/1">Add Player</a></h3>
            <div className="card my-3">
            <div className="card-body">
                <h3>Add Player</h3>
            <form onSubmit={create} className='px-5'>
                <div className="form-group row">
                    <label className="col-4 col-form-label">Player Name: </label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control"  onChange={ e => validate(e) } value={ name }/>
                        <p className='text-danger'>{errors.name? errors.name.message : ''}</p>
                </div>
                </div>
                <div className="form-group row">
                    <label className="col-4 col-form-label">Preferred Position: </label>
                    <div className="col-sm-6">
                        <input type="text"  className="form-control"  onChange={ e => setPref( e.target.value ) } value={ pref }/>
                        {/* <p className='text-danger'>{errors.name? errors.name.message : ''}</p> */}
                </div>
                </div>
                <div className="form-group row">
                    <p className="col-4"></p>
                    <div className="col-sm-6 d-flex justify-content-between">
                    { valid ?  
                        <input className="btn btn-dark m-1" type="submit" value="Add" />
                        : 
                        <input className="btn btn-outline-dark m-1" type="submit" value="Add" disabled />
                        }
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Add;
