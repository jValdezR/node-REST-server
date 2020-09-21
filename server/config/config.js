// ===================================================
// Port (si esta en prod o corriendo localmente)
process.env.PORT = process.env.PORT || 8080;
// ===================================================

// ===================================================
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
// ===================================================

// ===================================================
// Base de datos
let urlDB;
if(process.env.NODE_ENV ==='dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = 'mongodb+srv://jValdezR:fNXPkhJuOFZTTQMg@cluster0.dxotq.mongodb.net/cafe';
}
process.env.urlDB = urlDB;
// ===================================================