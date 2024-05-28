import React, {useEffect, useState} from 'react';
import FlechaAtras from './icons/FlechaAtras';
import { supabase } from '../superbaseClient';
import Opciones from './icons/Opciones';

const Header = () => {

    const [usuario, setUsuario] = useState("facu");
    const [opciones, setOpciones] = useState(false);

    // Cerrar Sesion
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    }

    // Sesion
    const getSession = async () => {
        const {data} = await supabase.auth.getSession();
        setUsuario(data.session.user.email)
    }

    useEffect(() => {
        getSession()
    }, [])

    // Abrir Opciones
    const handleOpciones = () => {
        setOpciones(current => !current);
    }
    
    return ( 
        <div className="header">
            <div className="left">
                <p className='logout' onClick={handleLogout}><FlechaAtras /></p>
                <img src="../../public/avatar/avatar-0.jpg" alt="Avatar" />
                <p className='name'>@{usuario.split("@")[0]}
                    <span>online</span>
                </p>
            </div>
            <p className='dots' onClick={handleOpciones} ><Opciones /></p>
            <div onClick={handleLogout} className={`float-out ${opciones ? "open" : ""}`}>
                logOut
            </div>
        </div>    
    );
}
    
export default Header
