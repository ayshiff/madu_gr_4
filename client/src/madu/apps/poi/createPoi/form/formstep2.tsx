import React from 'react';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';

export const FormStep2 = () => {

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
      };      

    return(
     <Form {...layout} name="nest-messages">
        <Form.Item label="Lien du site, réseau sociaux">
          <Input />
        </Form.Item>
        <Form.Item label="Téléphone">
          <Input />
        </Form.Item>
      </Form>
    )
}

export default FormStep2;