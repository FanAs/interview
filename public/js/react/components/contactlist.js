import React from 'react';
import Component from 'react-pure-render/component';
import Immutable from 'immutable';
import ContactListItem from './contactlistitem';
import ContactListFooter from './contactlistfooter';

export default class ContactList extends Component {
  render() {
    return (
      <div className="list">
        <div className="list__header">
          <div className="heading">Contact List</div>
        </div>
        <div className="list__content">
          {
            this.props.contacts.map((contact) => {
              return (<ContactListItem contact={contact} />);
            })
          }
        </div>
        <ContactListFooter />
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired
};
