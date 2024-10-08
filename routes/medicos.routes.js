/*
Medicos:

    /api/medicos

*/


const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    actualizarMedico,
    crearMedico,
    deleteMedico
} = require('../controllers/medico.controller')


const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico);

router.put('/:id',
    [
    ],
    actualizarMedico);

    router.delete('/:id',
        [
        ], deleteMedico

    )



module.exports = router


