import React, { useState } from 'react';
import Mensajes from './Componentes/Mensajes';
import "../src/App.css"
import Login from './Login';
import { supabase } from "./superbaseClient"
import { useEffect } from 'react';

const App = () => {

    const [sesion, setSesion] = useState(null);

    const getSession = async () => {
        const {data} = await supabase.auth.getSession();
        setSesion(data.session);
    }

    useEffect(() => {
        getSession()
    }, [])

    return ( 
        <div className="App">
            <h1>Whatsapp Clone</h1>
            <p>ReactJs & Supabase</p>
            <div className="container">
                { sesion ? <Mensajes/> : <Login/> }
            </div>
      </div>
    );
}
 
export default App;
