import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello11");
        const response = await fetch("https://pai-backend.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            localStorage.setItem('name',json.name)
            console.log(json.token)
            console.log(localStorage.getItem('token')) 
            navigate("/");     
            window.location.reload();

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <br/>
    <br/>
    Don't have an account? <a href="/signup">Signup</a>
  </form>
</div>
    )
}

export default Login
