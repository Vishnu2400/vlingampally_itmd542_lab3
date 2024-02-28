var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');
const crypto = require('crypto');


/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const contacts = contactsRepo.findAll();
  res.render('contacts', { title: 'Express Contacts', contacts: contacts });
});

/* GET contact add */
router.get('/add', function(req, res, next) {
  res.render('createContact', { title: 'Add a Contact'} );
});

/* POST contact add */
router.post('/add', function(req, res, next) {
  const { firstName, lastName, emailAddress, notes } = req.body;
  if (!firstName || !lastName) {
    res.render('createContact', { title: 'Add a Contact', msg: 'First Name and Last Name are required.' });
  } else {
    const newContact = {
      id: crypto.randomUUID(), // This function should generate a unique ID for the contact
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress || '',
      notes: notes || '',
      createdDateTime: new Date().toISOString() // Current date/time
    };
    contactsRepo.create(newContact);
    res.redirect('/contacts');
  }
});

/* GET a contact */
router.get('/:id', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.id);
  if (contact) {
    res.render('contact', { title: 'Contact Details', contact: contact });
  } else {
    res.redirect('/contacts');
  }
});

/* GET contact delete */
router.get('/:id/delete', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.id);
  res.render('deleteContact', { title: 'Delete Contact', contact: contact });
});

/* POST contact delete */
router.post('/:id/delete', function(req, res, next) {
  contactsRepo.deleteById(req.params.id);
  res.redirect('/contacts');
});

/* GET contact edit */
router.get('/:id/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.id);
  res.render('editContact', { title: 'Edit Contact', contact: contact });
});

/* POST contact edit */
router.post('/:id/edit', function(req, res, next) {
  const { firstName, lastName, emailAddress, notes } = req.body;
  if (!firstName || !lastName) {
    const contact = contactsRepo.findById(req.params.id);
    res.render('editContact', { title: 'Edit Contact', msg: 'First Name and Last Name are required.', contact: contact });
  } else {
    const updatedContact = {
      id: req.params.id,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress || '',
      notes: notes || '',
      createdDateTime: contactsRepo.findById(req.params.id).createdDateTime, // Retain original creation date/time
      lastEditedDateTime: new Date().toISOString() // Current date/time
    };
    contactsRepo.update(updatedContact);
    res.redirect('/contacts');
  }
});



module.exports = router;
