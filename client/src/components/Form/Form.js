import React, { useState } from 'react';
import axios from 'axios';
import "./Form.scss";
// import { Modal } from "react-responsive-modal";


const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const hangleClick = (e) => {
        e.preventDefault();

        if (e.target.id === "name") {
            setName(e.target.value)
        } else {
            setEmail(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            name,
            email
        }
        axios.post("/api/sendMail", dataToSubmit)
            .then(res => {
                setSent(true);
            }, resetForm())
            .then(
                setTimeout(function () {
                    alert("Message has been sent. / Le message a été envoyé.")
                }, 2000)
            )
            .catch(() => {
                console.log('message not sent')
            })
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setTimeout(() => {
            setSent(false)
        }, 3000)

        return (
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <div className="singleItem">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="name" placeholder="Name" value={name} onChange={hangleClick} />
                    </div>

                    <div className="singleItem">
                        <label htmlFor="email">Email</label>
                        <input id="email" placeholder="Email" value={email} onChange={hangleClick} required />
                    </div>

                    <div className={sent ? 'msg msgAppear' : 'msg'}>Message has been sent</div>
                    <div className="btn">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        // <div className="Form">
        //     <form onSubmit={handleSubmit}>
        //         <input id="name" placeholder="Name" value={name} onChange={hangleClick}/>
        //         <input id="email" placeholder="Email" value={email} onChange={hangleClick} />
        //         <button onClick={handleSubmit}>Send Email</button>
        //     </form>
        // </div>

        <div className="container">
            <form onSubmit={handleSubmit}>

                <div className="singleItem">
                    <label htmlFor="name">Name</label>
                    <input id="name" className="name" placeholder="Name" value={name} onChange={hangleClick} />
                </div>

                <div className="singleItem">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="Email" value={email} onChange={hangleClick} required />
                </div>

                <div className={sent ? 'msg msgAppear' : 'msg'}>Message has been sent</div>
                <div className="btn">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;