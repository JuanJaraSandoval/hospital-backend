const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
    const { email, password } = req.body;


    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email })

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        //Verificar constrasena
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contrasena no es valida'
            })
        }

        //Generar el token - JWT
        const token = await generarJWT(usuarioDB._id);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const googleSingIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token)

        const usuarioDb = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDb){
            usuario = new Usuario({
                nombre:name,
                email: email,
                password: '@@@',
                img: picture,
                google:true,
                })
        }else {
            usuario = usuarioDb;
            usuario.google =true
        }
        // Guardar Usuario en coleccion
        await usuario.save();

         //Generar el token - JWT
         const token = await generarJWT(usuario._id);


        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'

        });
    }

}





module.exports = {
    login,
    googleSingIn
}