import React from "react";
import { Form, Input, Radio, Row, Col } from "antd";

import "antd/dist/antd.css";

function FormStep1() {

    function onChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }    

    const { TextArea } = Input;
    const InputGroup = Input.Group;    

    return (
        <Form layout="vertical" labelCol={{ span: 3 }} wrapperCol={{span: 8}} name="nest-messages">
            <Form.Item>
                <h1>Nom de l'établissement</h1>
                <Input />
            </Form.Item>          
            <Form.Item >
                <h1>Catégorie</h1>
                <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">Restaurant</Radio.Button>
                    <Radio.Button value="b">Boutique</Radio.Button>
                    <Radio.Button value="c">Expérience</Radio.Button>
                </Radio.Group>
            </Form.Item>            
            <Form.Item>
                <h1>Type d'établissement</h1>
                <Input />
            </Form.Item>
            <InputGroup style={{ paddingBottom: "8px"}} size="default">
                <Row gutter={16}>
                    <Col span={4}>
                        <h1>Adresse</h1>
                        <Input />
                    </Col>
                    <Col span={2}>
                        <h1>Code postal</h1>
                        <Input />
                    </Col>
                </Row>
            </InputGroup>  
            <Form.Item>
                <h1>Numéro SIRET</h1>
                <Input />
            </Form.Item>
            <InputGroup style={{ paddingBottom: "8px"}} size="default">
                <Row gutter={16}>
                    <Col span={4}>
                        <h1>Email</h1>
                        <Input />
                    </Col>
                    <Col span={4}>
                        <h1>Téléphone</h1>
                        <Input />
                    </Col>
                </Row>
            </InputGroup>  
            <InputGroup style={{ paddingBottom: "8px"}}size="default">
                <Row gutter={16}>
                    <Col span={4}>
                        <h1>Lien du site</h1>
                        <Input />
                    </Col>
                    <Col span={4}>
                        <h1>Lien réseaux sociaux</h1>
                        <Input />
                    </Col>
                </Row>
            </InputGroup>  
            <Form.Item>
                <h1>Description</h1>
                <TextArea rows={4} />
            </Form.Item>                                    
        </Form>
    );
}

export default FormStep1;
