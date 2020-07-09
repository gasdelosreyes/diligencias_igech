const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// importamos el modelo
const User= require ('../model/User')


const controller= {

	// Método GET para leer los usuarios de la BD
	getUsers: asyncHandler(async(req, res, next) => {
        let user = await User.find();
        res.status(200).json({
            success: true,
            count: user.length,
            data: user
        });
    }),


	// Método POST creación de usuario
      createUser: asyncHandler(async(req, res, next) => {
      	// asigna una búsqueda a la variable, busca por email
        let user = await User.findOne({ 'email': req.body.email });
        // está vacía la variable
        if (!user) {
        	// le asigna el nuevo registro
            let user = await User.create(req.body);
            res.status(200).json({
                success: true,
                data: user
            });
        } else {
        	// encontró un registro en la BD e informa por msj
            return (next(new ErrorResponse(`That email already exists`)));
        }

    }),

}

module.exports=controller;