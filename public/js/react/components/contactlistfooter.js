import React from 'react';
import Component from 'react-pure-render/component';

export default class ContactListFooter extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list__footer">
        <div className="add-bttn">
          <span className="in">
            Add new contact
          </span>
        </div>
      </div>
    );
  }
}

ContactListFooter.propTypes = {};
