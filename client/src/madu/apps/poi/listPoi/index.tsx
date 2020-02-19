import React, { useEffect } from "react";
import { Layout, Input, Button, Table, Popconfirm, Icon, Tag } from "antd";
import { useStores } from "madu/hooks/use-store";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import styled from "styled-components";

const { Header, Content } = Layout;

/** Styled components */

const CustomLink = styled.div`
    color: #1790ff;
    &:hover {
        cursor: pointer;
    }
`;

const CustomTitle = styled.h1`
    marginleft: 20px;
    fontweight: 500;
    fontsize: 28px;
`;

export const CustomContent = styled(Content)`
    margin: 24px 16px;
    padding: 24;
    background: #fff;
`;

const CustomButton = styled(Button)`
    marginright: 20px;
    marginleft: 40px;
`;

const CustomHeader = styled(Header)`
    background: #fff;
    padding: 0;
    display: flex;
    justifycontent: space-between;
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

    const edit = (id: string) => {
        pointOfInterestStore.getById(id);
        pointOfInterestStore.setEditing(true);
        history.push("/poi/create");
    };

    const columns = [
        {
            title: "Nom du lieu",
            key: "nomDuLieu",
            render: (text, record) => (
                <CustomLink onClick={() => edit(text.id)}>{text.nomDuLieu}</CustomLink>
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
            render: (text, record) =>
                record.questionnr && (
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

    const { Search } = Input;
    return (
        <Layout style={{ height: "100%" }}>
            <CustomHeader>
                <CustomTitle>Liste des points d’intêret</CustomTitle>
                <div>
                    <Search placeholder="Search" style={{ width: 250 }} />
                    <CustomButton type="primary">
                        <a href="/poi/create">+ Ajouter un point d’intêret</a>
                    </CustomButton>
                </div>
            </CustomHeader>
            <CustomContent>
                <Table
                    columns={columns}
                    // @ts-ignore
                    dataSource={
                        pointOfInterestStore.all.length
                            ? pointOfInterestStore.all.map((el, ind) => {
                                  return {
                                      key: ind,
                                      id: el.id,
                                      nomDuLieu: el.name,
                                      categorie: el.poiType,
                                      questionnr: el.status,
                                      greenscore: el.greenscore,
                                  };
                              })
                            : []
                    }
                />
            </CustomContent>
        </Layout>
    );
});
