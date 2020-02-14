import React from "react";
import { Form, Input, Radio, Switch, Row, Col, Upload } from "antd";
import "antd/dist/antd.css";

export const FormStep2 = () => {
    const { TextArea } = Input;
    const InputGroup = Input.Group;

    return (
        <Form
            layout="vertical"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            name="nest-messages"
        >
            <Form.Item label="Horaires">
                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"></Upload>
            </Form.Item>
            <Form.Item>
                <h1>Prix</h1>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">€</Radio.Button>
                    <Radio.Button value="b">€€</Radio.Button>
                    <Radio.Button value="c">€€€</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Upload photos"></Form.Item>
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
            <Form.Item>
                <h1>Tags</h1>
                <TextArea rows={4} />
            </Form.Item>
        </Form>
    );
};

export default FormStep2;
