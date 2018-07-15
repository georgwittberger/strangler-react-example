import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/*
 * Configure Enzyme adapter for unit tests.
 */
configure({
  adapter: new Adapter()
});
