const { Schema, model } = require('mongoose');

const siteSchema = new Schema({
    sitio: {
        type: String,
        required: true,
        minlength: 3,
    },
    codigo: {
        type: String,
        required: true,
        minlength: 3,
    },
    clave: {
        type: String,


    },
    direccion: {
        type: String,

        minlength: 3,
    },
    comuna: {
        type: String,


    },

    numeroCliente: {
        type: String,

    },
    empresaElectrica: {
        type: String,

    },
    potencia: {

        type: String,
    },
    tipo: {
        type: String,// LLOO700 LLOO2600 normal 

    },
    IC1: {
        type: Boolean,
        default: false,
    },
    energia: {
        type: Object
    },
    transmision: {   
        type: Object
    },

    bts: {  
        type: Object
    },
    infraestructura: {  
        type: Object
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }

});

module.exports = model('Site', siteSchema);