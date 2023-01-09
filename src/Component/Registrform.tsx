import React, {Dispatch, useState} from 'react';
import {Button, Form, Input, Select, Spin} from 'antd';
import {AuthActionCreators} from "../store/reducers/auth/actioncreator";
import {useDispatch} from "react-redux";
import {usetypedselector} from "../hooks/usetypedselector";
import { LoadingOutlined,CheckCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Registerform = () => {
    const [form] = Form.useForm();
    const {error,isLoading}=usetypedselector(state=>state.auth)
    const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
    const dispatch: Dispatch<any> = useDispatch()
    const onFinish = (values: any) => {
       dispatch(AuthActionCreators.register(values))
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="380">380</Option>
                <Option value="42">42</Option>
            </Select>
        </Form.Item>
    );

    return (
        error=="succes"?<div style={{height:"380px",width:"450px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CheckCircleOutlined style={{fontSize:"42px"}} onLoad={()=>console.log(1)} /></div>:
        isLoading?
              <div style={{height:"380px",width:"450px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Spin indicator={antIcon}/></div>
                :
                <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
            prefix: '380',
        }}
        scrollToFirstError
    >
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
            ]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            hasFeedback
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error('The two passwords that you entered do not match!')
                        );
                    },
                }),
            ]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
                {
                    required: true,
                    message: 'Please input your nickname!',
                    whitespace: true,
                },
            ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{required: true, message: 'Please input your phone number!'}]}
        >
            <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
            name="gender"
            label="Gender"
            rules={[{required: true, message: 'Please select gender!'}]}
        >
            <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
            </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <div style={{display: "flex"}}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <p style={{color: "red", margin: "5px", marginLeft: "14px"}}>{error}</p></div>
        </Form.Item>
    </Form>

    );
};

export default Registerform;