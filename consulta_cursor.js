const Cursor = require('pg-cursor');
//Requerimiento 2
consultaCursor = async (client, release, cuenta) => {
    try {
        const cursor = await client.query(new Cursor(`SELECT * FROM transacciones WHERE cuenta = ${cuenta}`));
        cursor.read(10, (err, rows) => {
            if(err){
                console.log(err);
            }
            console.log(rows);

            cursor.close();
            release();
        });
    //Requerimiento 4
    } catch (err) {
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}

module.exports = consultaCursor;