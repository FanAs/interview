import React from 'react';
import Component from 'react-pure-render/component';
import Immutable from 'immutable';

export default class ContactListItem extends Component {
  render() {
    return (
      <div className="item">
        <div className="in">
          <div className="profile-pic"></div>
          <span>{this.props.contact.fullName}</span>
        </div>
      </div>
    );
  }
}

ContactListItem.propTypes = {
  contact: React.PropTypes.instanceOf(Immutable.Record).isRequired
};
