import React from "react";
import { Layout } from "antd";
import Main from "./Main";
import SideBar from "./SideBar";

const { Content, Sider } = Layout;

function Home() {
    return (
        <Layout>
            <Sider theme={"dark"} width={250}>
                <SideBar />
            </Sider>
            <Layout>
                <Content>
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;
