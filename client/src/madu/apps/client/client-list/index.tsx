import React from "react";
import { Layout, Input, Button, Table, Tag, Icon } from "antd";
import styled from "styled-components";
import { rem } from "polished";

const trash = require("assets/icons/trash.svg");
const localisation = require("assets/icons/localisation.svg");

const { Header, Content } = Layout;

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

export const ListClient = () => {
    const tableData = [
        {
            key: "1",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "2",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "3",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "4",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "5",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "6",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "7",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "8",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "9",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "10",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "11",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "12",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "13",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "14",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "15",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "16",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "17",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "18",
            companyName: "Wild & the Moon",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
        {
            key: "19",
            companyName: "Test",
            poiNumber: "Restaurant",
            status: "En Attente",
            email: 72,
        },
    ];

    const columns = [
        {
            title: "Nom de l'entreprise",
            dataIndex: "companyName",
            key: "companyName",
        },
        {
            title: "Nombre de POI",
            dataIndex: "poiNumber",
            key: "poiNumber",
        },
        {
            title: "Statut",
            key: "status",
            render: () => (
                <span>
                    <Tag color="volcano">Test</Tag>
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
            render: () => (
                <span>
                    <Icon
                        style={{ marginRight: rem(16) }}
                        component={() => <img src={localisation} alt="localisation-icon" />}
                    />
                    <Icon component={() => <img src={trash} alt="trash-icon" />} />
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
        <CustomLayout>
            <Header style={headerStyle}>
                <h1 style={titleStyle}>Liste des clients</h1>
                <div>
                    <Search placeholder="Search" style={{ width: 250 }} />
                    <Button type="primary" style={{ marginRight: "20px", marginLeft: "40px" }}>
                        <a href="/client/create">+ Ajouter un point client</a>
                    </Button>
                </div>
            </Header>
            <CustomContent>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 400 }}
                />
            </CustomContent>
        </CustomLayout>
    );
};
