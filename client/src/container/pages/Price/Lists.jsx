import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { getPlans } from '../../../redux/plan/planSlice';

const { Title, Text } = Typography;

function Lists() {

  const plans = useSelector(state => state.plan.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    if (plans.length === 0) {
      dispatch(getPlans());
    }
  }, []);

  return (
    <div className='container mx-auto my-4'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3} className='text-center mt-5'>
            Find the perfect plan for your team, or try it for free!
          </Title>
        </Col>
        {plans.map(({
          _id, name, slug, description, price, services
        }) => (
          <Col span={6} key={_id}>
            <Card className='shadow-lg'>
              <div>
                <Title level={4}>
                  {name}
                </Title>
                <Text type='secondary' className='word-break'>{description}</Text>
              </div>
              <Divider />
              {price > 0 && <Title level={3}>${price}<Text type='secondary'>/month</Text></Title>}
              {price == 0 && <Title level={3}>Free</Title>}
              {services.map((service, index) => (
                <div className='my-2' key={index}>
                  <CheckCircleTwoTone /> <span className='text-lg'>{service}</span>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link to={`/price/${slug}`}>
                  <Button size='large' type="primary w-full">Get Started</Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div >
  )
}

export default Lists;