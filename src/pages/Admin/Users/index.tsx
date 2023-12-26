import { Button, Col, Input, Modal, Popconfirm, Row, Table, notification } from "antd"
import { CardContainer } from "../../../styles/AuthStyles"
import moment from "moment"
import CustomBadge from "../../../utils/CustomBadge"
import { DeleteOutlined, SearchOutlined, VisibilityOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { DeleteUser, GetAllUsers } from "../../../api/UserService"
import { UserSchemaI } from "../../../types/auth"
import CreateUser from "./CreateUser"
import ViewUser from "./ViewUser"


export type OpenModalT = {
  open: boolean,
  title: string,
  type: 'edit' | 'create' | 'view',
  metadata?: UserSchemaI | undefined
}

export const InitOpenModal: OpenModalT = {
  open: false,
  title: '',
  type: 'create',
  metadata: undefined
}

const Users = () => {

  const [ users, setUsers ] = useState([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ openModal, setOpenModal ] = useState<OpenModalT>(InitOpenModal)
  const [ filter, setFilter ] = useState<string>('')

  const getAllUsers = async() => {
    setLoading(true)
    const res = await GetAllUsers()
    if(res.status !== 200){
    setLoading(false)
        return notification.info({
            message: res.response.msg ?? res.response
        })
    }
    setLoading(false)
    setUsers(res.response)
  }

  const onCreateUser = () => {
    setOpenModal({ open: true, type: 'create', title:' ' })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const ObtainComponentUser = () => {
    switch (openModal.type) {
        case 'create':
            return (
                <CreateUser setOpenModal={setOpenModal} getAllUsers={getAllUsers} />
            )
        case 'view':
          return (
              <ViewUser profile={openModal.metadata} />
          )
        default:
            break;
    }
  }

  const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Teléfono',
        dataIndex: 'profile',
        key: 'profile.phone',
        render: (e: any) => <>{
          e.phone
        }</>
    },
    {
        title: 'Fecha de registro',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (e: Date) => <>{ moment(e).format('LLL') }</>
    },
    {
        title: 'Tipo',
        dataIndex: 'metadata',
        key: 'metadata',
        render: (e: any) => {
            return (
                <>
                    { CustomBadge(e.userType) }
                </>
            )
        }
    },
    {
        title: 'Acciones',
        key: 'uid',
        render: (e: any) => {
            return (
                <Row gutter={[10,10]}>
                    {/* <EditOutlined onClick={() => setOpenModal({ open: true, title: 'Editar usuario', type: 'edit', metadata: e })} style={{ fontSize:'20px', margin: '0 5px', color: '#008f13', cursor: 'pointer' }} /> */}
                    <VisibilityOutlined onClick={() => setOpenModal({ open: true, title: '', type: 'view', metadata: e })} style={{ fontSize:'20px', margin: '0 5px', color: '#0086c5', cursor: 'pointer' }} />

                    <Popconfirm title='Eliminar usuario' onConfirm={() => deleteUser(e.uid)}>
                        <DeleteOutlined  style={{ fontSize:'20px', margin: '0 5px', color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </Row>
            )
        }
    }
  ]

  const deleteUser = async(uid: string) => {
    setLoading(true)
    const res = await DeleteUser(uid)
    if(res.status !== 200){
        setLoading(false)
        return notification.error({
          message: res.response.msg
        })
    }
    setLoading(false)
    setOpenModal(InitOpenModal)
    getAllUsers()
    return notification.success({
        message: "Usuario eliminado"
    })
  }

  const filteredUsers = users.filter(user =>
    //@ts-ignore
    user.name.toLowerCase().includes(filter.toLowerCase()) || user.email.toLowerCase().includes(filter.toLowerCase()) || user.profile.phone.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <CardContainer width="100%" minHeight="auto" padding="20px">
        <Row gutter={[10,10]}>
          <Col span={24} style={{ display:'flex', flexDirection:'row', justifyContent:'left' }}>
            <Button type="primary" onClick={onCreateUser} style={{ marginRight:'5px' }}>Crear usuario</Button>
            <Input
              suffix={<SearchOutlined />}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              placeholder="Filtrar usuarios"
              style={{ width:'20%' }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Table columns={columns} dataSource={filteredUsers ?? []} loading={loading} style={{ width:'100%' }} />
          </Col>
        </Row>
      </CardContainer>
      <Modal title={openModal?.title} open={openModal?.open} footer={false} onCancel={() => setOpenModal({ ...openModal, open: false })} style={{ minWidth: '40vw' }}>
        { ObtainComponentUser() }
      </Modal>
    </>
  )
}

export default Users