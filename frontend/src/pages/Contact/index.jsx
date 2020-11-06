import React, {useState, useEffect} from 'react';
import './styles.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { BsFillPersonPlusFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form'
import CustomModal from '../../components/CustomModal'
import { BsArrowLeftShort, BsTrash } from "react-icons/bs";
import  {Link} from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../services/Api';

export default function Contact() {
    const [modalRegisterShow, setModalRegisterShow] = useState(false);
    const [modalTransferShow, setModalTransferShow] = useState(false);
    const [name, setName] = useState("");
    const [account, setAccount] = useState("");
    const [listContacts, setListContacts] = useState([]);

    const [valueToTransfer, setValueToTransfer] = useState(0);
    const [contact, setContact] = useState({});

    useEffect(() => {
        api.get("/contact").then(response => {
            setListContacts(response.data);
        }).catch(error => {
            swal("Ops!", error.message, "error");
        });;
    },[listContacts]);

    const openModalRegister = () => {
        setModalRegisterShow(true);
    }

    const openModalTransfer = (contact) => {
        setContact(contact);
        setModalTransferShow(true);
    }

    const saveContact = () => {
        const contactRequest = {
            name: name, 
            accountNumber: account,
        }
        api.post('/contact', contactRequest).then( response => {
            if(response.data) {
                swal("Sucesso!", "Usuário cadastrado com sucesso!", "success");
            }
        }).catch(error => {
            swal("Ops!", error.message, "error");
        });
    }

    const deleteContact = (contact) => {
        const id = contact.id;
        api.delete(`/contact/${id}`).then(response => {
            if (response.status === 200) {
                swal("Sucesso!", "Contato removido com sucesso!", "success");
            }
        }).catch(error => {
            swal("Ops!", error.message, "error");
        });
    }

    const transfer = () => {
        const transferRequest = {
            accountNumber: contact.account.nr_account,
            value: valueToTransfer
        }
        console.log(transferRequest)
        api.post('/account/transfer', transferRequest).then(response => {
            if (response.status === 200) {
                swal("Sucesso!", "Transferência realizada com sucesso!", "success");
            }
        }).catch(error => {
            swal("Ops!", error.message, "error");
        });
        
    }

    return(
        <div id="contact">
            <div className="button-add-contact">
                <h4>CONTATOS</h4>
                <BsFillPersonPlusFill size={25} className="pointer" onClick={() => openModalRegister()}/>
            </div>
            <div className="content">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Conta</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listContacts && listContacts.map(e => {
                                return(
                                    <tr>
                                        <td>{e.name}</td>
                                        <td>{e.account.nr_account}</td>
                                        <td className="center">
                                            <Button variant="secondary" onClick={() => openModalTransfer(e)}>Transferir</Button>
                                            <BsTrash className="pointer" size={25} color="red" onClick={() => deleteContact(e)}/>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </Table>
            </div>
            <div className="return">
                <Link to="/">
                    <BsArrowLeftShort size={40}/>
                </Link>
            </div>
            <CustomModal show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} title={"Cadastrar contato"} eventsave={saveContact}>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control onChange={event => setName(event.target.value)} placeholder="Insira o nome do contato" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Conta</Form.Label>
                        <Form.Control onChange={event => setAccount(event.target.value)} placeholder="Insira o número da conta" />
                    </Form.Group>
                </Form>
            </CustomModal>
            <CustomModal
                show={modalTransferShow}
                onHide={() => setModalTransferShow(false)}
                title={"Transferir"}
                eventsave={transfer}
            >
                <Form>
                    <Form.Group>
                        <Form.Label>Valor R$</Form.Label>
                        <Form.Control onChange={event => setValueToTransfer(event.target.value)} placeholder="Insira um valor" />
                    </Form.Group>
                </Form>
            </CustomModal>
       </div>
    )
}