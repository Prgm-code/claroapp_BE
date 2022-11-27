const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const transporter = require('../config/mail.config.js');
const dotenv = require('dotenv');
const Role = require('../models/role.model.js');
dotenv.config();




const users = {
    validate: async (req, res, next) => {
        try {
            const { id } = req.params;
            const newUser = await User.findById(id);

            if (!newUser) return next(createError(404, 'user not found'));
            if (newUser.active) return next(createError(400, 'user already validated'));

            const user = await User
                .findByIdAndUpdate(
                    id,
                    { valid:true , active: true },
                    { new: true }
                );

            console.log(user)

            res.send(`<h1>Cuenta Validada/h1>
             <p>Ya puedes iniciar sesión</p> 
             <a href="https://gestionsitios.hardpro.store/login">Iniciar Sesión</a>
             `);
         
        } catch (error) {
            console.log(error);
            next(createError(400, 'bad request'));

        }
    },


    signup: async (req, res, next) =>  {
        

        const { email ,password , name, roles } = req.body;
        
        const newUser = new User({ email, password, name, valid:false });
        if (User.find({email:email})) {
                return next(createError(400, 'user already exists'));
            }


        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        


         newUser.save()
            .then(user => {

                res.status(201).json(user)
                transporter.sendMail({
                    from: 'Validacion de Cuentas <system.noreply@prgm.info>',
                    to: req.body.email,
                    subject: 'Validación de cuenta',
                    text: `Hacer Click en el Link para Validar la Cuenta ${process.env.URL}/api/users/${user._id}/validate`,
                    html: `
                    <h1>Hacer click en el Link para validar la cuenta</h1>
                    <a href="${process.env.URL}/api/users/${user._id}/validate">Validate</a>
                    
        
                    `
                })
                    .then(info => console.log(info))
                    .catch(error => console.log(error));

            })
            .catch(error => next(createError(400, error)));
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
       await User.findOne({ email })
            .then(user => {
                if (user) {
                    user.checkPassword(password)
                        .then(match => {
                            if (match) {
                                const token = jwt.sign(
                                    { sub: user._id, exp: Date.now() / 1000 * 3600 },
                                    process.env.JWT_SECRET);
                                console.log(token);


                                res.status(200).json(token);

                            } else {
                                next(createError(401));
                            }
                        })
                        .catch(error => next(error));
                } else {
                    next(createError(400));
                }
            })
            .catch(next);
    }


};

exports.users = users;