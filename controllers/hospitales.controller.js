const {response} = require('express')

const Hospital = require('../models/hospital.model')


const getHospitales = async  (req, res = response) =>{
    const hospitales =  await Hospital.find()
                                       .populate('usuario', 'nombre img')       
    res.json({
        ok: true,
       hospitales
    })
}

const crearHospital =  async (req, res = response) => {
    
    const uid = req.uid
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    console.log(uid);
    
    try {

       const hospitalDb = await hospital.save()

        res.json({
            ok: true,
           hospital: hospitalDb
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const actualizarHospital = (req, res = response) =>{
    res.json({
        ok: true,
        msg:'actualizarHospital'
    })
}

const deleteHospital = (req, res = response) =>{
    res.json({
        ok: true,
        msg:'deletHospital'
    })
}



module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    deleteHospital
}