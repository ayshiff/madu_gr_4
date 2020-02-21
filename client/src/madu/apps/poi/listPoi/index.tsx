import React, { useEffect, useState } from "react";
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

const CustomTag = styled(Tag)`
    width: 150px;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;

const CustomTitle = styled.h1`
    margin-left: 20px;
    font-weight: 500;
    font-size: 28px;
`;

export const CustomContent = styled(Content)`
    margin: 24px 16px;
    padding: 24;
    background: #fff;
`;

const CustomButton = styled(Button)`
    margin-right: 20px;
    margin-left: 40px;
`;

const CustomHeader = styled(Header)`
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
`;

const hashMap = {
    canvassing: "red",
    surver_completed: "orange",
    valid: "green",
};

export const ListPoi = observer(() => {
    const { pointOfInterestStore } = useStores();
    const [filter, setFilter] = useState("");
    const history = useHistory();

    useEffect(() => {
        pointOfInterestStore.get();
    }, []);

    const onChangeTag = (id: string) => {
        const element = pointOfInterestStore.all.find(el => el.id === id);
        const value = Object.entries(hashMap).findIndex(el => el[0] === element.status);
        const new_index = (value + 1) % 3;
        const new_value = Object.entries(hashMap)[new_index];
        pointOfInterestStore.edit(id, { ...element, status: new_value[0] });
    };

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
                        <CustomTag
                            onClick={() => onChangeTag(record.id)}
                            color={hashMap[record.questionnr]}
                            key={record.questionnr}
                        >
                            {record.questionnr.toUpperCase()}
                        </CustomTag>
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
                    <Search
                        onChange={e => setFilter(e.target.value)}
                        placeholder="Search"
                        style={{ width: 250 }}
                    />
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
                            ? pointOfInterestStore.all
                                  .map((el, ind) => {
                                      return {
                                          key: ind,
                                          id: el.id,
                                          nomDuLieu: el.name,
                                          categorie: el.poiType,
                                          questionnr: el.status,
                                          greenscore: el.greenscore,
                                      };
                                  })
                                  .filter(
                                      el =>
                                          el.nomDuLieu &&
                                          el.nomDuLieu.toLowerCase().includes(filter.toLowerCase())
                                  )
                            : []
                    }
                />
            </CustomContent>
        </Layout>
    );
});
