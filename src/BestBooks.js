import React from 'react';
import axios from 'axios';
import Pic from './stars.jpeg'
import BookFormModal from './BookFormModal'
import { Button, Container, Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookForm: false
    }
  }
  
  url = `${process.env.REACT_APP_SERVER}/books`;
  /* DONE: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    let booksData = await axios.get(this.url);
    this.setState({books: booksData.data});
  }

  componentDidMount() {
    this.getBooks()
  }

  addBook = async (book) => {
    try {
      let addedBook = await axios.post(this.url, book);
      this.setState({ books: [...this.state.books, addedBook.data]});
    } catch(err) {
      console.error(err)
    }
  }

  deleteBook = async (id) => {
    try {
      await axios.delete(this.url + '/' + id);
      // need to update state, for updated list to render w/o making a new API call
    } catch(err) { console.error(err) }
  }

  handleClose = () => { this.setState({showBookForm: false})}

  render() {
    /* DONE: render user's books in a Carousel */
    let bookList = this.state.books.map((b,i) => 
      <Carousel.Item key={i}>
         <img className="d-block w-100" src={Pic} alt='Slide'/>
         <Carousel.Caption>
          <h5>{b.title}</h5>
          <p>{b.description}</p>
          <Button variant="outline-light" size="sm" onClick={() => this.deleteBook(b._id)}>Delete Book</Button>
         </Carousel.Caption>
       </Carousel.Item>
    )

    return (
      <>
        <Container>
          <h4>My Essential Lifelong Learning &amp; Formation Shelf</h4>
          <Button variant="outline-dark" size="sm" onClick={() => this.setState({showBookForm: true})}>Add new book</Button>
        </Container>
        <BookFormModal
          show={this.state.showBookForm}
          handleClose={this.handleClose}
          addBook={this.addBook}
          email={this.props.user.email}/>
        
        {this.state.books.length ?
          <Container>
            <Carousel >{bookList}</Carousel>
          </Container>
          : <h3>No Books Found :(</h3>
        }
        <br></br>
      </>
    )
  }
}

export default BestBooks;
