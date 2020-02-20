import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Table, Tag, Popconfirm, Icon } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";
import { useHistory } from "react-router";

// const trash = require("assets/icons/trash.svg");
// const localisation = require("assets/icons/localisation.svg");

const { Header, Content } = Layout;

const CustomLink = styled.div`
    color: #1790ff;
    &:hover {
        cursor: pointer;
    }
`;

const CustomLayout = styled(Layout)`
    background: #fff;
    padding: ${rem(24)};
`;

const CustomContent = styled(Content)`
    margin: ${rem(24)} ${rem(16)};
    padding: ${rem(24)};
    background: #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 3px 10px rgba(0, 0, 0, 0.06),
        0px 1px 30px rgba(0, 0, 0, 0.04);
    border-radius: ${rem(12)};
`;

const CustomTag = styled(Tag)`
    width: 150px;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;

const hashMap = {
    canvassing: "red",
    surver_completed: "orange",
    valid: "green",
};

export const ListClient = observer(() => {
    const [filter, setFilter] = useState("");
    const { companyStore } = useStores();
    const history = useHistory();

    useEffect(() => {
        companyStore.get();
    }, []);

    const onChangeTag = (id: string) => {
        const element = companyStore.all.find(el => el.id === id);
        const value = Object.entries(hashMap).findIndex(el => el[0] === element.status);
        const new_index = (value + 1) % 3;
        const new_value = Object.entries(hashMap)[new_index];
        companyStore.edit(id, { ...element, status: new_value[0] });
    };

    const edit = (id: string) => {
        companyStore.getById(id);
        companyStore.setEditing(true);
        history.push("/poi/create");
    };

    const columns = [
        {
            title: "Nom de l'entreprise",
            key: "companyName",
            render: (text, record) => (
                <CustomLink onClick={() => edit(text.id)}>{text.companyName}</CustomLink>
            ),
        },
        {
            title: "Nombre de POI",
            dataIndex: "poiNumber",
            key: "poiNumber",
        },
        {
            title: "Statut",
            key: "status",
            render: (text, record) =>
                record.status && (
                    <span>
                        <CustomTag
                            onClick={() => onChangeTag(record.id)}
                            color={hashMap[record.status]}
                            key={record.status}
                        >
                            {record.status.toUpperCase()}
                        </CustomTag>
                    </span>
                ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                return (
                    <Popconfirm
                        title="Etes vous sûr de vouloir supprimer ?"
                        onConfirm={() => companyStore.remove(record.id)}
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
        <CustomLayout>
            <Header style={headerStyle}>
                <h1 style={titleStyle}>Liste des clients</h1>
                <div>
                    <Search
                        placeholder="Search"
                        style={{ width: 250 }}
                        onChange={e => setFilter(e.target.value)}
                    />
                    <Button type="primary" style={{ marginRight: "20px", marginLeft: "40px" }}>
                        <a href="/client/create">+ Ajouter un point client</a>
                    </Button>
                </div>
            </Header>
            <CustomContent>
                {console.log("companyStore.all", companyStore.all)}
                <Table
                    columns={columns}
                    dataSource={
                        companyStore.all.length
                            ? companyStore.all
                                  .map((el, ind) => {
                                      return {
                                          key: ind,
                                          id: el.id,
                                          companyName: el.companyName,
                                          poiNumber: el.poiNumber,
                                          status: el.status,
                                          email: el.email,
                                      };
                                  })
                                  .filter(
                                      el =>
                                          el.companyName &&
                                          el.companyName
                                              .toLowerCase()
                                              .includes(filter.toLowerCase())
                                  )
                            : []
                    }
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 400 }}
                />
            </CustomContent>
        </CustomLayout>
    );
});
