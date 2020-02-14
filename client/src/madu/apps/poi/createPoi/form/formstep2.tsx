import React from "react";
import { Form, Input, Radio, Switch, Row, Col } from "antd";
import "antd/dist/antd.css";

export const FormStep2 = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
    };

    const { TextArea } = Input;
    const InputGroup = Input.Group;    

    return (
        <Form {...layout} name="nest-messages">
            <Form.Item label="Lien du site, réseau sociaux">
                <Input />
            </Form.Item>
            <Form.Item label="Prix">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">€</Radio.Button>
                    <Radio.Button value="b">€€</Radio.Button>
                    <Radio.Button value="c">€€€</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Upload photos">
            </Form.Item>
            <InputGroup size="default">
                <Row gutter={4}>
                    <Col span={4}>
                        <h1>A emporter</h1>
                        <Switch /> 
                    </Col>
                    <Col span={4}>
                        <h1>Accessibilité fauteuil</h1>
                        <Switch /> 
                    </Col>
                </Row>
            </InputGroup>                                 
            <Form.Item label="Tags">
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    );
};

export default FormStep2;
