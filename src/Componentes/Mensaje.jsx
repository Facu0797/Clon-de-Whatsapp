import React, { useEffect, useState } from 'react';
import { formatearFecha } from '../helpers/formatoFecha';
import { supabase } from '../superbaseClient';

const Mensaje = ({mensaje, email, fecha}) => {

    const [usuario, setUsuario] = useState()

    const getSession = async () => {
        const {data} = await supabase.auth.getSession();
        setUsuario(data.session.user.email);
    }

    useEffect(() => {
        getSession()
    }, [])

    return ( 
        <div className={`card ${usuario === email ? "me" : ""}`}>
            <p>{mensaje}</p>
            <span>{formatearFecha(fecha)}</span>
            <span className='user-email'>{email.split("@")[0]}</span>
        </div>
    );
}
 
export default Mensaje;