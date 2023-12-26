import { Row, Col, Card, Typography, Divider } from "antd";
import { UserOutlined, CalendarOutlined, PhoneOutlined, FieldTimeOutlined, EnvironmentOutlined, TrophyOutlined, TeamOutlined, MehOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title, Text } = Typography;

const ViewUser = ({ profile }: { profile: any }) => {
  return (
    <Row justify="center" style={{ width: '100%', marginTop: '20px' }}>
      <Col span={18}>
        <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Row justify="center">
            <Col>
              <Title level={2} style={{ color: '#1890ff' }}>Perfil de Usuario</Title>
            </Col>
          </Row>
          <Divider style={{ borderColor: '#1890ff' }} />
          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Text strong><UserOutlined /> Nombre: </Text><br />
              <Text>{profile.name ?? 'NA'}</Text>
            </Col>
            <Col span={12}>
              <Text strong><MehOutlined /> Género: </Text><br />
              <Text>{profile.profile.gender ?? 'NA'}</Text>
            </Col>
            <Col span={12}>
              <Text strong><CalendarOutlined /> Fecha de nacimiento:</Text><br />
              <Text>{moment(profile.profile.birthdate).format('LL') ?? 'NA'}</Text>
            </Col>
            <Col span={12}>
              <Text strong><PhoneOutlined /> Teléfono:</Text><br />
              <Text>{profile.profile.phone}</Text>
            </Col>
            <Col span={12}>
              <Text strong><TrophyOutlined /> Nivel de habilidad:</Text><br />
              <Text>{profile.profile.skill_level}</Text>
            </Col>
            <Col span={12}>
              <Text strong><EnvironmentOutlined /> Municipio:</Text><br />
              <Text>{profile.profile.municipality}</Text>
            </Col>
            <Col span={12}>
              <Text strong><FieldTimeOutlined /> Disponibilidad semanal:</Text><br />
              <Text>{profile.profile.weekly_availability}</Text>
            </Col>
            <Col span={12}>
              <Text strong><TeamOutlined /> Deporte:</Text><br />
              <Text>{profile.profile.sport}</Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewUser;
