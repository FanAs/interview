import {register} from '../dispatcher/dispatcher';
import {loadContacts, triggerEdit, addSaveContact, deleteContact} from '../actions/main';
import {contacts} from '../state';

export function getContacts() {
  return contacts();
}

export const dispatchToken = register(({action, data}) => {
  switch (action) {
  case loadContacts:
    onLoadContacts(data);
    break;
  case triggerEdit:
    onTriggerEdit(data);
    break;
  case addSaveContact:
    onAddSaveContact(data);
    break;
  case deleteContact:
    onDeleteContact(data);
    break;
  default:
    break;
  }

});

function onLoadContacts(data) {
  contacts(value => data);
}

function onTriggerEdit(newContact) {
  contacts(value => {
    return value.update(newContact.id, (contact) => newContact);
  });
}

function onAddSaveContact(newContact) {
  contacts(value => {
    return value.update(newContact.id, (contact) => newContact);
  });
}

function onDeleteContact(contact) {
  contacts(value => {
    return value.remove(contact.id);
  });
}