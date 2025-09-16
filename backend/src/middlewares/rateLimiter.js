import rateLimit from 'express-rate-limit';

//1- configuramos la libreria
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 peticiones por IP
    message: {
        status: 429,
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    },
});

export default limiter;
