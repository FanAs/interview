import {dispatch} from '../dispatcher/dispatcher';
import setToString from '../libs/settostring';
import {OrderedMap} from 'immutable';
import {createContact} from '../react/entities/contact';
import ls from 'local-storage';

export function loadContacts() {
  let contacts = ls.get('contacts');
  let parsed = new OrderedMap();

  let i = 0;

  if (!contacts || !contacts.contactList || contacts.contactList.length === 0) {
    contacts = {
      "contactList":
      [
        {
          "fullName": "John Smith",
          "bio": "Human beings are a disease, a cancer of this planet. You're a plague and we are the cure.",
          "phone": 123456789,
          "email": "john.smith@matrix.com"
        },
        {
          "fullName": "Thomas Anderson",
          "bio": "I know you're out there. I can feel you now. I know that you're afraid... you're afraid of us. You're afraid of change.",
          "phone": 111222333,
          "email": "thomas.anderson@matrix.com"
        }
      ]
    };

    ls.set('contacts', contacts);
  }

  contacts.contactList.forEach(function(contact) {
    const contactEntity = createContact(i, contact['fullName'], contact['bio'], contact['phone'], contact['email']);

    parsed = parsed.set(i, contactEntity);
    i++;
  });

  return dispatch(loadContacts, parsed);
}

export function triggerEdit(contact) {
  dispatch(triggerEdit, contact);
}

export function addSaveContact(contact) {
  let contacts = ls.get('contacts');

  if (!contacts || !contacts.contactList) {
    contacts = {contacts: []};
  }

  console.log(contact.toJS());

  contacts.contactList[contact.id] = contact.toJS();

  ls.set('contacts', contacts);

  dispatch(addSaveContact, contact);
}

export function deleteContact(contact) {
  let contacts = ls.get('contacts');

  if (!contacts || !contacts.contactList) {
    return;
  }

  contacts.contactList.splice(contact.id, 1);

  ls.set('contacts', contacts);

  dispatch(deleteContact, contact);
}

setToString('main', {
  loadContacts, triggerEdit, addSaveContact, deleteContact
});
