import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Button, Col, Row, Typography, Table, Tag, Space, Pagination, Input } from 'antd';
import { getAllUsers } from '../../../services/userAPI';
import useForm from '../../../Hooks/useForm';

const { Title, Text } = Typography;
const { Search } = Input;

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [formData, handleChange] = useForm({});

  const columns = [
    {
      title: 'No',
      dataIndex: '_id',
      key: 'no',
      width: '50px',
      render: (_, row, index) => ((page - 1) * pageSize + index + 1),
    },
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
      title: '🛒',
      dataIndex: '_id',
      key: 'activeSubscriptionId',
      render: (_, row) => {
        if (row.activeSubscriptionId?.planId?.price) {
          return <Tag color='#108ee9'>${row.activeSubscriptionId?.planId?.price}</Tag>
        }
      }
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
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_) => {
        return moment(_).format('MM/DD/YY hh:mm A')
      }
    },
    {
      title: 'Action',
      key: '_id',
      render: (_, row) => (
        <Space size="middle">
          <a>{row.name}</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const getUsers = (current) => {
    setLoading(true);
    getAllUsers({
      ...formData,
      page: current || page,
      limit: pageSize,
    }).then(data => {
      setLoading(false);
      setUsers(data.users.map(user => ({ ...user, key: user._id })));
      setTotal(data.total);
    });
  }

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  }

  const onSearch = () => {
    if(page == 1) {
      getUsers(1);
    } else {
      setPage(1);
    }
  }

  return (
    <div className='container mx-auto my-4'>
      <Row gutter={[16, 16]}>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Name..."
            allowClear
            value={formData.name}
            name='name'
            size='large'
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Email..."
            allowClear
            value={formData.email}
            name='email'
            size='large'
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Source..."
            allowClear
            value={formData.utm_source}
            name='utm_source'
            size='large'
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Campaign..."
            allowClear
            value={formData.utm_campaign}
            name='utm_campaign'
            size='large'
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col span={24}>
          <Table loading={loading} columns={columns} dataSource={users} pagination={false} />
          <div className="text-right mt-2">
            <Pagination showQuickJumper showSizeChanger pageSize={pageSize} current={page} total={total} onChange={handlePageChange} />
          </div>
        </Col>
      </Row>
    </div >
  )
}

export default Users;