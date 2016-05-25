import {Record} from 'immutable';

export const contactRecord = Record({
  id: '',
  fullName: '',
  bio: '',
  phone: '',
  email: '',
  editable: false
});

export function createContact(id, name, bio, phone, email) {
  return contactRecord({
    id: id,
    fullName: name,
    bio: bio,
    phone: phone,
    email: email
  });
}
