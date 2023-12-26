import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'

const CreateTournament = ({ loading, btnTitle }:{ loading: boolean, btnTitle: string }) => {

    const tournamentStatus = [
        { label: 'Inscripciones Abiertas', value: 'OPEN' },
        { label: 'Inscripciones Cerradas', value: 'CLOSED' },
        { label: 'Pospuesto', value: 'POSTPONED' },
        { label: 'Finalizado', value: 'FINISHED' },
        { label: 'Pendiente', value: 'PENDING' },
        { label: 'Cancelado', value: 'CANCELED' },
    ]

  return (
    <Row gutter={[10,10]}>
        <Col span={24}>
            <Form.Item name="title" label="Titulo" rules={[{ required: true }]}>
                <Input placeholder='Torneo de ejemplo' />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="description" label="Descripción" rules={[{ required: true }]}>
                <Input.TextArea placeholder='Detalles para mas información del torneo' autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="location" label="Ubicación" rules={[{ required: true }]}>
                <Input placeholder='San Juan PR, Calle 12 # 32-2B, Coliseo de las aguilas' />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item name="eventDate" label="Fecha del evento" rules={[{ required: true }]}>
                <DatePicker showTime placeholder='Seleccionar fecha' style={{ width:'100%' }} />
                </Form.Item>
            </Col>
        <Col span={12}>
            <Form.Item name="price" label="Precio" rules={[{ required: true }]} initialValue={0}>
                <InputNumber defaultValue={0} formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')} style={{ width:'100%' }} />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item name="minParticipants" label="Minimo de participantes" rules={[{ required: true }]}>
                <InputNumber placeholder='Cantidad minima permitida' style={{ width:'100%' }} />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item name="maxParticipants" label="Maximo de participantes" rules={[{ required: true }]}>
                <InputNumber placeholder='Cantidad maxima permitida' style={{ width:'100%' }} />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="reward" label="Premio" rules={[{ required: true }]}>
                <Input placeholder='Indica el premio' />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="imageUrl" label="Banner publicitario" rules={[{ required: false }]}>
                <Input placeholder='URL del banner ( opcional )' />
            </Form.Item>
        </Col>
        <Col span={24}>
            <Form.Item name="status" label="Estado del torneo" rules={[{ required: true }]}>
                <Select placeholder='Torneo de ejemplo' options={tournamentStatus} />
            </Form.Item>
        </Col>
        <Col span={24}> 
            <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" style={{ width:'100%' }}>{ loading ? 'Cargando ...' : btnTitle }</Button>
            </Form.Item>
        </Col>
    </Row>
  )
}

export default CreateTournament