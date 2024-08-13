const express = require('express');
const cors = require('cors')

require('dotenv').config()

const {dbConnection} = require('./database/config')


//Crear el servidor express.js
const app = express()

//Configuracion CORS 

app.use( cors() )


//Lectura y parseo del body

app.use( express.json())

//Conexion a la base de datos
dbConnection()


//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))


app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
