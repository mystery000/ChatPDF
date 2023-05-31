import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { getPlans } from '../../../redux/plan/planSlice';
import CheckoutForm from './Partials/CheckoutForm';

const { Title, Text } = Typography;

const stripePromise = loadStripe("pk_test_51MqDHeIhTKltFnGq3WGCHjZi5ZfUg5T8aiGVPa7XFZcrse4SGLvTjDbXDNb5inKjlOaJqHJRDv5HsPQ6tbnfsxRL00rwetwKzu");

function Lists() {

  const { slug } = useParams();
  const plan = useSelector(state => state.plan.plans.filter(plan => plan.slug === slug));
  const dispatch = useDispatch();

  useEffect(() => {
    if (plan.length === 0) {
      dispatch(getPlans());
    }
  }, []);

  return (
    <div className='container mx-auto my-4'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3} className='text-center mt-5'>
            Subscribe now!
          </Title>
        </Col>
        <Col span={24} key={plan[0]._id} className='flex justify-center'>
          <Card className='shadow-lg max-w-md'>
            <div>
              <Title level={4}>
                {plan[0].name}
              </Title>
              <Text type='secondary' className='word-break'>{plan[0].description}</Text>
            </div>
            <Divider />
            {plan[0].price > 0 && <Title level={3}>${plan[0].price}<Text type='secondary'>/month</Text></Title>}
            {plan[0].price == 0 && <Title level={3}>Free</Title>}
            {plan[0].services.map((service, index) => (
              <div className='my-2' key={index}>
                <CheckCircleTwoTone /> <span className='text-lg'>{service}</span>
              </div>
            ))}
            <div className="mt-4">
              <Elements stripe={stripePromise}>
                <CheckoutForm plan={plan[0]}/>
              </Elements>
            </div>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

export default Lists;