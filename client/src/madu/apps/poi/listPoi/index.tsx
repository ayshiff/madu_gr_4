import React from "react";
import { Layout, Input, Button, Table, Divider, Tag } from "antd";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

export const ListPoi = () => {
    const tableData = [
        {
            key: "1",
            nomDuLieu: "Wild & the Moon",
            categorie: "Restaurant",
            tags: ["En attente"],
            greenscore: "72/100",
            address: "10 Downing Street",
        },
        {
            key: "2",
            nomDuLieu: "Season",
            categorie: "Restaurant",
            tags: ["VALIDÉ"],
            greenscore: "42/100",
            address: "10 Downing Street",
        },
        {
            key: "3",
            nomDuLieu: "Nous Valmy",
            categorie: "Boutique",
            tags: ["En attente"],
            greenscore: "72/100",
            address: "10 Downing Street",
        },
        {
            key: "4",
            nomDuLieu: "Simone Lemon",
            categorie: "Experience",
            tags: ["VALIDÉ"],
            greenscore: "42/100",
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Nom du lieu",
            dataIndex: "nomDuLieu",
            key: "nomDuLieu",
        },
        {
            title: "Catégorie",
            dataIndex: "categorie",
            key: "categorie",
        },
        {
            title: "Suivi question",
            dataIndex: "tags",
            key: "tags",
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = "green";
                        if (tag === "En attente") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: "Greenscore",
            dataIndex: "greenscore",
            key: "greenscore",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <span>
                    <a style={{ color: "#1890FF" }}>Edit</a>
                    <Divider type="vertical" />
                    <a style={{ color: "#1890FF" }}>Delete</a>
                </span>
            ),
        },
    ];

    const headerStyle = {
        background: "#fff",
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
        marginTop: "40px",
    };

    const titleStyle = {
        marginLeft: "24px",
        paddingLeft: "24px",
        fontWeight: 900,
        fontSize: "28px",
    };

    const { Search } = Input;
    return (
        <Layout>
            <Layout style={{ backgroundColor: "#ffffff" }}>
                <Header style={headerStyle}>
                    <h1 style={titleStyle}>Liste des points d’intêret</h1>
                    <div>
                        <Search
                            placeholder="Search"
                            onSearch={value => console.log(value)}
                            style={{ width: 250 }}
                        />
                        <Button type="primary" style={{ marginRight: "50px", marginLeft: "40px" }}>
                            + Ajouter un point d’intêret
                        </Button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        background: "#fff",
                        minHeight: 840,
                    }}
                >
                    <Table
                        style={{ backgroundColor: "#ffffff" }}
                        columns={columns}
                        dataSource={tableData}
                        pagination={false}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};
