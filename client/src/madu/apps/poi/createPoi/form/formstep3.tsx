import React from "react";
import { Form, Input, Radio } from "antd";
import "antd/dist/antd.css";

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}

export const FormStep3 = () => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
    };

    return (
        <div>
            <Form {...layout} name="nest-messages">
                <Form.Item label="Type d'établissement">
                    <Radio.Group onChange={onChange} defaultValue="a">
                        <Radio.Button value="a">Restaurant</Radio.Button>
                        <Radio.Button value="b">Boutique</Radio.Button>
                        <Radio.Button value="c">Expérience</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Type d'établissement">
                    <Input />
                </Form.Item>
                <Form.Item label="Préference alimentaire">
                    <Input />
                </Form.Item>
                <Form.Item label="Produit">
                    <Input />
                </Form.Item>
                <Form.Item label="Type cuisine">
                    <Input />
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormStep3;
