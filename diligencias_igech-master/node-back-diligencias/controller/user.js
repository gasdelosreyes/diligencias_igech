const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// importamos el modelo
const User= require ('../model/User');

// importar el módulo jsonwebtoken
const jwt= require('jsonwebtoken');


const controller= {

    // Método GET para leer los usuarios de la BD
	getUsers:asyncHandler(async(req, res, next)=> {
        let user = await User.find();
        res.status(200).json({
            success: true,
            count: user.length,
            data: user
        });
    }),



// Probando el ruteo y controladores para elpaso de msjs
    postMsjs: asyncHandler(async(req, res, next) => {
       // await funciona con async incluyéndolo
       const{email, password}=req.body;
       const newUser= new User({email,password});
       // ver por consola
       // console.log(newUser);
       // es un método asíncrono save(), así que agregamos await
       await newUser.save();
       res.send('Testing')
    }),


	// Método POST creación de usuario, RUTA SIGNUP
      createUser: asyncHandler(async(req, res, next) => {
      	// asigna una búsqueda a la variable, busca por email
        let user = await User.findOne({ 'email': req.body.email });
        // está vacía la variable
        if (!user) {
        	// guarda el nuevo registro en MONGODB       
            let user = await User.create(req.body);
            // genera un token
            const token = jwt.sign({_id:user._id},'secretKey')
            res.status(200).json({
                success: true,
                data: user,
                // devuelve el token
                token:token,
            });          
        }         
        else {
        	// encontró un registro en la BD e informa por msj
            return (next(new ErrorResponse(`That email already exists`)));
        }      

    }),

      // Método POST LOGIN de usuario, RUTA SIGNIN
      loginUser: asyncHandler(async(req,res,next) => {
          const {email, password} = req.body;
          // Busa en la BD y guarda en una cte
          // let user = await User.findOne({ 'email': req.body.email });
          const user=await User.findOne({email})
          // Sino existe lo informa
          if(!user) return res.status(401).send("The email doesn't exists");
          // En caso, de que exista, verfica la contraseña
          if(user.password !== password) return res.status(401).send("Wrong password");         
          const token = jwt.sign({_id:user._id},'secretKey')
            res.status(200).json({
                // success: true,
                // data: user,
                // devuelve el token
                token:token,

          });          

        }),

      verifyToken: (req,res,next) => {          
          if(!req.headers.authorization) return res.status(401).send('Unauthorized Request') ;  

          console.log(req.headers.authorization);   
      }
 }
   


module.exports=controller;

