const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const db = new Map();

const loadData = () => {
    try {
        const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
        const contactsArray = JSON.parse(jsonData);
        contactsArray.forEach((contact) => {
            db.set(contact.id, contact);
        });
    } catch (error) {
        console.error('Error loading contacts data:', error);
    }
};

const saveData = () => {
    try {
        const stringifyData = JSON.stringify(Array.from(db.values()));
        fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
    } catch (error) {
        console.error('Error saving contacts data:', error);
    }
};

const contactRepo = {
    findAll: () => Array.from(db.values()),
    findById: (id) => db.get(id),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress || '',
            notes: contact.notes || '',
            createdDateTime: new Date().toISOString(),
            lastEditedDateTime: new Date().toISOString()
        };
        db.set(newContact.id, newContact);
        saveData();
    },
    deleteById: (id) => {
        db.delete(id);
        saveData();
    },
    update: (contact) => {
        const updatedContact = {
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress || '',
            notes: contact.notes || '',
            createdDateTime: contact.createdDateTime,
            lastEditedDateTime: new Date().toISOString()
        };
        db.set(contact.id, updatedContact);
        saveData();
    }
};

loadData();

module.exports = contactRepo;
