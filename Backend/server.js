const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Connect to the database
const db = new sqlite3.Database('../scraper/database/database.db', (err) => {
    if(err){
        return console.error(err.message);
    }

    console.log('Connected to the database');
});

app.get('/products', (req, res) => {
    const {page, search} = req.query;

    if(!page){
        return res.status(400).json({response: 'Server needs page query'});
    }

    const offset = (page - 1) * 60;
    const lastData = page * 60;

    const queryDB = (command, params) => {
        return new Promise((resolve, reject) => {
            db.all(command, params, (err, result)=> {
                if(err){
                    reject(err);
                }

                resolve(result);
            });
        });
    }

    let sqlCommand = `SELECT * FROM NewData LIMIT 60 OFFSET ?;`;
    let sqlParams = [offset];
    let countCommand = `SELECT COUNT(*) as total FROM NewData;`;
    let countParams = [];

    if(search){
        sqlCommand = `SELECT * FROM NewData WHERE TITLE LIKE ? LIMIT 60 OFFSET ?;`;
        sqlParams = [`%${search}%`, offset];
        countCommand = `SELECT COUNT(*) as total FROM NewData WHERE TITLE LIKE ?;`
        countParams = [`%${search}%`];
    }

    (async () => {
        try{
            const queryResult = await queryDB(sqlCommand, sqlParams);
            const countResult = await queryDB(countCommand, countParams);

            let hasMoreData = true;
            if(countResult[0].total <= lastData){
                hasMoreData = false;
            }

            res.json({data: queryResult, totalData: countResult[0].total, hasMoreData: hasMoreData});
        } catch(err){
            res.status(400).send(err)
        }
    })();
});

app.listen(3000, () => {
    console.log('Server is running in port 3000');
});