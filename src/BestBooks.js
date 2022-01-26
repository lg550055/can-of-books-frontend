import axios from 'axios';
import React from 'react';
import { Button, Card, Carousel, Form } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    let booksData = await axios.get(url);
    this.setState({books: booksData.data});
  }

  componentDidMount() {
    this.getBooks()
  }

  addBook = async (book) => {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    let result = await axios.post(url, book);
    console.log(result.data);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: this.props.user.email
    }
    this.addBook(newBook);
  }

  render() {
    /* TODO: render user's books in a Carousel */
    let bookList = this.state.books.map((b,i) => 
      <Card key={i}>
        <Card.Body>
          <Card.Title>{b.title}</Card.Title>
          <Card.Text>{b.description}</Card.Text>
        </Card.Body>
      </Card>
      // <Carousel.Item key={i}>
      //    <img src='./goodhacker.png' alt=''/>
      //    <Carousel.Caption>
      //     <h5>{b.title}</h5>
      //     <p>{b.description}</p>
      //    </Carousel.Caption>
      //  </Carousel.Item>
    )

    return (
      <>
        <h4>My Essential Lifelong Learning &amp; Formation Shelf</h4>

        {this.state.books.length ?
          <>{bookList}</>
          // <Carousel style={{height: '200px'}}>{bookList}</Carousel>
          : <h3>No Books Found :(</h3>
        }

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Control type="text" placeholder="Status" />
          </Form.Group>
          <Button type='submit'>Add book</Button>
        </Form>
      </>
    )
  }
}

export default BestBooks;
