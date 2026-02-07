import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useEffect } from "react";
import './API_From.css'
import { useState } from 'react';
import axios from "axios";

function API_From() {

    const [FirstNameField, setFirstNameField] = useState("");
    const [LastNameField, setLastNameField] = useState("");
    const [PhoneNumberField, setPhoneNumberField] = useState("");
    const [EmailField, setEmailField] = useState("");


    const updateFirstNameField = (event) => {
        setFirstNameField(event.target.value)
        // console.log(FirstNameField)
    }

    const updateLastNameField = (event) => {
        setLastNameField(event.target.value)
    }

    const updatePhoneNumberField = (event) => {
        setPhoneNumberField(event.target.value)
        // console.log(PhoneNumberField)
    }

    const updateEmailField = (event) => {
        setEmailField(event.target.value)
        console.log(EmailField)
    }


    const [mainAry, setmainAry] = useState([]);

    const [clickid, setclickid] = useState("")



    const submit = () => {

        if (FirstNameField == "") {
            alert("Fill The First Name Box")
            return;
        }
        else if (!isNaN(Number(FirstNameField))) {
            alert("Only Fill the Letter Box")
            return;
        }

        if (LastNameField == "") {
            alert("Pleace Fill The Last Name Box")
            return;
        }
        else if (!isNaN(Number(LastNameField))) {
            alert("Only Fill the Letter Box")
            return;
        }

        if (PhoneNumberField == "") {
            alert("Fill the Phone Number Box")
            return;
        }
        else if (PhoneNumberField.length < 10 || PhoneNumberField.length > 10) {
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

        if (clickid == "") {
            axios.post('http://localhost:3000/items', { FirstName: FirstNameField, LastName: LastNameField, PhoneNumber: PhoneNumberField, Email: EmailField })
                .then(Datas => {

                    console.log(Datas.data)
                    resultpm();

                }).catch(error => {
                    console.log(error)
                })
        }
        else if (clickid != "") {
            axios.put(`http://localhost:3000/items/${clickid}`, { FirstName: FirstNameField, LastName: LastNameField, PhoneNumber: PhoneNumberField, Email: EmailField }).
                then(resultdata => {
                    console.log(resultdata.data)
                    resultpm();

                }).catch(error => {
                    console.log(error)
                })
        }

        setFirstNameField("")
        setLastNameField("")
        setPhoneNumberField("")
        setEmailField("")
    }


    useEffect(() => {

        resultpm();

    }, []);


    const resultpm = () => {
        axios.get('http://localhost:3000/items').then(Datas => {

            setmainAry(Datas.data)

        }).catch(error => {
            console.log(error)
        })
    }

    const Edit = (id) => {

        setclickid(id)
        let editAry = mainAry.filter((element, index) => {
            if (id == element.id) {
                return element
            }
        })
        let firstname = editAry[0].FirstName
        let lastname = editAry[0].LastName
        let phonenumber = editAry[0].PhoneNumber
        let email = editAry[0].Email

        setFirstNameField(firstname)
        setLastNameField(lastname)
        setPhoneNumberField(phonenumber)
        setEmailField(email)

    }

    const Deleted = (id) => {
        if (confirm("are you sure do you want delete the data?") == true) {

            axios.delete(`http://localhost:3000/items/${id}`).
                then(deletdata => {

                    resultpm();
                    alert("deleted successfully")
                    console.log(deletdata.data)

                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const cancel = () => {
        setFirstNameField("")
        setLastNameField("")
        setPhoneNumberField("")
        setEmailField("")
    }



    return (
        <>
            <div>
                <div>
                    <Row className='input-field'>
                        <Col md="2">First Name</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder="First Name" value={FirstNameField} onChange={updateFirstNameField} />
                        </Col>
                        <Col md="2">Last Name</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder="Last Name" value={LastNameField} onChange={updateLastNameField} />
                        </Col>
                        <Col md="2"> Phone Number</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder="Phone Number" value={PhoneNumberField} onChange={updatePhoneNumberField} />
                        </Col>
                    </Row>
                    <Row className='input-field'>
                        <Col md="2">Email Address</Col>
                        <Col md="2">
                            <Form.Control type="text" placeholder=" Email Address" value={EmailField} onChange={updateEmailField} />
                        </Col>
                    </Row>
                </div>
                <div className='button-field'>
                    <span className='sub-butn'>
                        <Button variant="primary" onClick={e => submit()}>Submit</Button>
                    </span>
                    <span>
                        <Button variant="danger" onClick={e => cancel()}>Cancel</Button>
                    </span>
                </div>

                <div className='table-Field'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>PhoneNumber</th>
                                <th>Email</th>
                                <th>Acction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mainAry.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{element.FirstName}</td>
                                            <td>{element.LastName}</td>
                                            <td>{element.PhoneNumber}</td>
                                            <td>{element.Email}</td>
                                            <td>
                                                {
                                                    <div>
                                                        <span>
                                                            <Button variant="btn" onClick={e => Edit(element.id)}><i className="bi bi-pencil-square"></i></Button>
                                                        </span>
                                                        <span>
                                                            <Button variant="btn" onClick={e => Deleted(element.id)}><i className="bi bi-trash2-fill"></i></Button>
                                                        </span>
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

export default API_From
