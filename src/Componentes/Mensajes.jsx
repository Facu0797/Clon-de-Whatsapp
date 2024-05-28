import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../superbaseClient';
import Mensaje from './Mensaje';
import Header from './Header';
import EnviarMensajes from './EnviarMensajes';

const Mensajes = () => {

    const [mensajes, setMensajes] = useState([]);
    const scroll = useRef();

    const llamarSupabase = async () => {
        const {data} = await supabase.from("mensajes").select("*");
        setMensajes(data)
    }

    useEffect(() => {
       llamarSupabase()
    }, [])

    // RealTime (Muestra los mensajes en tiempo real)
    useEffect(() => {
        const canal = supabase.channel("*").on("postgres_changes", { event: 'INSERT', schema: 'public', table: 'mensajes' },
        (payload) => {
            const nuevosMensajes = payload.new;
            setMensajes(mensajes => [...mensajes, nuevosMensajes]);
        })
        .subscribe()

        return () => supabase.removeChannel(canal);
    }, [])  

    return ( 
        <section className='messages'>
            <Header />
            <div className='content'>
                {
                    mensajes && 
                    mensajes.map((item, index) => (
                        <Mensaje
                            key={index}
                            mensaje={item.contenido}
                            email={item.email}
                            fecha={item.created_at}
                        />
                        ))
                }
            </div>
            <EnviarMensajes scroll={scroll}/>
            <span ref={scroll}></span>
        </section>
    );
}
 
    export default Mensajes
;