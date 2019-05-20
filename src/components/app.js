import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import ArkTable from '../routes/table';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
	  this.currentUrl = e.url;
	};

	render() {
	  return (
	    <div id="app">
	      <Header />
	      <Router onChange={this.handleRoute}>
	        <ArkTable path="/" />
	      </Router>
	    </div>
	  );
	}
}
