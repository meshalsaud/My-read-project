import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import ListBookHeader from './ListBookHeader'
import ShelfBook from './ShelfBook'
import SearchBook from './SearchBook'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './App.css'
//this is main component
class BooksApp extends Component {
  state = {
    books:[]
   

    }
    //we will take all books from BookAPI and set books
    componentDidMount(){
      BooksAPI.getAll().then((books) =>{
        this.setState({books:books})
       })
      
    }
    /* here we will use this function to select shelf depend on shelf name (we will this function in ShelfBook component ) */
    getBooksByTitle(shelfName){
      return this.state.books.filter((book) =>
        book.shelf ===shelfName
      
      )
      };
      //here we will use this function in the shelfBook component to change the shelf for book
      onChangeShelf=(book,newShelf)=>{
        BooksAPI.update(book,newShelf).then(()=>{
          book.shelf=newShelf;

          this.setState(state =>({
            books:this.state.books.filter(b=>b.id !== book.id).concat([book])
          })
            
          )

          })
      }

    //here we will render all component and we will use Route
  render(){
    return (
    <div className='app'>
    <Route exact path='/' render={()=>(

      <div className='list-book'>
        <ListBookHeader/> {/*this is component for header*/}
        <div className='list-book-content'>
        
        <ShelfBook 
        title='currently Reading'
        books={this.getBooksByTitle('currentlyReading')}
        changeShelf={this.onChangeShelf}
        />
        <ShelfBook 
        title='Want to read'
        books={this.getBooksByTitle('wantToRead')}
        changeShelf={this.onChangeShelf}
        />
        <ShelfBook 
        title='Read'
        books={this.getBooksByTitle('read')}
        changeShelf={this.onChangeShelf}

        />
        </div>
        <div className="open-search">
        {/* we use Link to nevegate between pages */}
        <Link 
        to="/search"
        > add book  </Link>
        </div>
      </div>
      )}
      />
      {/*here we will use searchBook component and we need books and changeShelf as props*/}
      <Route path='/search' render={({history})=>(
        <SearchBook

       books={this.state.books}
        changeShelf={this.onChangeShelf }

        />
        )}
        />
      
      
        
    </div>
    )
      }
  }


export default BooksApp
