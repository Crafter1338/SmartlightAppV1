import mongoose from 'mongoose';

export const Account = mongoose.model('Account', new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    security_level: { type: Number, default: 0 },

    smartlight_uuids: [ String ],
    smartlight_data : [ { name: String, description: String } ],
}));

export const Smartlight = mongoose.model('Smartlight', new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },

    state: { type: Boolean },
    brightness: { type: Number },      // 1-255
    primary_color: { type: String },   // HEX
    secondary_color: { type: String }, // HEX
    
    battery_charge: { type: Number }, 
}));