import React, { useState, useEffect } from 'react';
import  {Link} from 'react-router-dom';
import './styles.css'
import Table from 'react-bootstrap/Table'
import { BsArrowLeftShort } from "react-icons/bs";
import swal from 'sweetalert';
import api from '../../services/Api';

export default function Extract() {

    const [extract, setExtract] = useState();
    
    useEffect(() => {
        api.get("/user/extract/transfers").then(response => {
            setExtract(response.data);
        }).catch(error => {
            swal("Ops!", error.message, "error");
        });
    },[]);

    return(
        <div id="extract">
            <div className="title-extract">
                <h4>EXTRATO</h4>
            </div>
            <div className="content">
                <Table striped borderless hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Conta</th>
                            <th>Valor R$</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            extract && extract.map(e => {
                                return (
                                    <tr>
                                        <td>{e.name}</td>
                                        <td>{e.nr_account}</td>
                                        <td>{e.value}</td>
                                        <td>{e.dt_transfer}</td>
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
       </div>
    )
}