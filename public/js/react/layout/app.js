import React from 'react';
import DocumentTitle from 'react-document-title';
import state from '../../state';
import ContactList from '../components/contactlist';
import ContactContainer from '../components/contactcontainer';
import {getContacts} from '../../stores/main';
import {loadContacts} from '../../actions/main';

export default class App extends React.Component {

  constructor() {
    super();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    state.on('change', this.refresh);

    loadContacts();
  }

  refresh() {
    this.forceUpdate();
  }

  componentWillUnmount() {
    state.removeListener('change', this.refresh);
  }

  render() {
    return (
      <body className="app" id="main-body">
        <ContactList contacts={getContacts()} />
        <ContactContainer contacts={getContacts()} />
      </body>
    );
  }

}

App.propTypes = {};
