import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './Formvalidation.css'
import { useState } from "react";

function Formvalidation() {

    const [Firstnamefield, setFirstnamefield] = useState("");
    const [LastnameField, setLastnameField] = useState("");
    const [PhonenumberField, setPhonenumberField] = useState("");
    const [EmailField, setEmailField] = useState("");


    const updateFirstnamefield = (event) => {
        setFirstnamefield(event.target.value)
        // console.log(Firstnamefield)
    }

    const upadateLastnameField = (event) => {
        setLastnameField(event.target.value)
        // console.log(LastnameField)
    }

    const updatePhonenumberField = (event) => {
        setPhonenumberField(event.target.value)
        // console.log(PhonenumberField)
    }

    const updateEmailField = (event) => {
        setEmailField(event.target.value)
        // console.log(EmailField)
    }

    const [MaiAry, setMaiAry] = useState([
        {
            id: 1,
            FirstName: "raja",
            LastName: "J",
            Phonenumber: "1243658790",
            Email: "raja@gmail.com",
        }
    ])

    const [cpMaiAry, setcpMaiAry] = useState([
        {
            id: 1,
            FirstName: "raja",
            LastName: "J",
            Phonenumber: "1243658790",
            Email: "raja@gmail.com",
        }
    ])


    const [Clickid, setClickid] = useState("")

    const Submit = () => {

        if (Firstnamefield == "") {
            alert("Fill The First Name Box")
            return;
        }
        else if (!isNaN(Number(Firstnamefield))) {
            alert("Only Fill the Letter Box")
            return;
        }

        if (LastnameField == "") {
            alert("Pleace Fill The Last Name Box")
            return;
        }
        else if (!isNaN(Number(LastnameField))) {
            alert("Only Fill the Letter Box")
            return;
        }

        if (PhonenumberField == "") {
            alert("Fill the Phone Number Box")
            return;
        }
        else if (PhonenumberField.length < 10 || PhonenumberField.length > 10) {
            alert("phone number is lessthan 10 digits Box")
            return;
        }

        if (EmailField == "") {
            alert("Pleace Fill The Email Box")
            return;
        }
        else if (!EmailField.includes("@") || !EmailField.includes(".com")) {
            alert("Pleace Enter Correct Email")
            return;

        }


        if (Clickid == "") {

            let NewAry = []

            NewAry = JSON.parse(JSON.stringify(MaiAry));

            let id = NewAry.length + 1;

            NewAry.push({
                FirstName: Firstnamefield,
                LastName: LastnameField,
                Phonenumber: PhonenumberField,
                Email: EmailField,
                id: id,

            })
            setMaiAry(NewAry)
            setcpMaiAry(NewAry)
            // console.log(NewAry)
        }

        else if (Clickid != "") {

            let SecondAry = []

            SecondAry = JSON.parse(JSON.stringify(MaiAry));

            let ResultAry = MaiAry.map((element, index) => {

                if (Clickid == element.id) {
                    element.FirstName = Firstnamefield,
                        element.LastName = LastnameField,
                        element.Phonenumber = PhonenumberField,
                        element.Email = EmailField


                    return element
                }
                else {
                    return element
                }
            })

            setMaiAry(ResultAry)
            setcpMaiAry(ResultAry)
        }

        setFirstnamefield("")
        setLastnameField("")
        setPhonenumberField("")
        setEmailField("")
    }

    const edit = (id) => {

        setClickid(id)

        let editAry = MaiAry.filter((element, index) => {
            if (id == element.id) {
                return element
            }
        })
        let firstname = editAry[0].FirstName
        let lastname = editAry[0].LastName
        let phonenumber = editAry[0].Phonenumber
        let email = editAry[0].Email

        setFirstnamefield(firstname)
        setLastnameField(lastname)
        setPhonenumberField(phonenumber)
        setEmailField(email)


    }

    const deleted = (id) => {

        let deletAry = MaiAry.filter((element, index) => {
            if (id != element.id) {
                alert("deleted successfully")
                return element
            }
        })
        setMaiAry(deletAry)
    }

    return (
        <>
            <div className="inputfield">
                <h1 className="headingfield">Login</h1>
                <div>
                    <Row className="inputfield">
                        <Col md="2">First Name</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder="First Name" value={Firstnamefield} onChange={updateFirstnamefield} />
                        </Col>
                        <Col md="2">Last Name</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder="Last Name" value={LastnameField} onChange={upadateLastnameField} />
                        </Col>
                        <Col md="2">Phone Number</Col>
                        <Col md="2">
                            <Form.Control type="number" placeholder="Phone Number" value={PhonenumberField} onChange={updatePhonenumberField} />
                        </Col>
                    </Row>
                    <Row className="inputfield">
                        <Col md="2">Email Address</Col>
                        <Col md="2">
                            <Form.Control type="email" placeholder="Email Address" value={EmailField} onChange={updateEmailField} />
                        </Col>
                    </Row>
                    <div className="sub-cancel-button-field">
                        <span className="sub-button-field">
                            <Button variant="primary" onClick={e => Submit()}>Submit</Button>
                        </span>
                        <span>
                            <Button variant="danger">Cancel</Button>
                        </span>
                    </div>

                </div>

                <div className="tablefield">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Acction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                MaiAry.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{element.FirstName}</td>
                                            <td>{element.LastName}</td>
                                            <td>{element.Phonenumber}</td>
                                            <td>{element.Email}</td>
                                            <td>
                                                {
                                                    <div>
                                                        <div>
                                                            <span>
                                                                <Button variant="btn" onClick={e => edit(element.id)}><i className="bi bi-pencil-square"></i></Button>
                                                            </span>
                                                            <span>
                                                                <Button variant="btn" onClick={e => deleted(element.id)}><i className="bi bi-trash2-fill"></i></Button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )

                                })
                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Formvalidation
