class Contact {
    constructor(id, firstName, lastName, emailAddress, notes, createdDateTime, lastEditedDateTime) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.notes = notes;
        this.createdDateTime = createdDateTime;
        this.lastEditedDateTime = lastEditedDateTime;
    }
}

module.exports = Contact;