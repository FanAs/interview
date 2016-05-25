import React from 'react';
import Component from 'react-pure-render/component';
import Immutable from 'immutable';
import Contact from './contact';

export default class ContactContainer extends Component {
  render() {
    return (
      <div className="detail">
        {
          this.props.contacts.map((contact) => {
            return (<Contact contact={contact} />);
          })
        }
      </div>
    );
  }
}

ContactContainer.propTypes = {
  contacts: React.PropTypes.instanceOf(Immutable.OrderedMap).isRequired
};
