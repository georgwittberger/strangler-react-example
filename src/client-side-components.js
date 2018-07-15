import React from 'react';
import ClientSideComponent from './ClientSideComponent';

/**
 * List of components to be rendered only on the client side.
 * 
 * Each definition must be a object with the following properties:
 * 
 * {
 *   name: <component name>
 *   selector: <CSS selector to find container elements>
 *   factory: <function returning the component instance>
 * }
 */
const clientSideComponents = [{
  name: 'ClientSideComponent',
  selector: '.js-client-side-component',
  factory: (initialData) => <ClientSideComponent title={initialData.title} text={initialData.text} />
}];

export default clientSideComponents;
