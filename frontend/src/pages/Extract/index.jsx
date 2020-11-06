import React from 'react';
import  {Link} from 'react-router-dom';
import './styles.css'
import Table from 'react-bootstrap/Table'
import { BsArrowLeftShort } from "react-icons/bs";

export default function Extract() {
    
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
                        <tr>
                            <td>JOAO</td>
                            <td>7897897</td>
                            <td>5.000,00</td>
                            <td>01/01/2020</td>
                        </tr>
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