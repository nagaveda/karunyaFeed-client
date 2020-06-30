import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const postData = () => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            M.toast({html:"Invalid email", classes:"#c62828 red darken-3"});
            return;
        }
  
        fetch("/signup", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name,
                password: password,
                email: email
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:data.message, classes:"#1de9b6 teal accent-3"})
                history.push('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="sign">Karunya Feed</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value = {name}
                    onChange={(event)=>setName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value = {email}
                    onChange={(event)=>setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value = {password}
                    onChange={(event)=>setPassword(event.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2"
                onClick={()=>postData()}
                >
                    Sign up
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    );
}

export default Signup;