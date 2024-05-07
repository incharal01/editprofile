import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () =>{
    const[users,setUsers] = useState([]);
    const[index,setIndex] = useState(0);

    useEffect(()=>{
        axios.get('http://localhost:3001/user')
        .then((res)=>setUsers(res.data))
        .catch(err => console.log(err));
    },[]);

    const handleClick = () =>{
        setIndex(()=> Math.floor(Math.random()*users.length));
    }
    return(
        <>
            <div className='container-fluid'>
                <h1>User Profile</h1>
                <div className='row'>
                    {(users.length>0) && 
                        (            
                            <div className='col-lg-8'>
                                <div className='card'>
                                    <div className='image'>
                                        <img src={users[index].url} alt={users[index].name}/>
                                        <button className='btn btn-dark' id='btn' onClick={handleClick}>Random Profile</button>
                                    </div>
                                    <div className='card-content'>
                                        <h4 >{users[index].name}</h4>
                                        <h5>{users[index].username}</h5>
                                        <h5>{users[index].email}</h5>
                                        <h5>{users[index].phone}</h5>
                                        <Link to={`/edit/${users[index].id}`} className='btn btn-secondary' id='editbtn'>Edit</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>    
        </>
    );
}

export default Home;