import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function BookFormModal(props) {
  let handleSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
      email: props.email
    }
    props.addBook(newBook);
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
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Control type="text" placeholder="Description" />
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Check type="checkbox" label="Read" />
          </Form.Group>
          <Button variant="dark" type='submit'>Add book</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
