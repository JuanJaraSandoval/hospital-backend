/* 
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controller')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'La constrasena es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario);

router.put('/:id',
    [
        validarJWT,   
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatori').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario);

    router.delete('/:id',
        [
            validarJWT,
        ], borrarUsuario

    )



module.exports = router
