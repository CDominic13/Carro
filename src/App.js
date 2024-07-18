import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Modal, Toast } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const products = [
  { title: 'Dead Space', price: 1400, img: 'Img/DeadSpace.jpg', stripeUrl: 'https://buy.stripe.com/test_5kAeWFeG65lT6K4cMN' },
  { title: 'Mass Effect Definitive edition', price: 1600, img: 'Img/MassEffect.jpg', stripeUrl: 'https://buy.stripe.com/test_8wM15P55weWt9WgdQQ' },
  { title: 'Stardew Valley', price: 600, img: 'Img/StarDewValley.jpg' },
  { title: 'Stellaries', price: 1400, img: 'img/Stellaries.jpg' },
  { title: 'Persona 5 Royal', price: 1200, img: 'Img/OIP.jpg' },
  { title: 'The witcher 3: Wild Hunt', price: 1200, img: 'Img/TheWitcher.jpg' },
];

const Store = () => {
  const [show, setShow] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowToast(true);
  };

  const redirectToStripe = (stripeUrl) => {
    window.open(stripeUrl, '_blank'); // Abre la URL en una nueva pestaña
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Tienda</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#cart">Carrito</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <header className="my-4">
        <Container>
          <h1 className="text-center">Tienda de productos</h1>
          <hr />
        </Container>
      </header>

      <Container className="store">
        <Row>
          {products.map((product, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <Card className="shadow">
                <Card.Img variant="top" src={product.img} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.price}$</Card.Text>
                  {product.stripeUrl ? (
                    <Button variant="primary" onClick={() => redirectToStripe(product.stripeUrl)}>COMPRAR AHORA</Button>
                  ) : (
                    <Button variant="primary" onClick={() => addToCart(product)}>AÑADIR AL CARRITO</Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <section className="shopping-cart my-4">
        <Container>
          <h1 className="text-center">CARRITO</h1>
          <hr />
          <Row>
            <Col xs={6}><h6>Producto</h6></Col>
            <Col xs={2}><h6 className="text-truncate">Precio</h6></Col>
            <Col xs={4}><h6>Cantidad</h6></Col>
          </Row>
          {cartItems.map((item, index) => (
            <Row key={index} className="shopping-cart-items">
              <Col xs={4}><div>{item.title}</div></Col>
              <Col xs={2}><div>{item.price}$</div></Col>
              <Col xs={4}>
                <input type="number" defaultValue="1" className="form-control" />
              </Col>
              <Col xs={2}>
                <Button variant="danger">X</Button>
              </Col>
            </Row>
          ))}
          <Row>
            <Col xs={12} className="d-flex align-items-center">
              <p className="mb-0">Total</p>
              <p className="ml-4 mb-0">{cartItems.reduce((total, item) => total + item.price, 0)}€</p>
              <Toast show={showToast} onClose={() => setShowToast(false)} className="ml-auto bg-info text-white">
                <Toast.Header>
                  <strong className="mr-auto">Elemento en el carrito</strong>
                </Toast.Header>
                <Toast.Body>Se aumentó correctamente la cantidad</Toast.Body>
              </Toast>
              <Button variant="success" className="ml-auto" onClick={() => setShow(true)}>Comprar</Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gracias por su compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pronto recibirá su pedido</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <footer className="bg-dark p-3 mt-5">
        <p className="text-center m-0 text-muted">Tienda video juegos</p>
      </footer>
    </>
  );
};

export default Store;