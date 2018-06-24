import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger'
import { Debounce } from 'react-throttle';
//here we create component for search part
class SearchBook extends Component{
  
  static propTypes={
    books:PropTypes.array.isRequired,
    changeShelf:PropTypes.func.isRequired
  }
 
  state={
    query:"",
    searchBook:[]
  }
  /* this updateQuery function will take query value and use search function in BooksAPI 
      if there are books match with query we will loop over books,we will defind matchBook and use props books to find 
      book id that match with book we have in the search if we find we will change shelf depend on matchBook shelf or 'none' for other
      if query is empty searchBook will be empty array
  */
  updateQuery=(query)=>{
    this.setState({query:query})
    if(query){
      BooksAPI.search(query.trim(),5).then((books)=>{
        if(books.length){
          books.forEach((book,index)=>{
                        let matchBook=this.props.books.find((b)=>b.id===book.id);
            book.shelf=matchBook? matchBook.shelf:'none';
            books[index]=book;

          });
        this.setState({
          searchBook:books
        })
      }
      else{
        this.setState({searchBook:[]}) 
      }

      
    });
    }
    else{
      this.setState({searchBook:[]})
    }
      
  }
  componenttWillUnmount(){
    this.updateQuery('')
  }

    

    
  render(){
        
    return (
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <Debounce time="400" handler="onChange">
                <input
                type="text" 
                placeholder="Search by title or author"  
                onChange={(event)=>this.updateQuery(event.target.value)} 
                />
                </Debounce>
                

              </div>
            </div>
            <div className="search-books-results">
              <ol className='books-grid' >
                   {/* map over searchBook and render books */} 
                  {this.state.searchBook.map((book)=>(
                    <li key={book.id} className='contact-list-item'>
                      <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                            </div>
                          {/* we will use bookShlefChanger from component */}
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
export default SearchBook;