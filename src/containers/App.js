import React from 'react';
import ReactDOM from 'react-dom';
import fetchWikiData from '../actions/fetchWikiData.js';
import fetch from 'isomorphic-fetch';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			data: "No data"
		}
		this.fetchData = this.fetchData.bind(this)
	}

	componentWillMount(){

	}

	componentDidMount(){

	}
	componentWillUnmount(){

	}

	fetchData(){
		return fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=51027393', 
			{
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				mode: 'no-cors',
			})
	      	.then((res) => {
		        console.log(res)
		        if (res.ok) {
			        this.setState({data:res.json()});
		      	}else{
			        this.setState({data:"Fetch Error"});
		      	}
	      	});
    }

	render(){
		return (
			<div>
				<h1>Terror Map</h1>
				<button onClick={this.fetchData}> Fetch Data</button>
				<p>{this.state.data} </p>

			</div>
		);
	}
}

export default App;