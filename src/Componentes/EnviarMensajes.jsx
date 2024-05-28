import React, { useState, useEffect } from 'react';
import Enviar from './icons/Enviar';
import { supabase } from '../superbaseClient';

const EnviarMensajes = ({scroll}) => {
    const [input, setInput] = useState("");
    const [usuario, setUsuario] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(input !== ""){
            const insert = await supabase.from("mensajes").insert({
                email: usuario,
                contenido: input
            })
            setInput("");
        }
        scroll.current.scrollIntoView({behavior: "smooth"});
    }

    const getSession = async () => {
        const {data} = await supabase.auth.getSession();
        setUsuario(data.session.user.email);
    }

    useEffect(() => {
        getSession()
    }, [])

    return ( 
        <section className='send-mesage'>
            <form onSubmit={handleSubmit}>
                <input value={input} type="text" placeholder='Ingrese su mensaje' onChange={(e) => setInput(e.target.value)}/>
                <button type='submit'> <Enviar /></button>
            </form> 
        </section>
    );
}
 
export default EnviarMensajes;