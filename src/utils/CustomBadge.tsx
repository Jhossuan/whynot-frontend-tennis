import { Badge } from 'antd';

const CustomBadge = (status: string) => {
  switch (status.toUpperCase()) {
    case 'OPEN':
        return <Badge color='#1cba00' count="INSCRIPCIONES ABIERTAS" />
    case 'CLOSED':
        return <Badge color='#ecaf00' count="INSCRIPCIONES CERRADAS" />
    case 'POSTPONED':
        return <Badge color='#00b4d8' count="POSPUESTO" />
    case 'FINISHED':
        return <Badge color='#00ca81' count="FINALIZADO" />
    case 'PENDING':
        return <Badge color='#e7d904' count="PENDIENTE" />
    case 'CANCELED':
        return <Badge color='#f00000' count="CANCELADO" />
    case 'REGULAR':
        return <Badge color='#00b4d8' count="Participante" />
    case 'ADMIN':
        return <Badge color='#e7d904' count="Administrador" />

    default:
        return <Badge color='#569b4a' count={status} />
  }
}

export default CustomBadge