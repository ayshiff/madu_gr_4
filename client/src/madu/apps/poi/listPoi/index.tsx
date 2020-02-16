import React from "react";
import { Layout, Input, Button, Table, Divider } from "antd";

const { Header, Content } = Layout;

export const ListPoi = () => {
    const tableData = [
        {
            key: "1",
            nomDuLieu: "Wild & the Moon",
            categorie: "Restaurant",
            questionnr: "En Attente",
            greenscore: 72,
            address: "10 Downing Street",
        },
        {
            key: "2",
            nomDuLieu: "Season",
            categorie: "Restaurant",
            questionnr: "En attente",
            greenscore: 42,
            address: "10 Downing Street",
        },
        {
            key: "3",
            nomDuLieu: "Nous Valmy",
            categorie: "Boutique",
            questionnr: "En Attente",
            greenscore: 72,
            address: "10 Downing Street",
        },
        {
            key: "4",
            nomDuLieu: "Simone Lemon",
            categorie: "Experience",
            questionnr: "En attente",
            greenscore: 42,
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
            dataIndex: "questionnr",
            key: "questionnr",
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
                    <span>Edit</span>
                    <Divider type="vertical" />
                    <span>Delete</span>
                </span>
            ),
        },
    ];

    const headerStyle = {
        background: "#fff",
        padding: 0,
        display: "flex",
        justifyContent: "space-between",
    };

    const titleStyle = {
        marginLeft: "20px",
        fontWeight: 500,
        fontSize: "28px",
    };

    const { Search } = Input;
    return (
        <Layout style={{ height: "100%" }}>
            <Header style={headerStyle}>
                <h1 style={titleStyle}>Liste des points d’intêret</h1>
                <div>
                    <Search
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: 250 }}
                    />
                    <Button type="primary" style={{ marginRight: "20px", marginLeft: "40px" }}>
                        <a href="/poi/create">+ Ajouter un point d’intêret</a>
                    </Button>
                </div>
            </Header>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                }}
            >
                <Table columns={columns} dataSource={tableData} />
            </Content>
        </Layout>
    );
};
