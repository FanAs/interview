import React from 'react';
import Component from 'react-pure-render/component';
import Immutable from 'immutable';
import {addSaveContact, triggerEdit, deleteContact} from '../../actions/main';

export default class Contact extends Component {
  constructor() {
    super();

    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.del = this.del.bind(this);
    this.realDel = this.realDel.bind(this);
  }

  componentWillMount() {
    this.setState({contact: this.props.contact});
  }

  render() {
    const contact = this.state.contact;

    if (!contact) {
      return null;
    }

    const disabled = !contact.editable;

    return (
      <div className="contact item">
        <div className="item__header">
          <div className="profile-pic"></div>
          <input className="name" data-key="fullName" type="text" value={contact.fullName} placeholder="Full Name" disabled={disabled} ref="fullName" onChange={this.save} />
        </div>
        <div className="item__content">
          <div className="input-wrap">
            <label for="bio">Bio</label>
            <textarea name="bio" data-key="bio" className="bio" placeholder="Description" disabled={disabled} ref="bio" onChange={this.save}>{this.props.contact.bio}</textarea>
          </div>
          <div className="input-wrap">
            <label for="tel">Phone</label>
            <input type="text" data-key="phone" name="tel" className="tel" value={contact.phone} placeholder="+XXX XXX XXX XXX" ref="phone" disabled={disabled} onChange={this.save}/>
          </div>
          <div className="input-wrap">
            <label for="email">E-mail</label>
            <input type="text" data-key="email" className="email" value={contact.email} placeholder="E-mail" disabled={disabled} ref="email" onChange={this.save} />
          </div>
        </div>
        <div className="item__footer">
          <div className="button" onClick={this.edit}>{contact.editable ? 'Save' : 'Edit'}</div>
          <div className="button button--negative" style={{marginLeft: '8px'}} onClick={this.del}>{this.state.sure ? 'Sure?' : 'Delete'}</div>
          {this.state.sure ? <div className="button button--negative" style={{marginLeft: '8px'}} onClick={this.realDel}>Just do it</div> : null}
        </div>
      </div>
    );
  }

  save(e) {
    const dataKey = e.target.getAttribute('data-key');

    if (!dataKey || !this.refs[dataKey]) {
      return;
    }

    const value = this.refs[dataKey].value;

    const contact = this.state.contact.set(dataKey, value);
    this.setState({contact: contact});

    addSaveContact(contact);
  }

  edit() {
    const contact = this.state.contact.set('editable', !this.state.contact.get('editable'));

    this.setState({contact: contact});
    triggerEdit(this.state.contact);
  }

  del() {
    if (this.state.sure !== true) {
      this.setState({sure: true});
    }
  }

  realDel() {
    deleteContact(this.state.contact);

    this.setState({contact: null});
  }
}

Contact.propTypes = {
  contact: React.PropTypes.instanceOf(Immutable.Record).isRequired
};
