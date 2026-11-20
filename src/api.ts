import axios from "axios"
import type { IHero, IStrapiResponse, THeroInput } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getHeroes = async (): Promise<IStrapiResponse<IHero[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IHero[]>>("/dota2s", {
        params: {
            populate: "*",
        },
    })
    return res.data
}

const createHero = async (input: THeroInput): Promise<IHero> => {
    const res = await apiInstance.post("/dota2s", { data: input })
    return res.data.data
}

const deleteHero = async (id: string): Promise<void> => {
    await apiInstance.delete(`/dota2s/${id}`)
}

export const api = { getHeroes, createHero, deleteHero }