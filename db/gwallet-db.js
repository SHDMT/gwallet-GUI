const sqlite3 = require('sqlite3').verbose();
const format =require('../util/format')
const db = new sqlite3.Database(format.dataPath('gwallet-db.db'));

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS PASSWORD (passWord VARCHAR (30) PRIMARY KEY UNIQUE NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS ACCOUNTINFO (acctId INTEGER PRIMARY KEY UNIQUE NOT NULL, acctName VARCHAR(30) NOT NULL,icon BLOB, type NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS CONTACTS (name VARCHAR(30) NOT NULL, address VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS ADDRESS (acctId INTEGER, address VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL, description VARCHAR(30))");

	db.run("CREATE TABLE IF NOT EXISTS MESSAGE (acctId INTEGER NOT NULL, msgId VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL, mci INTEGER, height INTEGER, date INTEGER NOT NULL, received INT8, app INT8 NOT NULL, commission INTEGER NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS INPUTS (msgId VARCHAR(50) NOT NULL, input VARCHAR(50) NOT NULL, amount INTEGER NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS OUTPUTS (msgId VARCHAR(50) NOT NULL, output VARCHAR(50) NOT NULL, amount INTEGER NOT NULL)");

	db.run("CREATE TABLE IF NOT EXISTS CONTRACT (address VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL, name VARCHAR(50) NOT NULL, isrestrict INT8 NOT NULL, code TEXT NOT NULL, description TEXT NOT NULL, params TEXT NOT NULL)");
});

module.exports = {
    db
}