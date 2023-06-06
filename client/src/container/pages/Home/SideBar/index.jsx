import React from "react";
import { Layout } from "antd";
import SourceUploader from "../Modals/SourceUploader";
import SourceList from "./SourceList";

const { Sider } = Layout;

const SideBar = () => {
  return (
    // <Sider
    //   theme={"dark"}
    //   width={250}
    //   className="hidden sm:block"
    //   style={{
    //     overflow: 'auto',
    //     height: '100vh',
    //     position: 'fixed',
    //     left: 0,
    //     top: 0,
    //     bottom: 0,
    //   }}
    // >
    //   <SourceUploader />
      <SourceList />
    // </Sider>
  );
};

export default SideBar;
