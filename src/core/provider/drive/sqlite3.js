let sqlite3 = require('sqlite3').verbose();

class SqliteDB{
    constructor(){
        this.connection = null;
    }
    open(path){
        this.path = path;
        this.connection = new sqlite3.Database(this.path, function(err) {
            if (err) throw err;
        });
    }
    close(){
        this.connection.close((err)=>{
            if (err) throw err;

            this.connected = false;
        })
    }
    add(sql, params, callback){
        if(!this.connection.open){
            throw new Error("DB file has not opened.");   
        }
        this.connection.run(sql, params, callback);
    }
    delete(sql, params, callback){
        if(!this.connection.open){
            throw new Error("DB file has not opened.");   
        }
        this.connection.run(sql, params, callback);
    }
    update(sql, params, callback){
        if(!this.connection.open){
            throw new Error("DB file has not opened.");   
        }
        this.connection.run(sql, params, callback);
    }
    query(sql, params, callback){
        if(!this.connection.open){
            throw new Error("DB file has not opened.");   
        }
        this.connection.all(sql, params, callback);
    }
}
exports.SqliteDB = SqliteDB;
