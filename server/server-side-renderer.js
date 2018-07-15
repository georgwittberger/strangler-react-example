import cheerio from 'cheerio';
import ReactDOMServer from 'react-dom/server';

/**
 * Function to pre-render all components defined in the given array within the given HTML string.
 * Returns a promise which resolves to the HTML string containing pre-rendered components.
 *
 * The component types must be given as an array of objects with the following properties:
 *
 * {
 *   name: <component name>
 *   selector: <CSS selector to find container elements>
 *   factory: <function returning a promise which resolves to the component instance>
 * }
 *
 * @param {string} html Input HTML to parse for server-side rendering.
 * @param {Object[]} serverSideComponents List of component types to render on the server side.
 * @param {string} serverSideComponents[].name Name of the component.
 * @param {string} serverSideComponents[].selector CSS selector to find container elements for the component.
 * @param {Promise<React.ReactElement>} serverSideComponents[].factory Factory function returning a promise
 *   which resolves to the component instance.
 * @returns {Promise<string>} Promise which resolves to the pre-rendered HTML string.
 */
function serverSideRenderer(html, serverSideComponents) {
  // Parse the input HTML into a DOM representation.
  const $ = cheerio.load(html);
  const componentPromises = [];
  serverSideComponents.forEach((componentType) => {
    $(componentType.selector).each((index, container) => {
      const $container = $(container);
      // Pass the container element's dataSet as initial data to the factory function.
      componentPromises.push(componentType.factory($container.data())
        .then((component) => ReactDOMServer.renderToString(component))
        .then((componentHtml) => $container.html(componentHtml)));
    });
  });
  // Resolve the promise to the pre-rendered HTML as soon as all partial promises are resolved.
  return Promise.all(componentPromises).then(() => $.html());
}

export default serverSideRenderer;
