import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Row, Typography, Table, Tag, Space, Pagination } from 'antd';
import { getAllUsers } from '../../../services/userAPI';

const { Title, Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'UTM source',
    dataIndex: 'utm_source',
    key: 'utm_source',
  },
  {
    title: 'UTM medium',
    dataIndex: 'utm_medium',
    key: 'utm_medium',
  },
  {
    title: 'UTM compaign',
    dataIndex: 'utm_compaign',
    key: 'utm_compaign',
  },
  {
    title: 'UTM content',
    dataIndex: 'utm_content',
    key: 'utm_content',
  },
  {
    title: 'Action',
    key: '_id',
    render: (_, row) => (
      <Space size="middle">
        <a>Invite {row.name}</a>
      </Space>
    ),
  },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const getUsers = () => {
    setLoading(true);
    getAllUsers({
      page,
      limit: pageSize,
    }).then(data => { 
      setLoading(false);
      setUsers(data.users.map(user => ({...user, key: user._id })));
      setTotal(data.total);
    });
  }

  const handleChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  }

  return (
    <div className='container mx-auto my-4'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table loading={loading} columns={columns} dataSource={users} pagination={false} />
          <div className="text-right mt-2">
            <Pagination showQuickJumper showSizeChanger pageSize={pageSize} current={page} total={total} onChange={handleChange} />
          </div>
        </Col>
      </Row>
    </div >
  )
}

export default Users;