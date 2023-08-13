import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
          await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        }
        catch (error) {
            setErr(true);
            console.log(error)
        }

    };

    return (
        <div className="formcontainer">
            <div className="formwrapper">
                <span className="logo">Chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder='email' />
                    <input type="password" name='password' placeholder='password' minLength={6} />
                    <button>sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Not Registered ? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
export default Login;
