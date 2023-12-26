import React from 'react';
import { Col, Row, Image as AntImage } from 'antd';
import { TrophyOutlined, EnvironmentOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import TournamentI from '../../../types/tournament';

const TournamentDetail: React.FC<{ data: TournamentI | undefined }> = ({ data }) => {
  return (
    <Row gutter={[16, 16]} style={{ padding: '30px' }}>
      <Col span={24}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
          <TrophyOutlined /> {data?.title ?? ''}
        </div>
      </Col>
      <Col span={24}>
        <div style={{ fontSize: '16px', textAlign: 'center' }}>{data?.description ?? ''}</div>
      </Col>
      <Col span={24}>
        {data?.imageUrl ? (
          <div style={{ maxWidth: '100%', overflow: 'hidden', borderRadius: '8px' }}>
            <AntImage
              src={data?.imageUrl ?? ''}
              alt={data?.title ?? 'Image'}
              width={600}
              height={550}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <div style={{ width: '100%', height: '40em', background: '#b0b0b0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Banner publicitario aquí
          </div>
        )}
      </Col>
      <Col span={24}>
        <div style={{ fontSize: '20px', textAlign: 'center' }}>
          <EnvironmentOutlined /> {data?.location ?? ''}
        </div>
      </Col>
      <Col span={24}>
        <div style={{ fontSize: '16px', textAlign: 'center' }}>
          <DollarOutlined /> {Number(data?.price) > 0 ? `${data?.price} USD` : 'Torneo Gratuito'}
        </div>
      </Col>
      <Col span={24}>
        <div style={{ fontSize: '16px', textAlign: 'center' }}>
          <CalendarOutlined /> {moment(data?.eventDate).format('LLL')}
        </div>
      </Col>
    </Row>
  );
};

export default TournamentDetail;
