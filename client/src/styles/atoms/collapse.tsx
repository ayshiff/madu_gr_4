import React, { useState, useEffect } from "react";
import { Collapse, Icon, Modal } from "antd";
import styled from "styled-components";
import { rem } from "polished";
import { RadiosComponent } from "./radio";

const { Panel } = Collapse;

const PanelHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    width: ${rem(50)};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CustomIcon = styled(Icon)`
    font-size: ${rem(18)};
    &:hover {
        color: ${props => (props.type === "edit" ? "#1890FF" : "#FF4D4F")};
    }
`;
const CustomModal = styled(Modal)`
    & .ant-btn:nth-child(2) {
        background: #ff4d4f;
        border-color: #ff4d4f;
    }
    & .ant-modal-header {
        border: none;
    }
    & .ant-modal-footer {
        border: none;
    }
`;

const CustomCollapse = styled(Collapse)`
    margin-bottom: ${rem(12)};
`;

const PanelHeader = ({ callback, onDelete, data, index }) => {
    const [value, setvalue] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);

    useEffect(() => {
        if (activeEdit) {
            callback(activeEdit);
        }
    }, [activeEdit]); // eslint-disable-line no-use-before-define

    const onEdit = event => {
        const collapseActive = document.querySelector(".ant-collapse-content-active");

        if (collapseActive) {
            event.stopPropagation();
            setActiveEdit(!activeEdit);
        } else {
            setActiveEdit(!activeEdit);
            return;
        }
    };

    const showModal = event => {
        event.stopPropagation();
        setvalue(true);
    };

    const hideModal = e => {
        e.stopPropagation();
        setvalue(false);
    };

    return (
        <PanelHeaderContainer>
            <div>{data.title}</div>
            <ButtonWrapper>
                <CustomIcon type="edit" style={{ fontSize: rem(18) }} onClick={e => onEdit(e)} />
                <CustomIcon
                    type="delete"
                    style={{ fontSize: rem(18) }}
                    onClick={e => showModal(e)}
                />
            </ButtonWrapper>
            <CustomModal
                title="Êtes-vous sûr de vouloir supprimer la catégorie social ?"
                visible={value}
                onOk={e => {
                    hideModal(e);
                    onDelete(index);
                }}
                onCancel={e => hideModal(e)}
                okText="Supprimer"
                cancelText="Annuler"
            >
                <p>Cette action entraînera la modification de 25 questionnaires.</p>
            </CustomModal>
        </PanelHeaderContainer>
    );
};

export const CollapseComponent = ({ datas, onDelete }) => {
    const [activeEdit, setActiveEdit] = useState(false);
    const callback = value => {
        setActiveEdit(value);
    };

    return datas.map((data, i) => (
        <CustomCollapse key={i}>
            <Panel
                header={
                    <PanelHeader callback={callback} data={data} index={i} onDelete={onDelete} />
                }
                key={i}
            >
                <RadiosComponent activeEdit={activeEdit} setActiveEdit={setActiveEdit} />
            </Panel>
        </CustomCollapse>
    ));
};
{
}
