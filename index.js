const express = require('express');
const cors = require('cors')

require('dotenv').config()

const {dbConnection} = require('./database/config')


//Crear el servidor express.js
const app = express()

//Configuracion CORS 

app.use( cors() )

//Conexion a la base de datos
dbConnection()


//Rutas

app.get('/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
