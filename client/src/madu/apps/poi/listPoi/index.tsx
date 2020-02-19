import React, { useEffect } from "react";
import { Layout, Input, Button, Table, Popconfirm, Icon, Tag } from "antd";
import { useStores } from "madu/hooks/use-store";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import styled from "styled-components";

const { Header, Content } = Layout;

const CustomLink = styled.div`
    color: #1790ff;
    &:hover {
        cursor: pointer;
    }
`;

const hashMap = {
    application: "grey",
    canvassing: "orange",
    surver_sent: "orange",
    surver_completed: "blue",
    valid: "green",
};

export const ListPoi = observer(() => {
    const { pointOfInterestStore } = useStores();
    const history = useHistory();

    useEffect(() => {
        pointOfInterestStore.get();
    }, []);

    const columns = [
        {
            title: "Nom du lieu",
            key: "nomDuLieu",
            render: (text, record) => (
                <CustomLink
                    onClick={() => {
                        console.log(text);
                        pointOfInterestStore.getById(text.id);
                        pointOfInterestStore.setEditing(true);
                        history.push("/poi/create");
                    }}
                >
                    {text.nomDuLieu}
                </CustomLink>
            ),
        },
        {
            title: "Catégorie",
            dataIndex: "categorie",
            key: "categorie",
        },
        {
            title: "Statut",
            dataIndex: "questionnr",
            key: "questionnr",
            render: (text, record) => (
                <span>
                    <Tag color={hashMap[record.questionnr]} key={record.questionnr}>
                        {record.questionnr.toUpperCase()}
                    </Tag>
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
            render: (text, record) => {
                return (
                    <Popconfirm
                        title="Etes vous sûr de vouloir supprimer ?"
                        onConfirm={() => pointOfInterestStore.remove(record.id)}
                    >
                        <Icon style={{ textAlign: "center" }} type="delete" />
                    </Popconfirm>
                );
            },
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
                    // @ts-ignore
                    dataSource={
                        pointOfInterestStore.all.length &&
                        pointOfInterestStore.all.map((el, ind) => {
                            return {
                                key: ind,
                                id: el.id,
                                nomDuLieu: el.name,
                                categorie: el.poiType,
                                questionnr: el.status || "application",
                                greenscore: el.greenscore,
                            };
                        })
                    }
                />
            </Content>
        </Layout>
    );
});
