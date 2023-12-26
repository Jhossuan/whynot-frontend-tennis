import { Col, Form, Input, Button, Divider, notification, Steps, Select, DatePicker } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { UserOutlined, LockOutlined, MailOutlined, UserSwitchOutlined, TableOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { ProfileI, RegisterI } from '../../types/auth';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { municipiosPuertoRico, sports } from '../../utils/dictionarys';
import { CreateProfile, RegisterUser } from '../../api/AuthService';

const Register = () => {

  const [ step, setStep ] = useState(0)
  const [ uid, setUid ] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)

  const { setUserEntry } = useContext(AppContext)
  const [form] = Form.useForm()

  const onFinish = async(data: RegisterI) => {
    const { name, email, password } = data
    const request = {
      name: name,
      email: email,
      password: password,
      userType: "regular"
    }
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
      message: "Usuario registrado correctamente"
    })
  }

  const onFinishProfile = async(data: ProfileI) => {
    const { gender, birthdate, phone, skill_level, municipality, weekly_availability, sport } = data
    const request: ProfileI = {
      uid,
      gender,
      birthdate: new Date(birthdate),
      phone: `+${phone}`,
      skill_level,
      municipality,
      weekly_availability,
      sport
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
    setUserEntry('verificateAccount')
    return notification.success({
      message: res.response.msg
    })
  }

  const switchStep = () => {
    switch (step) {
      case 0:
        return (
          <>
              <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Whynot League</span></SmallText>
              <BigText textAlign='left'>Registrarse</BigText>

            <Form form={form} onFinish={onFinish} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

              <Form.Item name="name" rules={[{ required: true }]} style={{ margin:'2em 0' }}>
                <Input prefix={<UserOutlined />} placeholder='Nombre' />
              </Form.Item>

              <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
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
                {/* <SmallText fontSize='1em' textAlign='left'><span style={{ color:"#0366d6", cursor: 'pointer' }}>Olvidé mi contraseña</span></SmallText> */}
              </Form.Item>

            </Form>

              <Divider> o </Divider>
              <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Inicia sesión</span></SmallText>
          </>
        )
      case 1:
        return (
          <>
            <SmallText textAlign='left'>Bienvenido a <span style={{ color:"#0366d6" }}>Whynot League</span></SmallText>
            <BigText textAlign='left'>Crear Perfil</BigText>

            <Form form={form} onFinish={onFinishProfile} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>

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

              <Form.Item
                name="skill_level"
                rules={[{required: true }]}
                style={{ margin:'2em 0' }}
              >
                <Input type='number' prefix={<UserSwitchOutlined />} placeholder='Nivel de habilidad (2.0 a 5.5)' style={{ width:'100%' }} />
              </Form.Item>

              <Form.Item
                name="municipality"
                rules={[{required: true }]}
                style={{ margin:'2em 0' }}
              >
                <Select options={municipiosPuertoRico} placeholder='Selecciona tu municipio' allowClear style={{ width:'100%' }} />
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

              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Crear Perfil' }</Button>
              </Form.Item>

            </Form>

              <Divider> o </Divider>
              <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Inicia sesión</span></SmallText>
          </>
        )
    }
  }
  
  return (
      <>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <InputCard>
            <Steps
                size='default'
                current={step}
                items={[{ title: 'Registro' }, { title: 'Perfil' }]}
                style={{ marginBottom:'20px' }}
            />
            { switchStep() }
          </InputCard>
        </Col>
      </>
  )
}

export default Register