/* 
Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { getUsuarios, crearUsuario, actualizarUsuario } = require('../controllers/usuario.controller')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

router.get('/', getUsuarios);

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
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatori').not().isEmpty(),
    ],
    actualizarUsuario)



module.exports = router
