import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './FirstPage.css'

function FirstPage() {

  return (
    <>
      <div className="backimage">
        <h1 className="heading">Login</h1>
        <Row className="inputfieeld">
          <Col>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Row>
        <Row className="inputfieeld">
          <Col>
            <Form.Control type='password' placeholder="Email" />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FirstPage
