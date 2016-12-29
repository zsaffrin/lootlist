import React from 'react'

class CategoryTile extends React.Component {
	render() {
		return (
			<div className="tilewrap" key={this.props.category.id}>
				<div className="tile">
					<h4>{this.props.category.displayname}</h4>
					{this.props.items.map(item => {
						return (
							<div className="item" key={item.id}>
								<div className="item-title">{item.name}</div>
								<div className="item-price">{item.book_value}gp</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

class Inventory extends React.Component {
	filterItemsByCategory(items, category) {
		let filteredItems = []
		items.map(item => {
			if (item.category == category.shortname) {
				filteredItems.push(item)
			}
		})
		return filteredItems
	}
	totalPrice(items) {
		let total = 0
		items.map(item => {
			total = total + item.book_value
		})
		return total
	}
	render() {
		let totalValue = this.totalPrice(this.props.items)
		return (
			<div id="inventory">
				<div id="summary">
					{this.props.items.length} items - {this.props.players.length} Player shares<br/>
					Total value: {totalValue}gp<br/>
					Share per player: {Math.floor(totalValue / this.props.players.length)}gp
				</div>
				<div id="category-tiles">
					{this.props.categories.map(category => {
						let filteredItems = this.filterItemsByCategory(this.props.items, category)
						if (filteredItems.length > 0) {
							return (<CategoryTile category={category} items={filteredItems} key={category.id} />)
						} else {
							return
						}
					})}
				</div>
			</div>
		)
	}
}

export default Inventory