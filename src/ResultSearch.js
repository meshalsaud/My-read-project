import React, {Component} from 'react'
import SearchBook from './SearchBook'
import BookShelfChanger from './BookShelfChanger'
//this is component for search result

class ResultSearch extends Component{
		render(){
			const {book}=this.props;
    {/* this step below for if book has not image*/}
			let bookImage=book.imageLinks ? book.imageLinks.thumbnail :'https://cdn3.iconfinder.com/data/icons/security-2-1/512/restricted-128.png'
			return (
                      
              <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${bookImage})`}}>
                        </div>
                          {/* we will use bookShlefChanger from component */}
                          <BookShelfChanger book={book} changeShelf={this.props.changeShelf}/> 
                    </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
              </div>
                      
				)
		}
                    
                    
}
export default ResultSearch