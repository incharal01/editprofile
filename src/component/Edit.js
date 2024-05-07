import React, { useEffect, useState} from 'react';
import { useParams, Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Edit.css';


const Edit = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const[data,setData] = useState({ name:'', username:'',email:'',phone:'' })
    const[formErrors,setFormErrors] = useState({name:'',username:'',email:'',phone:''});

    useEffect(()=>{
        axios.get('http://localhost:3001/user/'+ id)
        .then((res)=>setData(res.data))
        .catch(err => console.log(err));
    }, [id]);

    const validateForm = () =>{
        let valid = true;
        const newErrors = {formErrors}

        if(!data.name){
            newErrors.name = 'Name is required';
            valid=false;
        }

        if(!data.username){
            newErrors.username = 'userName is required';
            valid=false;
        }

        if(!data.email){
            newErrors.email = 'Email is required';
            valid=false;
        }else if(!/\S+@\S+\.\S+/.test(data.email)){
            newErrors.email = 'Email is invalid';
            valid=false;
        }
        
        if(!data.phone){
            newErrors.phone = 'phonenumber is required';
            valid=false;
        }else if(!/^[9]{1}[0-9]{9}$/.test(data.phone)){
            newErrors.phone='Phone number is invalid';
            valid = false
        }
        setFormErrors(newErrors);
        return valid;
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(validateForm()){
            axios.put('http://localhost:3001/user/' +id, data)
        .then(res=>{
            setData(res);
            alert("Saved Successfully");
            navigate('/');
        }).catch(err=>{console.log(err);})
        }
    }
     return(
        <div className='edit-form'>
            <div className='form-group'>
                <h2 style={{color:'black'}}>Edit User details</h2>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className='mb-2'>
                        <label htmlFor={'name'}><strong>Name: </strong></label>
                        <input type="text" id="name" placeholder='Enter Name' className='form-control' value={data.name}
                        onChange={e=>setData({...data,name:e.target.value})} />
                        {formErrors.name && <div className='text-danger'>{formErrors.name}</div>}
                    </div>
                
                    <div className='mb-2'>
                    <label htmlFor={'username'}><strong>UserName:</strong> </label>
                        <input type='text' id='username' placeholder='Enter UserName' className='form-control' value={data.username}
                        onChange={e=>setData({...data,username:e.target.value})} />
                        {formErrors.username && <div className='text-danger'>{formErrors.username}</div>}
                    </div>
                
                    <div className='mb-2'>
                    <label htmlFor={'email'}><strong>EmailId:</strong> </label> 
                        <input type='text' id='email' placeholder='Enter EmailId' className='form-control' value={data.email}
                        onChange={e=>setData({...data,email:e.target.value})} />
                        {formErrors.email && <div className='text-danger'>{formErrors.email}</div>}
                    </div>

                    <div className='mb-2'>
                    <label htmlFor={'phone'}><strong>PhoneNumber: </strong></label>
                        <input for="text"  id='phone' placeholder='Enter PhoneNumber' className='form-control' value={data.phone}
                        onChange={e=>setData({...data,phone:e.target.value})} />
                        {formErrors.phone && <div className='text-danger'>{formErrors.phone}</div>}
                    </div>
                    <div>
                    <button className='btn btn-success'>Update</button>
                    <Link to ={`/`} className='btn btn-primary ms-3'>Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;