import { create } from "zustand"
import { api } from "../api"
import type { IHero, IStrapiResponse } from "../types"

interface IHeroStore {
    heroes: IStrapiResponse<IHero[]> | undefined
    getHeroes: () => Promise<void>
}

export const useHeroesStore = create<IHeroStore>((set) => ({
    heroes: undefined,
    getHeroes: async () => {
        const res = await api.getHeroes()
        set({ heroes: res })
    },
}))