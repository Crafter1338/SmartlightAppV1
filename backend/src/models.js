import mongoose from 'mongoose';

// schemas //
const deviceSchema = new mongoose.Schema({
    name: { type: String },
    uid: { type: String, required: true, unique: true },
    mac: { type: String },  

    room: { type: String },
    battery: { type: Number }, // 1-100
    online: { type: Boolean, default: false },

    type: { type: String }, // sensor / actuator
    variant: { type: String }, // thermometer / light
    subvariant: { type: Number }, // subvariant - closet light, general light etc.

    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

const roomSchema = new mongoose.Schema({
    name: { type: String },
    uid: { type: String, required: true, unique: true },
});

const homeSchema = new mongoose.Schema({
    name: { type: String },
    uid: { type: String, required: true, unique: true },
});

// pre hooks //

// models //
export const roomModel   = mongoose.model("Room", roomSchema);
export const deviceModel = mongoose.model("Device", deviceSchema);
export const homeModel   = mongoose.model("Home", homeSchema); 