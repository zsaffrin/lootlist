import React from 'react'
import { render } from 'react-dom'

require('./styles/app.scss')

import ItemAdder from './ItemAdder'
import Inventory from './Inventory'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { items: [], categories: [], players: [] }

		this.addItem = this.addItem.bind(this)
		this.handleItemSubmit = this.handleItemSubmit.bind(this)
	}
	componentDidMount() {
		this.setState({ players: [
			{ name: 'Chuck', share: true },
			{ name: 'Cori', share: true },
			{ name: 'Craig', share: true },
			{ name: 'Dan', share: true },
			{ name: 'Mike', share: true },
			{ name: 'Nick', share: true },
			{ name: 'Taylor', share: true },
			{ name: 'Zach', share: true },
			{ name: 'Group', share: true }
		] })
		this.loadItemsFromServer()
		this.loadCategoriesFromServer()
	}
	componentWillReceiveProps() {
		this.loadItemsFromServer()
		this.loadCategoriesFromServer()
	}

	loadItemsFromServer() {
		return fetch('/api/items')
			.then(response => response.json())
			.then(json => this.setState({ items: json }))
	}
	loadCategoriesFromServer() {
		return fetch('/api/categories')
			.then(response => response.json())
			.then(json => this.setState({ categories: json }))
	}
	addItem(newItem) {
        var obj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }
		return fetch('/api/items', obj)
				.then(response => response.json())
				.catch(e => console.log('Error', e))
	}
	handleItemSubmit(newItem) {
		this.addItem(newItem)
			.then(() => this.loadItemsFromServer())
	}

	render() {
		return (
			<div id="app">
				<div className="top-nav">
					<div className="container">
						<h1>Loot List</h1>
					</div>
				</div>
				<div className="section">
					<div className="container">
						<ItemAdder categories={this.state.categories} handleSubmit={this.handleItemSubmit} />
					</div>
				</div>
				<div className="section">
					<div className="container">
						<div className="inventory">
							<Inventory categories={this.state.categories} items={this.state.items} players={this.state.players} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

render(<App />, document.getElementById('root'));
