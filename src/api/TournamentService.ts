import axios from "axios"
import { ResponseType } from "../types/app"
import TournamentI from "../types/tournament"
import { GetHeaders } from "../utils/auth_tool"

export async function GetTournaments (): Promise<ResponseType<Object | string>> {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/v1/tournaments/get`
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al obtener datos, recarga la pagina'
        }
    }
}

export async function CreateNewTournament (data: TournamentI): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/tournaments/create`,
            data,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al crear torneo, intenta nuevamente'
        }
    }
}

export async function UpdateTournament (data: any): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()
    try {
        const res = await axios.patch(
            `${import.meta.env.VITE_API_URL}/v1/tournaments/update`,
            data,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al actualizar torneo, intenta nuevamente'
        }
    }
}

export async function DeleteTournament (data: any): Promise<ResponseType<Object | string>> {
    const headers = await GetHeaders()

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/tournaments/delete`,
            data,
            headers
        )
        return {
            status: res.status,
            response: res.data
        }
    } catch (error: any) {
        return {
            status: error.response.status ?? 500,
            response: error.response.data ?? 'Error al eliminar torneo, intenta nuevamente'
        }
    }
}

