//Bootstrap - inicializace pro celou app.
import bootstrapHERE from './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import '../less/main.less';

// Layout components
import App from './react/layout/app';

ReactDOM.render(
  <App />,
  document.getElementById('react-router-root')
);
