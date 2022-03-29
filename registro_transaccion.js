//Requerimiento 1
registroTransaccion = async (client, release, descripcion, fecha, monto, cuenta) => {
    try {
        await client.query('BEGIN');
            const SQLQueryInsert = {
                name: 'consulta_insert',
                text: `INSERT INTO transacciones (descripcion, fecha, monto, cuenta) VALUES ($1, $2, $3, $4) RETURNING *`,
                values: [descripcion, fecha, monto, cuenta]
            };

            const SQLQueryUpdate = {
                name: 'consulta_update',
                text: `UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *`,
                values: [monto, cuenta]
            };

            const resInsert = await client.query(SQLQueryInsert);
            const resUpdate = await client.query(SQLQueryUpdate);

            console.log('Transaccion registrada con éxito: ', resInsert.rows);
            console.log('Descuento realizado con éxito: ', resUpdate.rows);
        await client.query('COMMIT');
    //Requerimiento 4
    } catch (err) {
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
        await client.query('ROLLBACK');
    }
    release();
}

module.exports = registroTransaccion;