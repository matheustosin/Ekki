import React, {useState} from 'react';
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


    // useEffect(() => {
    //     api.get("/user/1").then(response => {
    //         setUser(response.data);
    //     });
    // },[]);

    const openModalRegister = () => {
        setModalRegisterShow(true);
    }

    const openModalTransfer = () => {
        setModalTransferShow(true);
    }

    const saveContact = () => {
        const contactRequest = {
            nome: name, 
            accountNumber: account,
        }
        api.post('/contact', contactRequest).then( response => {
            if(response.data) {
                swal("Sucesso!", "Usuário cadastrado com sucesso!", "success");
            }
        }).catch(error => {
            swal("Ops!", error.message, "error");
        })

        
    }

    const transfer = () => {
        swal("contato salvo", "success");
    }

    const deleteContact = () => {
        swal("contato salvo", "success");   
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
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td className="center">
                                <Button variant="secondary" onClick={() => openModalTransfer()}>Transferir</Button>
                                <BsTrash className="pointer" size={25} color="red" onClick={() => deleteContact()}/>
                            </td>
                        </tr>
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
            <CustomModal show={modalTransferShow} onHide={() => setModalTransferShow(false)} title={"Transferir"} eventsave={transfer}>
                <Form>
                    <Form.Group>
                        <Form.Label>Valor R$</Form.Label>
                        <Form.Control onChange={event => setName(event.target.value)} placeholder="Insira um valor" />
                    </Form.Group>
                </Form>
            </CustomModal>
       </div>
    )
}