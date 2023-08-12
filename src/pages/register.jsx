import React, { useState } from 'react'
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage, auth, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            console.log({ displayName, email, password })
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        // setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            // setLoading(false);
        }
    };


    return (
        <div className="formcontainer">
            <div className='formwrapper'>
                <span className="logo">Chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='username' placeholder='displayname' />
                    <input type="email" name="email" placeholder='email' />
                    <input type="password" name='password' placeholder='password' minLength={6} />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor="file"><img src={Add} alt="add Avatar" /> Add avatar</label>
                    <button>sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Already Registered ? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;