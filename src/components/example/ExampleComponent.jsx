import React from 'react';
import './ExampleComponent.scss';

const ExampleComponent = () => {
  return (
    <div className="example-component">
      <div className="example-card">
        <h2 className="example-title">SCSS Variables Example</h2>
        <p className="example-text">
          This component demonstrates how to use SCSS variables in your React components.
        </p>
        
        <div className="example-buttons">
          <button className="btn-primary-custom">Primary Button</button>
          <button className="btn-outline-custom">Outline Button</button>
        </div>
        
        <div className="color-palette">
          <div className="color-box primary-color">
            <span>Primary Color</span>
            <code>#04C39A</code>
          </div>
          <div className="color-box primary-light">
            <span>Primary Light</span>
          </div>
          <div className="color-box primary-dark">
            <span>Primary Dark</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleComponent;
