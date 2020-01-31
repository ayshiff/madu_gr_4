import React from "react";
import { Form, Input, Radio } from "antd";
import "antd/dist/antd.css";

export const FormStep2 = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
    };

    const { TextArea } = Input;

    return (
        <Form {...layout} name="nest-messages">
            <Form.Item label="Lien du site, réseau sociaux">
                <Input />
            </Form.Item>
            <Form.Item label="Upload photos">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">€</Radio.Button>
                    <Radio.Button value="b">€€</Radio.Button>
                    <Radio.Button value="c">€€€</Radio.Button>
                    <Radio.Button value="d">€€€€</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Upload"></Form.Item>
            <Form.Item label="Description">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    );
};

export default FormStep2;
