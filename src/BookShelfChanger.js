import React, {Component} from 'react'
//this is component for shelf changer we will need changeShelf component and props book
class BookShelfChanger extends Component{
	render(){
		return (
			<div className="book-shelf-changer">
                              <select value={this.props.book.shelf} onChange={(event)=>{ this.props.changeShelf(this.props.book,event.target.value)}}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">currentlyReading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
			)
	}
}
export default BookShelfChanger