import ReactDOM from 'react-dom';
import './index.css';
import clientSideComponents from './client-side-components';
import serverSideComponents from './server-side-components';
import registerServiceWorker from './registerServiceWorker';

/*
 * Render all components which should only be rendered on the client side.
 */
clientSideComponents.forEach((componentType) => {
  // Take into account that a component type can appear multiple times on the page.
  const containers = document.querySelectorAll(componentType.selector);
  containers.forEach((container) => {
    // Pass the container element's dataSet as initial data to the factory function.
    ReactDOM.render(componentType.factory(container.dataset), container);
  });
});

/*
 * Hydrate all components which have been pre-rendered on the server side.
 */
serverSideComponents.forEach((componentType) => {
  // Take into account that a component type can appear multiple times on the page.
  const containers = document.querySelectorAll(componentType.selector);
  containers.forEach((container) => {
    // Pass the container element's dataSet as initial data to the factory function.
    // As soon as the promise resolves to the component instance hydrate the container element.
    componentType.factory(container.dataset).then((component) => ReactDOM.hydrate(component, container));
  });
});

registerServiceWorker();
