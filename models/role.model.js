const { Schema, model } = require( "mongoose");

const ROLES = ["user","userlloo", "admin", "moderator"];

const roleSchema = new Schema({
    name: String,

}, {
    versionKey: false,

}
);

module.exports = model( "Role", roleSchema);




