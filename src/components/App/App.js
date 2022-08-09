import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [], 
			error: ''
    }
  }

  componentDidMount = () => {
		getUrls()
		.then(getUrls => { 
			const urlArr = getUrls.urls
			this.setState({urls: [...this.state.urls, ...urlArr]})
		})
		.catch(error => console.log(error.message))
  }	

	addUrl = (newUrl) => {
		fetch('http://localhost:3001/api/v1/urls', {
			method: 'POST', 
			body: JSON.stringify(newUrl), 
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			if(!response.ok) {
				throw Error('uh-oh')
			} else {
				return response.json()
			}
		})
		.then(url => this.setState({urls: [...this.state.urls, url]}))
		.catch(error => console.log(error.message))
	}

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
