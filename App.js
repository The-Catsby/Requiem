import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

	constructor(){
		super();
		this.state = {
			red: 0,
			green: 0,
			blue: 0,
			val: 0
		}
		this.update = this.update.bind(this)
		this.updateButton = this.updateButton.bind(this)
	}
	update(){
		this.setState({
			red: ReactDOM.findDOMNode(this.refs.red).value,
			green: ReactDOM.findDOMNode(this.refs.green).value,
			blue: ReactDOM.findDOMNode(this.refs.blue).value,
		})
	}
	updateButton(){
		this.setState({val: this.state.val + 1})
	}
	componentWillMount(){
		console.log('mounting')
		this.setState({m: 2})
	}
	render(){
		console.log('rendering')
		let txt = this.props.txt
		return (
			<div>
				<h1>Hello World</h1>
				<hr />
				<Slider ref="red" update={this.update} />
					{this.state.red}
				<br />
				<Slider ref="green" update={this.update} />
					{this.state.green}
				<br />
				<Slider ref="blue" update={this.update} />
					{this.state.blue}
				<br />
				<hr />			
				<button onClick={this.updateButton}>{this.state.val * this.state.m}</button>
				<p>State = {this.state.val}</p>
			</div>
		);
	}
	componentDidMount(){
		console.log('mounted')
		this.inc = setInterval(this.updateButton, 500)
	}
	componentWillUnmount(){
		console.log('unmounting')
		clearInterval(this.inc)
	}
}

// This class allows the Mount/Unmount buttons to render initially
// These buttons mount the App class
class Wrapper extends React.Component {
	constructor(){
		super();
		this.mount = this.mount.bind(this)
		this.unmount = this.unmount.bind(this)
	}
	mount(){
		ReactDOM.render(<App />, document.getElementById('a'))
	}
	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	render(){
		return (
			<div>
				<button onClick={this.mount}>Mount</button>
				<button onClick={this.unmount}>Unmount</button>
				<div id="a"></div>
			</div>
		);
	}
}

class Slider extends React.Component {
	render(){
		return (
			<input type="range"
				min="0"
				max="255"
				onChange={this.props.update} />
		);
	}
}

const Widget = (props) => {
	return (
			<div>
				<input type="text" onChange={props.update} />
				<h1>{props.txt}</h1>
			</div>
	);
}

class Button extends React.Component {
	render() {
		return <button>{this.props.children}</button>
	}
}

// App.propTypes = {
	// txt: React.PropTypes.string,
	// cat: React.PropTypes.number.isRequired
// }

App.defaultProps = {
	// txt: 'this is the default txt'
}

ReactDOM.render(
	<Wrapper />,
	document.getElementById('app')
);

export default Wrapper