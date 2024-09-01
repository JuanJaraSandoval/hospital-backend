const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    

    // Paginacion sin usar Promesas

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //                               .skip(desde)
    //                               .limit(5);

    // const totalRegistro = await Usuario.countDocuments();

     const [ usuarios, totalRegistro] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ])

        res.json({
        ok: true,
        usuarios,
        totalRegistro
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

        //Generar  token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}


const actualizarUsuario = async (req, res = response) => {

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
        const { password, google, ...campos } = req.body
        if (usuarioDB.email != email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }

        }

        campos.email = email

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

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findOneAndDelete(uid)

        res.json({
            ok: true,
            msg: `${uid} borrado`
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
    actualizarUsuario,
    borrarUsuario

}