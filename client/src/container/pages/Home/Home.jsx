import React from "react";
import { Layout } from "antd";
import Main from "./Main";
import SideBar from "./SideBar";
import SourceUploader from "./Modals/SourceUploader";
const { Content, Sider } = Layout;

function Home() {
    return (
        <Layout hasSider>
            <Sider
                theme={"dark"}
                width={250}
                className="hidden sm:block"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <SourceUploader />
                <SideBar />
            </Sider>
            <Layout className="sm:ml-[250px]">
                <Content>
                    <Main />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Home;
