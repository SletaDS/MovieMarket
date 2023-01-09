import React, {Dispatch, useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/actioncreator";
import {usetypedselector} from "../hooks/usetypedselector";
import Registrform from "./Registrform";
const Formlog = () => {
    const  {error,isLoading}=usetypedselector(state=>state.auth)
    const dispatch: Dispatch<any> = useDispatch()
     const [email,setemail]=useState(' ')
     const [password,setpassword]=useState(' ')
    const onFinish = () => {
      dispatch(AuthActionCreators.login(email,password))
    };
    const [isModalOpen, setIsModalOpen] = useState(false);


    if(error=="succes"){
        setTimeout(()=>setIsModalOpen(false),2000)
    }

    return (
        <Form
            name="normal_login"
            style={{
                width: '350px',
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            {error && <div style={{color:"red"}}>{error}</div>}
            <Form.Item

                name="email"
                rules={[{ required: true, message:'Please input your email!'  }]}
            >
                <Input
                    value={email}
                    onChange={e=>setemail(e.target.value)}
                    style={{
                        padding: '10px',
                    }}
                    type="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input
                    value={password}
                    onChange={e=>setpassword(e.target.value)}
                    style={{
                        padding: '10px'
                    }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button

                     loading={isLoading}

                    type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Log in
                </Button>
                <a style={{color:"whitesmoke"}}>Or</a> <a onClick={()=> setIsModalOpen(true)}>register now!</a>
                <Modal title="Register " open={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}>
                    <div><Registrform/></div>
                </Modal>
            </Form.Item>
        </Form>
    );
};
export default Formlog;