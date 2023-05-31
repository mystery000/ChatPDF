import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Divider, Row, Typography, Table, Tag, Space, Pagination } from 'antd';
import UpdateProfileForm from './Partials/UpdateProfileForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';

const { Title, Text } = Typography;

function Edit() {

  return (
    <div className='container mx-auto my-4'>
      <Row gutter={[16, 16]}>
        <Col span={24} className='flex justify-center'>
          <UpdateProfileForm />
        </Col>
        <Col span={24} className='flex justify-center'>
          <UpdatePasswordForm />
        </Col>
      </Row>
    </div >
  )
}

export default Edit;