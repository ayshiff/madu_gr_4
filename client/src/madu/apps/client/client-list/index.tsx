import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Table, Tag, Popconfirm, Icon } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { observer } from "mobx-react";
import { useStores } from "madu/hooks/use-store";
import { useHistory } from "react-router";
import { toJS } from "mobx";

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

const CustomTagPOI = styled(Tag)`
    width: 30px;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;

const hashMap = {
    canvassing: {
        status: "démarché",
        color: "#D1D7DC",
    },
    surver_completed: {
        status: "mail envoyé",
        color: "#CDD2FF",
    },
    valid: {
        status: "validé",
        color: "#CFEBE2",
    },
};

const convertRad = (input: number) => {
    return (Math.PI * input) / 180;
};

const distance = (lat: number, lng: number, lat_: number, lng_: number) => {
    const R = 6378000; // Earth radius in meters

    return (
        R *
        (Math.PI / 2 -
            Math.asin(
                Math.sin(convertRad(lat_)) * Math.sin(convertRad(lat)) +
                    Math.cos(convertRad(lng_) - convertRad(lng)) *
                        Math.cos(convertRad(lat_)) *
                        Math.cos(convertRad(lat))
            ))
    );
};

const findByCoordinates = (allPoi, lat: number, lng: number) => {
    const radiusToPoiInMeters = 1000;
    const first = allPoi.filter(
        poi =>
            distance(lat, lng, poi.address.lat, poi.address.lng) < radiusToPoiInMeters &&
            poi.status === "canvassing"
    );
    const second = allPoi.filter(
        poi =>
            distance(lat, lng, poi.address.lat, poi.address.lng) < radiusToPoiInMeters &&
            poi.status === "surver_completed"
    );
    const third = allPoi.filter(
        poi =>
            distance(lat, lng, poi.address.lat, poi.address.lng) < radiusToPoiInMeters &&
            poi.status === "valid"
    );
    console.log(toJS(allPoi));
    return { first, second, third };
};

export const ListClient = observer(() => {
    const [filter, setFilter] = useState("");
    const { companyStore, pointOfInterestStore } = useStores();
    const history = useHistory();

    useEffect(() => {
        companyStore.get();
        pointOfInterestStore.get();
    }, [companyStore, pointOfInterestStore]);

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
        history.push("/client/create");
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
            dataIndex: "nbPoi",
            key: "nbPoi",
            render: (text, record) => (
                <span>
                    <CustomTagPOI color="#D1D7DC" key="1">
                        {record.dd.first.length}
                    </CustomTagPOI>
                    <CustomTagPOI color="#CDD2FF" key="2">
                        {record.dd.second.length}
                    </CustomTagPOI>
                    <CustomTagPOI color="#CFEBE2" key="3">
                        {record.dd.third.length}
                    </CustomTagPOI>
                </span>
            ),
        },
        {
            title: "Statut",
            key: "status",
            render: (text, record) =>
                record.status && (
                    <span>
                        <CustomTag
                            onClick={() => onChangeTag(record.id)}
                            color={hashMap[record.status].color}
                            key={record.status}
                        >
                            {hashMap[record.status].status.toUpperCase()}
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
                <Table
                    columns={columns}
                    dataSource={
                        companyStore.all.length && pointOfInterestStore.all.length
                            ? companyStore.all
                                  .map((el, i) => ({
                                      key: i,
                                      id: el.id,
                                      companyName: el.companyName,
                                      poiNumber: el.poiNumber,
                                      status: el.status,
                                      email: el.email,
                                      dd: findByCoordinates(
                                          pointOfInterestStore.all,
                                          el.address.lat,
                                          el.address.lng
                                      ),
                                  }))
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
