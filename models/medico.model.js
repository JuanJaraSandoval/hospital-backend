const { type } = require('express/lib/response');
const {Schema, model, Collection} = require('mongoose');


const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    
    img:{
        type: String,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});

MedicoSchema.method('toJSON', function(){
    const {__v, ...object }= this.toObject();
    return object
})

module.exports= model('Medico', MedicoSchema);
