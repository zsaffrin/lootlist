import React from 'react'

class ItemAdder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			category: '',
			name: '',
			price: ''
		}

		this.handleItemNameChange = this.handleItemNameChange.bind(this)
		this.handleItemCategoryChange = this.handleItemCategoryChange.bind(this)
		this.handleItemPriceChange = this.handleItemPriceChange.bind(this)
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	handleItemNameChange(i) {
		this.setState({
			name: i.target.value
		})
	}
	handleItemCategoryChange(i) {
		this.setState({
			category: i.target.value
		})
	}
	handleItemPriceChange(i) {
		this.setState({
			price: i.target.value
		})
	}
	handleFormSubmit(e) {
		e.preventDefault()
		let newItem = {
			category: this.state.category.trim(),
			name: this.state.name.trim(),
			book_value: this.state.price.trim()
		}
		this.props.handleSubmit(newItem)
		this.setState({
			category: newItem.category,
			name: '',
			price: ''
		})
	}

	render() {
		return (
			<div id="item-adder">
				<form onSubmit={this.handleFormSubmit}>
					<div className="field">
						<h4>Add Item</h4>
					</div>
					<div className="field">
						<div className="field-label">
							<label htmlFor="itemcategory">Category</label>
						</div>
						<div className="field-input">
							<select id="itemcategory" value={this.state.category} onChange={this.handleItemCategoryChange} >
								<option value=''></option>
								{this.props.categories.map(category => {
									return (<option value={category.shortname} key={category._id}>{category.singlename}</option>)
								})}
							</select>
						</div>
					</div>
					<div className="field">
						<div className="field-label">
							<label htmlFor="itemname">Item</label>
						</div>
						<div className="field-input">
							<input 
								type="text" 
								id="itemname" 
								value={this.state.name} 
								onChange={this.handleItemNameChange} />
						</div>
					</div>
					<div className="field">
						<div className="field-label">
							<label htmlFor="itemprice">Book Price</label>
						</div>
						<div className="field-input">
							<input 
								type="text" 
								id="itemprice" 
								value={this.state.price} 
								onChange={this.handleItemPriceChange} />
						</div>
					</div>
					<div className="field">
						<div className="field-input">
							<button className="button dark-green" type="submit" >
								<div className="content">
									<div className="label">Add</div>
								</div>
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}

export default ItemAdder
