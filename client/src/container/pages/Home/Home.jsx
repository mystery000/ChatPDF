import React from "react";
import { Layout } from "antd";
import Main from "./Main";
import SideBar from "./SideBar";
import SourceUploader from "./Modals/SourceUploader";
const { Content, Sider } = Layout;

function Home() {
    return (
        <Layout>
            <Sider
                theme={"dark"}
                width={250}
                className="hidden sm:block"
            >
                <SourceUploader />
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
