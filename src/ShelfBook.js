import React, {Component} from 'react'
import './App.css'
import BookShelfChanger from './BookShelfChanger'
//this component for Shelf books
class ShelfBook extends Component{
    render(){
      return (
          <div className="bookshelf">
          {/* we will use props title to select the title for each shelf and maping over props books and render it */}
                  <h2 className="bookshelf-title">{this.props.title}</h2> 
                  <div className="bookshelf-books">

                    <ol className="books-grid">
                    {this.props.books.map((book)=>(
                      <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                            </div> 
                          <BookShelfChanger book={book} changeShelf={this.props.changeShelf}/> 
                        </div>

                          
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                      </div>
                      </li>
                      ))}
                    </ol>
                  </div>
        </div>
        )

    }                    
}
                    
                    	
export default ShelfBook
