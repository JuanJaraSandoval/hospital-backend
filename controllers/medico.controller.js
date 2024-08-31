const {response} = require('express');
const { status } = require('express/lib/response');

const Medico = require('../models/medico.model')


const getMedicos = async (req, res = response) =>{

    const medicos = await Medico.find()
                                .populate('usuario hospital','nombre img')
    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) =>{
    const uid = req.uid
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });

    console.log(uid);
    
    try {`  `

       const medicoDb = await medico.save()

        res.json({
            ok: true,
           medico: medicoDb
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}

const actualizarMedico = (req, res = response) =>{
    res.json({
        ok: true,
        msg:'actualizarMedico'
    })
}

const deleteMedico = (req, res = response) =>{
    res.json({
        ok: true,
        msg:'deletMedico'
    })
}



module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    deleteMedico
}