const path = require('node:path');
const betterSqlite3 = require('better-Sqlite3');
const Contact = require('./Contact');


const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'),{verbose: console.log });


const createstmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,firstName TEXT,lastName TEXT,emailAddress TEXT DEFAULT '',notes TEXT DEFAULT '',createdDateTime TEXT DEFAULT CURRENT_TIMESTAMP,lastEditedDateTime TEXT DEFAULT CURRENT_TIMESTAMP)");
createstmt.run();

const contactRepo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts =[];
        rows.forEach((row)=>{
            const aContact = new Contact(row.id,row.firstName,row.lastName,row.emailAddress,row.notes,row.createdDateTime,row.lastEditedDateTime);
            contacts.push(aContact);
        });  
        return contacts; 
    },
    findById: (id) => {

        const stmt = db.prepare("SELECT * FROM contacts WHERE id= ?");
        const row = stmt.get(id);

        return new Contact(row.id,row.firstName,row.lastName,row.emailAddress,row.notes,row.createdDateTime,row.lastEditedDateTime);
        
    },
    create: (contact) => {

        const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, emailAddress, notes) VALUES (?,?,?,?)");
        const result = stmt.run(contact.firstName, contact.lastName, contact.emailAddress, contact.notes);
        console.log(`contact created with id: ${result.lastInsertRowid}`); 

    },
    deleteById: (id) => {

        const stmt = db.prepare("DELETE FROM contacts WHERE id= ?");;
        const rs = stmt.run(id);
        console.log(`rows deleted:'+  ${rs.changes}`); 

    },
    update: (contact) => {
        const stmt = db.prepare(`
            UPDATE contacts 
            SET 
                firstName = ?,
                lastName = ?,
                emailAddress = ?,
                notes = ?,
                lastEditedDateTime = ? 
            WHERE 
                id = ?`
        );
        
        const result = stmt.run(
            contact.firstName,
            contact.lastName,
            contact.emailAddress,
            contact.notes,
            contact.lastEditedDateTime,
            contact.id
        );

        console.log(`rows updated'+  ${result.changes}`);
    }
};

module.exports = contactRepo;
