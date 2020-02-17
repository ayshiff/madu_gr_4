import React, { useState } from "react";
import { Form, Input, Radio, Switch, Row, Col, Upload, Icon, Modal } from "antd";
import "antd/dist/antd.css";

export const FormStep2 = () => {
    const [previewVisible, SetPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        SetPreviewVisible(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    const { TextArea } = Input;
    const InputGroup = Input.Group;

    // const InputStyle = {
    //     width: "70px",
    //     height: "30px",
    //     boxSizing: "border-box",
    //     border: "1px solid #D9D9D9",
    //     borderRadius: "4px"
    // };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader);
            reader.onerror = error => reject(error);
        });
    }

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Form
            layout="vertical"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            name="nest-messages"
        >
            <Form.Item>
                <h1>Horaires</h1>
                <div>
                    <ul>
                        <li style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                            <h1 style={{ marginRight: "50px" }}>Lundi</h1>
                            <Switch style={{ marginRight: "10px" }} />
                            <p style={{ marginRight: "10px", color: "#BFBFBF" }}>Fermé</p>
                            <input
                                style={{
                                    width: "70px",
                                    height: "30px",
                                    boxSizing: "border-box",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "4px",
                                }}
                                type="text"
                            />
                            <input
                                style={{
                                    width: "70px",
                                    height: "30px",
                                    boxSizing: "border-box",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "4px",
                                }}
                                type="text"
                            />
                            <span style={{ marginLeft: "10px", marginRight: "10px" }}>-</span>
                            <input
                                style={{
                                    marginRight: "5px",
                                    width: "70px",
                                    height: "30px",
                                    boxSizing: "border-box",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "4px",
                                }}
                                type="text"
                            />
                            <input
                                style={{
                                    width: "70px",
                                    height: "30px",
                                    boxSizing: "border-box",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "4px",
                                }}
                                type="text"
                            />
                        </li>
                    </ul>
                </div>
            </Form.Item>
            <Form.Item>
                <h1>Prix</h1>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">€</Radio.Button>
                    <Radio.Button value="b">€€</Radio.Button>
                    <Radio.Button value="c">€€€</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <div className="clearfix">
                <h1>
                    Images <span style={{ color: "grey" }}>(maximum 4)</span>
                </h1>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null}>
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </div>
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
