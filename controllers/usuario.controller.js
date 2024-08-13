const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;



    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt)

        //Guardar Usuario
        await usuario.save()

        res.json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}


const actualizarUsuario = async (req, res) => {

    //todo Valida Token y comprobar si el usuario es correcto

    const uid = req.params.id;


    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }


        //Actualizar Usuario
        const campos = req.body
        if (usuarioDB.email === req.body.email) {
            delete campos.email
        } else {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }

        }

        delete campos.password; // Con esto hacemos que no se cambien los valores que son obligatorias para que no se sustituyan en la base de datos
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })

        res.json({
            ok: true,
            usuario: usuarioActualizado

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario

}