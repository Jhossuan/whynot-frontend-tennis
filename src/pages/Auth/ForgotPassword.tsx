import { Col, Form, Input, Button, Divider, notification, Steps } from 'antd'
import { BigText, InputCard, SmallText } from '../../styles/AuthStyles'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateMessages } from '../../utils/input_validation';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ResetPasswordI, SendCodeI, ValidateAccountI } from '../../types/auth';
import { ResetPassword, SendCodeValidation, ValidateAccount } from '../../api/AuthService';

const ForgotsPassword = () => {

    const [ steps, setSteps ] = useState<number>(0)
    const [ userData, setUserData ] = useState<{ uid: string, email: string }>({ uid:'', email:'' })
    const [ loading, setLoading ] = useState<boolean>(false)

    const { setUserEntry } = useContext(AppContext)
    const [form] = Form.useForm()

    const sendVerificationCode = async(data: { email: string }) => {
        const { email } = data
        const request: SendCodeI = {
            email,
            type: 'repassword'
        }
        setLoading(true)
        const res = await SendCodeValidation(request)
        if(res.status !== 200){
          setLoading(false)
          return notification.error({
            message: res.response.msg
          })
        }
      
        form.resetFields()
        setLoading(false)
        setSteps(1)
        setUserData({
          uid: res.response.uid,
          email
        })
        return notification.success({
          message: res.response.msg ?? "Código de validación enviado"
        })
    }

    const validateAccount = async(data: { code: string }) => {
        const { code } = data
        const request: ValidateAccountI = {
            email: userData.email,
            type: 'repassword',
            code,
        }
        setLoading(true)
        const res = await ValidateAccount(request)
        if(res.status !== 200){
          setLoading(false)
          return notification.error({
            message: res.response.msg
          })
        }
      
        form.resetFields()
        setLoading(false)
        setSteps(2)
        return notification.success({
          message: res.response.msg ?? "Verificación completada"
        })
    }

    const createNewPassword = async(data: { password: string }) => {
        const { password } = data
        const request: ResetPasswordI = {
            email: userData.email,
            password
        }
        setLoading(true)
        const res = await ResetPassword(request)
        if(res.status !== 200){
          setLoading(false)
          return notification.error({
            message: res.response.msg
          })
        }
      
        form.resetFields()
        setLoading(false)
        setSteps(0)
        setUserEntry('login')
        return notification.success({
          message: res.response.msg ?? "Verificación completada"
        })
    }

    const selectStep = () => {
        switch (steps) {
            case 0:
                return (
                    <>
                        <SmallText textAlign='left'>Enviaremos un código <span style={{ color:"#0366d6" }}>a tu WhatsApp</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={sendVerificationCode} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="email" rules={[{ type: 'email', required: true }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<MailOutlined />} placeholder='Correo Electrónico' />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Enviar código' }</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            case 1:
                return (
                    <>
                        <SmallText textAlign='left'>Ingresa el código enviado <span style={{ color:"#0366d6" }}>a tu WhatsApp</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={validateAccount} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
                            <Form.Item name="code" rules={[{ required: true }, { min:6, message:'Mínimo 6 dígitos' }, { max:6, message:'Máximo 6 dígitos' }]} style={{ margin:'2em 0' }}>
                                <Input prefix={<LockOutlined />} placeholder='Código' />
                            </Form.Item>
                            <Form.Item>
                                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Válidar código' }</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            case 2:
                return (
                    <>
                        <SmallText textAlign='left'>Crea tu nueva <span style={{ color:"#0366d6" }}>contraseña</span></SmallText>
                        <BigText textAlign='left'>Nueva contraseña</BigText>

                        <Form form={form} onFinish={createNewPassword} style={{ margin: '4em 0 0 auto' }} validateMessages={validateMessages}>
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
                                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%', height:'3rem' }}>{ loading ? 'Cargando ...' : 'Crear nueva contraseña' }</Button>
                            </Form.Item>
                        </Form>
                    </>
                )
            default:
                break;
        }
    }

  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
    <InputCard>
    <Steps
        size='small'
        current={steps}
        items={[{ title: 'Código' }, { title: 'Verificar' }, { title: 'Contraseña' }]}
        style={{ marginBottom:'20px' }}
    />
    { selectStep() }

      <Divider> o </Divider>
      <SmallText fontSize='1em'>¿Ya tienes una cuenta? <span style={{ color:"#0366d6", cursor: 'pointer', textDecoration:'underline' }} onClick={() => setUserEntry('login')}>Iniciar Sesión</span></SmallText>

    </InputCard>
  </Col>
  )
}

export default ForgotsPassword