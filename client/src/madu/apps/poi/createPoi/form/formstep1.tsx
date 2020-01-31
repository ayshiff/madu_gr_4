import React from "react";
import { Form, Input } from "antd";

import "antd/dist/antd.css";

function FormStep1() {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
    };

    return (
        <Form {...layout} name="nest-messages">
            <Form.Item label="Nom">
                <Input />
            </Form.Item>
            <Form.Item label="Adresse">
                <Input />
            </Form.Item>
            <Form.Item label="Code Postal">
                <Input />
            </Form.Item>
            <Form.Item label="Téléphone">
                <Input />
            </Form.Item>
        </Form>
    );
}

export default FormStep1;
