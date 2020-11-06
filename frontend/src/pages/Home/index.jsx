import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Card from '../../components/Card';
import Field from '../../components/Field';
import api from '../../services/Api';
import Button from 'react-bootstrap/Button';

export default function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        api.get("/user/1").then(response => {
            setUser(response.data);
        });
    },[]);

    return(
        <div id="home">
            <Card>
                <div className="container">
                    <div className="user-info">
                        <Field title={"Nome"} description={user.name}/>
                        <Field title={"CPF"} description={user.cpf}/>
                        <Field title={"Telefone"} description={user.phone}/>
                    </div>
                    <div className="account-info">
                        <div className="account-detail">
                            <label>Saldo</label>
                            <div className="circle">
                                {user.account && <span>R$ {user.account.balance}</span>}
                            </div>
                            <div>
                                <label>Limite</label>&nbsp;
                                {user.account && <span>R$ {user.account.limit_value}</span>}
                            </div>
                        </div>
                        <div className="buttons">
                            <Link to="/contact"> 
                                <Button variant="light">Contatos</Button>
                            </Link>
                            <Link to="/extract">
                                <Button variant="dark">Extrato</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}