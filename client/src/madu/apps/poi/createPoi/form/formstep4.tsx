import React, { useState } from 'react';
import {  Input, Radio, Select, Form } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const FormStep4 = () => {

    const [value, setValue] = useState(1)

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 4 },
      };     
      
    const { TextArea } = Input;      

    return(
        <div>
            <Form {...layout} name="nest-messages" >
                <Form.Item label="Type d'établissement" >
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Choisir template"
                    optionFilterProp="children"
                    >
                    <Option value="jack">Template 1</Option>
                    <Option value="lucy">Template 2</Option>
                    <Option value="tom">Template 3</Option>
                    </Select>   
                </Form.Item>
                <Form.Item label="Type d'établissement" >
                    <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                        <Radio style={radioStyle} value={1}>
                        Remplir directement le questionnR
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                        Envoyer le questionnR au client
                        {value === 2 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Type d'établissement" >
                 <TextArea/>
                </Form.Item>                                                
            </Form>            
            {/* <TextArea rows={4} col={4}/>             */}
        </div>
    )
}

export default FormStep4;