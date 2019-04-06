import React from 'react';
import ReactDOM from 'react-dom';
import RenderPdf from '../js/components/container/RenderPdf'

const wrapper = document.getElementById('componentId');
console.log('Checking for wrapper!', wrapper);
if (wrapper) {
  console.log('Rendering React Component');
  ReactDOM.render(
    <RenderPdf {...wrapper.dataset} />,
    wrapper,
  );
}
