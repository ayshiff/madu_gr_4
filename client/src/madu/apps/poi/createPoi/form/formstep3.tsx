import React from "react";
import { Select, Form } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

const textAreaStyle = {
    width: "80%",
    height: "600px",
    marginBottom: "50px",
};

const textAreaContainer = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
};

const FormStep4 = () => {
    return (
        <div>
            <Form
                layout="vertical"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 8 }}
                name="nest-messages"
            >
                <Form.Item style={{ marginLeft: "10%" }}>
                    <h1>Choisir template</h1>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder=" "
                        optionFilterProp="children"
                    >
                        <Option value="jack">Template restaurant</Option>
                        <Option value="lucy">Template boutique</Option>
                        <Option value="tom">Template expérience</Option>
                    </Select>
                </Form.Item>
                <div style={textAreaContainer}>
                    <textarea style={textAreaStyle} name="" id=""></textarea>
                </div>
            </Form>
        </div>
    );
};

export default FormStep4;
