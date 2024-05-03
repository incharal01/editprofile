import React, { useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './Edit.css';


const Edit = () => {
    const {id} = useParams();
    const[data,setData] = useState({ name:'', username:'',email:'',phone:'' })
    const[formErrors,setFormErrors] = useState({name:'',username:'',email:'',phone:''});
    const[successMsg,SetSuccessMsg] = useState("");
    const[errorMsg,setErrorMsg]=useState("");
    const[mandatory,setMandatory]=useState(false);
    const[valid,setValid]=useState(true);
    const[message] = useState({
        "ERROR_MESSAGE":"Please Fill the above required field!"
    })
 
    useEffect(()=>{
        axios.get('http://localhost:3001/user/'+ id)
        .then((res)=>setData(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(data);
        if(data.name === "" || data.username==="" || data.email === "" || data.phone === ""){
            setMandatory(true);
            
        }else{
            setMandatory(false);
            axios.put('http://localhost:3001/user/' +id, data)
        .then(res=>{
            setData(res);
            SetSuccessMsg("Saved Successfully");
        }).catch(err=>{console.log(err);
        setErrorMsg("Something went wrong")})
        } 
    }

    const handleChange = (e) =>{
        SetSuccessMsg("");
        setErrorMsg("");
        setMandatory(true);
        let errors = formErrors;
        switch(data){
            case "name":
                if(!data.name.trim()){
                    errors.name = "Enter the required Field";
                }else{
                    errors.name=''
                }
                break;
            case "username":
                if(data.username === ""){
                    errors.username = "Enter the required field";
                }else{
                    errors.username=''
                }
                break;
            case "email":
                if(data.email === ""){
                    errors.email="Enter the required field"
                }else{
                    errors.email=''
                }
                break;
            case "phone":
                if(data.phone === ""){
                    errors.phone = "Enter the required field"
                }else{
                    errors.phone=''
                }
                break;
                default:
                    break;
        }
        setFormErrors(errors);
        if(Object.values(formErrors).every((value)=>value==='')){
            setValid(true);
        }else{
            setValid(false);
        }
    }
    return(
        <div className='edit-form'>
            <div className='form-group'>
                <h2 style={{color:'black'}}>Edit User details</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label htmlFor={'name'}><strong>Name: </strong></label>
                        <input type="text" id="name" placeholder='Enter Name' className='form-control' value={data.name}
                        onChange={e=>setData({...data,name:e.target.value,handleChange})}  />
                        {formErrors.name?(<span id='errorMsg' className='text-danger'>"{formErrors.name}"</span>):null}
                         {formErrors.name?(<span id='errorMsg' className='text-danger'>{formErrors.phone}</span>):null}
                    </div>
                    <div>
                    <button className='btn btn-success'>Update</button>
                    <Link to ={`/${id}`} className='btn btn-primary ms-3'>Back</Link>
                    </div>
                </form>
            {mandatory?(<div id='mandatory' className='text text-danger'>{message.ERROR_MESSAGE}</div>):null}
            {successMsg?(<div id='success' className='text-success'>{successMsg}</div>):null}
            </div>
        </div>
    );
}

export default Edit;