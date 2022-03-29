//Requerimiento 3
consultaSaldo = async (client, release, id) => {
    try {
        const cursor = await client.query(new Cursor(`SELECT * FROM cuentas WHERE cuenta = ${id}`));
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