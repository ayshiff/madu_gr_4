import React, { useEffect } from "react";
import { Layout, Input, Button, Table } from "antd";
import { useStores } from "madu/hooks/use-store";
import { observer } from "mobx-react";

const { Header, Content } = Layout;

export const ListPoi = observer(() => {
    const { pointOfInterestStore } = useStores();
    useEffect(() => {
        pointOfInterestStore.get();
    }, []);

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
                    <Search placeholder="Search" style={{ width: 250 }} />
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
                <Table
                    columns={columns}
                    dataSource={
                        pointOfInterestStore.all.length &&
                        pointOfInterestStore.all.map((el, ind) => {
                            return {
                                key: ind,
                                nomDuLieu: el.name,
                                categorie: el.poiType,
                                questionnr: el.status,
                                greenscore: el.greenscore,
                            };
                        })
                    }
                />
            </Content>
        </Layout>
    );
});
