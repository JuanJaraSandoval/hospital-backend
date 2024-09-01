const { response } = require("express");
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const path = require('path')



const subirArchivo = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;


    // Validas tipos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medicos, usuario u hospital'
        })
    }
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Ningun archivo fue seleccionado'
        });
    }


    //Procesar la imagen...

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensinArchivo = nombreCortado[nombreCortado.length - 1]

    //Validar Extension

    const extensionValidas = ['png', 'jpg', 'jpeg', 'gif']

    if (!extensionValidas.includes(extensinArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de extension de archivo no es valido'
        })
    }


    //Generar el nombre del archivo 

    const nombreArchivo = `${uuidv4()}.${extensinArchivo}`

    //Path para guardar imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`


    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });

        }

        //Actualizar base de datos

        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archvio subido',
            nombreArchivo
        })
    });
}

const mostrarImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`)
        res.sendFile(pathImg)
    }

}


module.exports = {
    subirArchivo,
    mostrarImagen
}