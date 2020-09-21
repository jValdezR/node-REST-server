const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMON_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'Debes introducir un nombre'],
    },
    email: {
        type: String,
        unique: true,
        required: [true,'Debes ingresar un email']
    },
    password: {
        type: String,
        required: [true,'Debes ingresar un password']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator,{
    message: '{PATH} DEBE DE SER UNICO'
});

module.exports = mongoose.model('Usuario',usuarioSchema);
