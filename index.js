const express = require('express');
const cors = require('cors')

require('dotenv').config()

const {dbConnection} = require('./database/config')


//Crear el servidor express.js
const app = express()

//Configuracion CORS 

app.use( cors() )

//Carpeta Publica

app.use(express.static('publica'))


//Lectura y parseo del body

app.use( express.json())

//Conexion a la base de datos
dbConnection()


//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/hospitales', require('./routes/hospitales.routes'))
app.use('/api/todo', require('./routes/busquedas.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/upload', require('./routes/uploads.routes'))


app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})
