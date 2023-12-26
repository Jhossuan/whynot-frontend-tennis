import { Button, Col, Form, Input, Modal, Popconfirm, Row, Table, notification } from "antd"
import { CardContainer } from "../../../styles/AuthStyles"
import { SearchOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import CreateTournament from "./CreateTournament"
import { validateMessages } from "../../../utils/input_validation"
import TournamentI from "../../../types/tournament"
import { CreateNewTournament, DeleteTournament, GetTournaments, UpdateTournament } from "../../../api/TournamentService"
import { AppContext } from "../../../context/AppContext"
import moment from "moment"
import CustomBadge from "../../../utils/CustomBadge"
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import TournamentDetail from "./TournamentDetail"

export const InitOpenModal: OpenModalT = {
  open: false,
  title: '',
  type: 'create',
  metadata: undefined
}

export type OpenModalT = {
  open: boolean,
  title: string,
  type: 'edit' | 'create' | 'view',
  metadata?: TournamentI | undefined
}

const Tournaments = () => {

  const [filter, setFilter] = useState<string>("")
  const [ openModal, setOpenModal ] = useState<OpenModalT>(InitOpenModal)
  const [loading, setLoading] = useState<boolean>(false)
  const [ tournaments, setTournaments ] = useState<TournamentI[]>([])

  const { userData } = useContext(AppContext)
  const [form] = Form.useForm()

  const onCreateTournament = async() => {
    setOpenModal({ open: true, type: 'create', title:' ' })
  }

  const deleteTournament = async(e: TournamentI) => {
    setLoading(true)
    const request = {
        uid: userData?.uid,
        tid: e.tournament
    }
    const res = await DeleteTournament(request)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
    }
    form.resetFields()
    setLoading(false)
    setOpenModal(InitOpenModal)
    getTournaments()
    return notification.success({
        message: res.response.msg
    })
}

  const columns = [
    {
        title: 'Torneo',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Fecha',
        dataIndex: 'eventDate',
        key: 'eventDate',
        render: (e: Date) => <>{ moment(e).format('LLL') }</>
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: 'eventDate',
        render: (e: string) => <>{Number(e) === 0 ? 'Gratis' :`$${e}`}</>
    },
    {
        title: 'Min. participantes',
        dataIndex: 'minParticipants',
        key: 'minParticipans',
    },
    {
        title: 'Max. participantes',
        dataIndex: 'maxParticipants',
        key: 'maxParticipans',
    },
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        render: (item: string) => CustomBadge(item)

    },
    {
        title: 'Acciones',
        key: "tournament",
        render: (e: any) => {
            return (
                <Row gutter={[10,10]}>
                    <EyeOutlined onClick={() => setOpenModal({ open: true, title: '', type: 'view', metadata: e })} style={{ fontSize:'20px', margin: '0 5px', cursor: 'pointer' }} />
                    <EditOutlined onClick={() => setOpenModal({ open: true, title: 'Editar torneo', type: 'edit', metadata: e })} style={{ fontSize:'20px', margin: '0 5px', color: '#0086c5', cursor: 'pointer' }} />

                    <Popconfirm title='Eliminar torneo' onConfirm={() => deleteTournament(e)}>
                        <DeleteOutlined  style={{ fontSize:'20px', margin: '0 5px', color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </Row>
            )
        }
    }
]

  const getTournaments = async() => {
    setLoading(true)
    const res = await GetTournaments()
    if(res.status !== 200){
    setLoading(false)
        return notification.info({
            message: res.response.msg ?? res.response
        })
    }
    setLoading(false)
    setTournaments(res.response)
  }

  useEffect(() => {
    if(openModal.type === 'edit'){
        const dateFormated = moment(openModal.metadata?.eventDate)
        form.setFieldsValue({
            title: openModal.metadata?.title,
            description: openModal.metadata?.description,
            location: openModal.metadata?.location,
            price: openModal.metadata?.price,
            eventDate: dateFormated,
            minParticipants: openModal.metadata?.minParticipants,
            maxParticipants: openModal.metadata?.maxParticipants,
            reward: openModal.metadata?.reward,
            imageUrl: openModal.metadata?.imageUrl,
            status: openModal.metadata?.status,
        })
    }
  }, [openModal])//eslint-disable-line

  const filteredTournaments = tournaments.filter(tournament =>
    //@ts-ignore
    tournament.title.toLowerCase().includes(filter.toLowerCase()) || tournament.status.toLowerCase().includes(filter.toLowerCase())
  );

  const onFinish = async(e: any) => {
    const { title, description, eventDate, location, price, minParticipants, maxParticipants, reward, imageUrl, status } = e
    setLoading(true)
    const request: TournamentI = {
        uid: userData?.uid,
        title,
        description,
        eventDate: eventDate['$d'],
        location,
        price: String(price),
        minParticipants,
        maxParticipants,
        reward,
        imageUrl,
        status
    }
    const res = await CreateNewTournament(request)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
    }
    form.resetFields()
    setLoading(false)
    setOpenModal({ ...openModal, open: false })
    getTournaments()
    return notification.success({
        message: res.response.msg
    })
  }

  const onFinishEdit = async(e: any) => {
    const { title, description, eventDate, location, price, minParticipants, maxParticipants, reward, imageUrl, status } = e
    setLoading(true)
    const request = {
        uid: userData?.uid,
        tid: openModal.metadata?.tournament,
        newData: {
            title,
            description,
            eventDate: new Date(eventDate),
            location,
            price: String(price),
            minParticipants,
            maxParticipants,
            reward,
            imageUrl,
            status
        }
    }
    const res = await UpdateTournament(request)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
    }
    form.resetFields()
    setLoading(false)
    setOpenModal({ ...openModal, open: false })
    getTournaments()
    return notification.success({
        message: res.response
    })
}

  useEffect(() => {
    getTournaments()
  }, [])

  const ObtainComponentUser = () => {
    switch (openModal.type) {
        case 'create':
            return (
              <Form form={form} onFinish={onFinish} validateMessages={validateMessages} layout='vertical'>
                <CreateTournament loading={loading} btnTitle='Crear torneo'/>
              </Form>
            )
        case 'edit':
          return (
            <Form form={form} onFinish={onFinishEdit} validateMessages={validateMessages} layout='vertical'>
              <CreateTournament loading={loading} btnTitle='Editar torneo'/>
            </Form>
          )
        case 'view':
          return (
              <TournamentDetail data={openModal.metadata} />
          )
        default:
            break;
    }
  }

  return (
    <>
      <CardContainer width="100%" minHeight="auto" padding="20px">
        <Row>
          <Col span={24} style={{ display:'flex', flexDirection:'row', justifyContent:'left' }}>
              <Button type="primary" onClick={onCreateTournament} style={{ marginRight:'5px' }}>Crear torneo</Button>
              <Input
                suffix={<SearchOutlined />}
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                placeholder="Filtrar torneos"
                style={{ width:'20%' }}
                />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Table columns={columns} dataSource={filteredTournaments ?? []} loading={loading} style={{ width:'100%' }} />
          </Col>
        </Row>
      </CardContainer>
      <Modal title={openModal?.title} open={openModal?.open} footer={false} onCancel={() => setOpenModal({ ...openModal, open: false })} style={{ minWidth: '40vw' }}>
        { ObtainComponentUser() }
      </Modal>
    </>
  )
}

export default Tournaments