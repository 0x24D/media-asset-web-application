import {
    addNewContact,
    getContacts,
    getContactWithId,
    updateContact,
    deleteContact,
} from '../controllers/crmController';

const crmRoutes = (app) => {
    app.route('/contact')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getContacts)
    .post(addNewContact);

    app.route('/contact/:contactId')
    .get(getContactWithId)
    .put(updateContact)
    .delete(deleteContact);
}

export default crmRoutes;
