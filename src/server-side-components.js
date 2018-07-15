import React from 'react';
import ServerSideComponent from './ServerSideComponent';

/**
 * List of components to be rendered on the server side.
 * 
 * Each definition must be a object with the following properties:
 * 
 * {
 *   name: <component name>
 *   selector: <CSS selector to find container elements>
 *   factory: <function returning a promise which resolves to the component instance>
 * }
 */
const serverSideComponents = [{
  name: 'ServerSideComponent',
  selector: '.js-server-side-component',
  factory: (initialData) => new Promise((resolve) => {
    /*
     * TIPP: We can load additional data via API request here and pass it as props to the component.
     * If we perform HTTP requests here we should use a library like "cross-fetch" which works in client and server.
     * The promise must be resolved with the component instance as soon as all initial data is available.
     */
    resolve(<ServerSideComponent title={initialData.title} text={initialData.text} />);
  })
}];

export default serverSideComponents;
