import React, {FC} from 'react';
import {Layout,Row} from "antd";
import "../app.css"
import Formlog from "../Component/Formlog";
const Login:FC = () => {
    return (<div>
            <Row justify="center" align="middle"  className={'heigth100'} >
                <Formlog/></Row>
</div>

    );
};

export default Login;