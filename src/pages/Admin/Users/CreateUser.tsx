import { Col, Form, Input, Button, notification, Steps, Select, DatePicker } from 'antd'
import { BigText } from '../../../styles/AuthStyles'
import { UserOutlined, LockOutlined, MailOutlined, UserSwitchOutlined, TableOutlined } from '@ant-design/icons';
import { validateMessages } from '../../../utils/input_validation';
import { ProfileI, RegisterI } from '../../../types/auth';
import { useState } from 'react';
import { municipiosPuertoRico, sports } from '../../../utils/dictionarys';
import { CreateProfile, RegisterUser } from '../../../api/AuthService';

const CreateUser = ({ setOpenModal, getAllUsers }:{ setOpenModal: (param: any) => void, getAllUsers: () => void }) => {

  const [ step, setStep ] = useState(0)
  const [ uid, setUid ] = useState<string>('')
  const [ userType, setUserType ] = useState<'regular' | 'admin'>('regular')
  const [ loading, setLoading ] = useState<boolean>(false)

  const [form] = Form.useForm()

  const onFinish = async(data: RegisterI) => {
    const { name, email, password, userType } = data
    const request = {
      name,
      email,
      password,
      userType
    }
    console.log(request)
    setLoading(true)
    const res = await RegisterUser(request)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    setStep(1)
    setUid(res.response.uid)
    return notification.success({
      message: "Usuario creado correctamente"
    })
  }

  const onFinishProfile = async(data: ProfileI) => {
    const { gender, birthdate, phone, skill_level, municipality, weekly_availability, sport } = data
    const request: ProfileI = {
      uid,
      gender,
      birthdate: new Date(birthdate),
      phone: `+${phone}`,
      skill_level: userType === 'regular' ? skill_level : 'NO DISPONIBLE',
      municipality,
      weekly_availability: userType === 'regular' ? weekly_availability : 'NO DISPONIBLE',
      sport: userType === 'regular' ? sport : 'NO DISPONIBLE',
    }
    setLoading(true)
    const res = await CreateProfile(request)
    if(res.status !== 200){
      setLoading(false)
      return notification.error({
        message: res.response.msg
      })
    }

    form.resetFields()
    setLoading(false)
    setStep(0)
    setUid(res.response.uid)
    getAllUsers()
    setOpenModal({ open: false, title:'', type: 'create' })
    return notification.success({
      message: res.response.msg
    })
  }

  const switchStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <BigText textAlign='left'>Crear Usuario</BigText>

            <Form form={form} onFinish={onFinish} style={{ margin: 'auto', width:'80%' }} validateMessages={validateMessages}>

              <Form.Item name="name" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
                <Input prefix={<UserOutlined />} placeholder='Nombre' />
              </Form.Item>

              <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
              </Form.Item>

              <Form.Item name="userType" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
                <Select onChange={(e) => setUserType(e)} placeholder='Tipo de usuario' options={[{ label:'Usuario Regular', value:'regular' }, { label:'Administrador', value: 'admin' }]} />
              </Form.Item>

              <Form.Item 
                name="password"
                rules={[
                  {required: true },
                  {min: 6, message:"Minimo 6 caracteres"}
                ]}
                style={{ margin:'2em 0' }}
              >
                <Input type='password' prefix={<LockOutlined />} placeholder='Contraseña' />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('¡Las contraseñas deben coincidir!'));
                    },
                  }),
                ]}
                style={{ margin:'2em 0' }}
              >
                <Input type='password' prefix={<LockOutlined />} placeholder='Repetir contraseña' />
              </Form.Item>

              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Crear Usuario' }</Button>
              </Form.Item>

            </Form>
          </>
        )
      case 1:
        return (
          <>
            <BigText textAlign='left'>Crear Perfil</BigText>

            <Form form={form} onFinish={onFinishProfile}  validateMessages={validateMessages} style={{ margin: 'auto', width:'80%' }}>

              <Form.Item name="gender" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
                <Select
                  placeholder='Genero'
                  options={[
                    { label:'Masculino', value:'Masculino' },
                    { label:'Femenino', value:'Femenino' },
                    { label:'Otro', value:'Otro' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="birthdate"
                rules={[{required: true }]}
                style={{ margin:'2em 0' }}
              >
                <DatePicker placeholder='Fecha de nacimiento' style={{ width:'100%' }} />
              </Form.Item>

              <Form.Item name="phone" rules={[{ required: true }, {min: 11, message:"Mínimo 11 dígitos"}, {max: 12, message:"Máximo 12 dígitos"}]} style={{ margin:'2em 0' }}>
                <Input type='number' prefix={"+"} placeholder='1 7875 XXXXXX' style={{ width:'100%' }} />
              </Form.Item>

              {
                userType === 'regular' && (
                    <>
                        <Form.Item
                            name="skill_level"
                            rules={[{required: true }]}
                            style={{ margin:'2em 0' }}
                            >
                            <Input type='number' prefix={<UserSwitchOutlined />} placeholder='Nivel de habilidad (2.0 a 5.5)' style={{ width:'100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="weekly_availability"
                            rules={[{required: true }]}
                            style={{ margin:'2em 0' }}
                            >
                            <Input prefix={<TableOutlined />} placeholder='Disponibilidad semanal' style={{ width:'100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="sport"
                            rules={[{required: true }]}
                            style={{ margin:'2em 0' }}
                            >
                            <Select options={sports} placeholder='Deporte' allowClear style={{ width:'100%' }} />
                        </Form.Item>
                    </>
                )
              }

              <Form.Item
                name="municipality"
                rules={[{required: true }]}
                style={{ margin:'2em 0' }}
              >
                <Select options={municipiosPuertoRico} placeholder='Selecciona tu municipio' allowClear style={{ width:'100%' }} />
              </Form.Item>

              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Crear Perfil' }</Button>
              </Form.Item>

            </Form>
          </>
        )
    }
  }
  
  return (
      <>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <Steps
                size='default'
                current={step}
                items={[{ title: 'Registro' }, { title: 'Perfil' }]}
                style={{ marginBottom:'20px' }}
            />
            { switchStep() }
        </Col>
      </>
  )
}

export default CreateUser;