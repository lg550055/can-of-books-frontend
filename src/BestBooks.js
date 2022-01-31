import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Pic from './stars.jpeg'
import BookFormModal from './BookFormModal'
import UpdateModal from './UpdateModal';
import { Button, Container, Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBookForm: false,
      showUpdateForm: false
    }
  }
  
  url = `${process.env.REACT_APP_SERVER}/books`;  //class variable to avoid repetition

  getBooks = async () => {
    if (this.props.auth0.isAuthenticaded) {
      const responseFromAuth0 = await this.props.auth0.getIdTokenClaims();
      const jwt = responseFromAuth0.__raw; // notice double underscore
      console.log(jwt);
      // per axios docs; property names are specific
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/books',
        headers: { "Authorization": `Bearer ${jwt}`}
      }
      let books = await axios.get(config);
      this.setState({books: books.data});  
    }
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
      let updatedBooks = this.state.books.filter(bk => bk._id !== id);
      this.setState({books: updatedBooks})
    } catch(err) { console.error(err) }
  }

  updateBook = async (book) => {
    try {
      let uBook = await axios.put(this.url + '/' + book._id, book);
      let updatedBooks = this.state.books.map(bk => bk._id === uBook.data._id ? uBook.data : bk);
      this.setState({books: updatedBooks})
    } catch(err) { console.error(err) }
  }
  
  handleClose = () => { this.setState({showBookForm: false, showUpdateForm: false}) }

  render() {
    let bookList = this.state.books.map((b,i) => 
      <Carousel.Item key={i}>
         <img className="d-block w-100" src={Pic} alt='Slide'/>
         <Carousel.Caption>
          <h5>{b.title}</h5>
          <p>{b.description}</p>
          <Button variant="outline-light" size="sm" onClick={() => this.setState({showUpdateForm: true})}>Delete/Update Book</Button>
          <UpdateModal show={this.state.showUpdateForm} book={b} handleClose={this.handleClose} updateBook={this.updateBook} deleteBook={this.deleteBook}/>
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
          email={this.props.auth0.user.email}/>
        
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

export default withAuth0(BestBooks);
