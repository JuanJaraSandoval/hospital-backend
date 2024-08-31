/*
Hospitales:

    /api/hospital

*/


const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    deleteHospital
} = require('../controllers/hospitales.controller')


const router = Router();

router.get('/', getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

router.put('/:id',
    [
    ],
    actualizarHospital);

    router.delete('/:id',
        [
        ], deleteHospital

    )



module.exports = router


