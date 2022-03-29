const { Pool } = require('pg');
const registroTransaccion = require('./registro_transaccion');
const consultaCursor = require('./consulta_cursor');
const consultaSaldo = require('./consulta_saldo');
const argumento = process.argv.slice(2);
let opcion = argumento[0];

const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'Feer1985',
    database: 'banco',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
}

const pool = new Pool(config);

//Requerimiento 1
pool.connect(async (error_conexion, client, release) => {

    let descripcion = argumento[1];
    let fecha = argumento[2];
    let monto = argumento[3];
    let cuenta = argumento[4];

    if (error_conexion) {
        return console.log('Error de conexion código: ', error_conexion.code);
    }
    try{
        if (opcion == 'registroTransaccion') {
            await registroTransaccion(client, release, descripcion, fecha, monto, cuenta);
        }
        if (opcion == 'consulta') {
            await consultaCursor(client, release, argumento[1]);
        }
        if(opcion == 'consultaSaldo'){
            await consultaSaldo(client, release, argumento[1]);
        }
    }catch(error_consulta){
        console.log('error_consulta.code');
    }
    pool.end();
});