const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

//Cargando variables de entorno
dotenv.config({ path: './config/config.env' });

//Importar base de datos
const connectDB = require('./config/db');

//Conectar base de datos
connectDB();

//Conectar la libreria express
const app = express();

//Middlewares
//Manejador de errores
const errorHandler = require('./middleware/error');

//Body Parser para admitir datos JSON
app.use(express.json());

//Log de peticiones HTTP
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Importar rutas
const office = require('./routes/office')
const record = require('./routes/record')

//Montar rutas
app.use('/diligence/record', record);
app.use('/diligence/office', office);

//Manejador de errores
app.use(errorHandler);

//Variables de entorno
const PORT = process.env.PORT || 3000;

//Levantar servidor
const server = app.listen(
    PORT,
    console.log(`Server running in  ${process.env.NODE_ENV} mode - Listening at Port:`.cyan.underline.bold + `${PORT}`.yellow)
);

//Manejar promesas y mostrar errores desconocidas
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
});