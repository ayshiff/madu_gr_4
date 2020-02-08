import React from "react";
import { Row, Col } from "antd";

import { SideBar } from "styles/organisms/side-bar";

export const Container = ({ children }: React.PropsWithChildren<{}>) => (
    <Row>
        <Col span={4}>
            <SideBar />
        </Col>
        <Col span={20}>{children}</Col>
    </Row>
);
