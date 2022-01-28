import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function UpdateModal(props) {
  let handleSubmit = (e) => {
    e.preventDefault();
    let updatedBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: props.book.email,
      __v: props.book.__v,
      _id: props.book._id
    }
    props.updateBook(updatedBook);
    props.handleClose();
  }

  let handleClick = () => {
    props.deleteBook(props.book._id);
    props.handleClose();
  }
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add book details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Control type="text" placeholder={props.book.title} />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Control type="text" placeholder={props.book.description} />
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Check type="checkbox" label="Read" />
          </Form.Group>
          <Button variant="outline-dark" size="sm" type='submit'>Update book</Button>
          <Button variant="outline-danger" size="sm" onClick={handleClick}>Delete book</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
