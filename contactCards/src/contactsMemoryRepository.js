const crypto = require('node:crypto');

const db = new Map();

// Sample initial data
db.set('b5bb0f35-e7ff-4700-8921-e13c95fa8be9', {
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john@example.com',
    notes: 'Lorem ipsum dolor sit amet',
    id: 'b5bb0f35-e7ff-4700-8921-e13c95fa8be9'
});
db.set('15628bf8-a38c-48ad-8e49-cde1583bc4e1', {
    firstName: 'Jane',
    lastName: 'Smith',
    emailAddress: 'jane@example.com',
    notes: 'Consectetur adipiscing elit',
    id: '15628bf8-a38c-48ad-8e49-cde1583bc4e1'
});

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (id) => db.get(id),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            emailAddress: contact.emailAddress || '',
            notes: contact.notes || ''
        };
        db.set(newContact.id, newContact);
    },
    deleteById: (id) => db.delete(id),
    update: (contact) => db.set(contact.id, contact)
};

module.exports = repo;
