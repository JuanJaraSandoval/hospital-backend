/* Ruta:

    ruta: api/upload/
*/



const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
  subirArchivo,
  mostrarImagen
} = require('../controllers/uploads.controller')


const router = Router();
router.use(fileUpload())

router.put('/:tipo/:id',validarJWT, subirArchivo);
router.get('/:tipo/:foto',validarJWT, mostrarImagen);





module.exports = router


