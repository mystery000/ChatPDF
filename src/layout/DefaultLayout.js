import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import React from 'react'
import FileUpload from '../components/FileUpload'

const { Header, Content, Sider } = Layout
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1)
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1
                return {
                    key: subKey,
                    label: `option${subKey}`,
                }
            }),
        }
    }
)
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    return (
        <Layout>
            <Layout>
                <Sider width={250}>
                    <Layout>
                        <Header className="text-white p-1 text-center">
                            <FileUpload></FileUpload>
                        </Header>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={items2}
                        />
                    </Layout>
                </Sider>
                <Layout>
                    <Header className="bg-white">
                        <div className="float-right">Button</div>
                    </Header>
                    <Content className="bg-white px-8">Content</Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default App
