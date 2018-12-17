let SqliteDB = require('./drive/sqlite3.js').SqliteDB;
let response = require('./response');

class DBServer {
    constructor() {
        this.dbdrive = new SqliteDB();
    }

    open(dbPath) {
        this.dbdrive.open(dbPath);
    }

    close() {
        this.dbdrive.close();
    }

    listuseraddresses(req, res) {
        let page = req.page;
        let count = req.count;
        if (page > 0) {
            page = (page - 1) * count;
        }
        this.dbdrive.query(`SELECT * FROM address_list WHERE alt = 0 LIMIT ?, ?`, [page, count], (err, rows) => {
            response(res, "listuseraddresses", err, rows );
        });
    }

    adduseraddress(req, res) {
        let alt = 0;
        let name = req.name;
        let address = req.address;
        let note = req.note;
        this.dbdrive.add(`INSERT INTO address_list (alt, name, address, note) VALUES (?, ?, ?, ?)`, [alt, name, address, note], (err) => {
            response(res, "adduseraddress", err, { data: "done." });
        });
    }
    
    listcontactsaddresses(req, res) {
        let page = req.page;
        let count = req.count;
        if (page > 0) {
            page = (page - 1) * count;
        }
        this.dbdrive.query(`SELECT * FROM address_list WHERE alt = 1 LIMIT ?, ?`, [page, count], (err, rows) => {
            response(res, "listcontactsaddresses", err, rows );
        });
    }

    addcontactsaddress(req, res) {
        let alt = 1;
        let name = req.name;
        let address = req.address;
        let note = req.note;
        this.dbdrive.add(`INSERT INTO address_list (alt, name, address, note) VALUES (?, ?, ?, ?)`, [alt, name, address, note], (err) => {
            response(res, "addcontactsaddress", err, { data: "done." });
        });
    }

    deleteaddress(req, res) {
        let id = req.id;
        this.dbdrive.delete(`DELETE FROM address_list WHERE id = ?`, [id], (err) => {
            response(res, "deleteaddress", err, { data: "done." });
        });
    }

    udpateaddress(req, res) {
        let id = req.id;
        let name = req.name;
        let address = req.address;
        let note = req.note;
        this.dbdrive.update(`UPDATE address_list SET name = ?, address = ?, note = ? WHERE id = ?`, [name, address, note, id], (err) => {
            response(res, "udpateaddress", err, { data: "done." });
        });
    }
}

exports.DBServer = DBServer;