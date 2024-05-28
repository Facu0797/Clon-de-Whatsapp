import React from 'react';
import { supabase } from './superbaseClient';

const Login = () => {

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return ( 
        <section className='login'>
            <button onClick={handleLogin}>Iniciar sesion</button>
            {/* <button onClick={handleLogout}>Cerrar sesion</button> */}
        </section>
    );
}
 
export default Login;