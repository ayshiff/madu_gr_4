import React from "react";
import { Layout } from "antd";

import { SideBar } from "styles/organisms/side-bar";

export const Container = ({ children }: React.PropsWithChildren<{}>) => (
    <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        {children}
    </Layout>
);
