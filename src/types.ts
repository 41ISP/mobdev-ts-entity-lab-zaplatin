export interface IStrapiResponse<T> {
    data: T
    meta: Meta
}

export const MAIN_ATTRIBUTES = ["strength", "dexterity", "intelligence", "universal"] as const
export type MainAttribute = (typeof MAIN_ATTRIBUTES)[number]

export const MAIN_ATTRIBUTE_LABELS: Record<MainAttribute, string> = {
    strength: "Сила",
    dexterity: "Ловкость",
    intelligence: "Интеллект",
    universal: "Универсал",
}

export interface IHero {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    Name: string
    description: string | null
    MainAttribute: MainAttribute
    strength: number
    agility: number
    intelligence: number
    portrait: IPortrait | null
    CreationDate: string | null
}

export type THeroInput = Omit<
    IHero,
    "id" | "documentId" | "createdAt" | "updatedAt" | "publishedAt" | "portrait"
>

export interface IPortrait {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    caption: string | null
    focalPoint: null
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: null
    provider: string
    provider_metadata: null
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface Formats {
    small?: Small
    medium?: Medium
    thumbnail: Thumbnail
}

export interface Small {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: null
    size: number
    width: number
    height: number
    sizeInBytes: number
}

export interface Medium {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: null
    size: number
    width: number
    height: number
    sizeInBytes: number
}

export interface Thumbnail {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: null
    size: number
    width: number
    height: number
    sizeInBytes: number
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}