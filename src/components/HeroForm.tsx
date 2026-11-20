import { useState, type FormEvent } from "react"
import axios from "axios"
import { api } from "../api"
import { MAIN_ATTRIBUTES, MAIN_ATTRIBUTE_LABELS } from "../types"
import type { MainAttribute, THeroInput } from "../types"
import { useHeroesStore } from "../store/useHeroesStore"

const initialForm: THeroInput = {
    Name: "",
    description: "",
    MainAttribute: MAIN_ATTRIBUTES[0],
    strength: 0,
    agility: 0,
    intelligence: 0,
    CreationDate: new Date().toISOString().slice(0, 10),
}

export function HeroForm() {
    const [form, setForm] = useState<THeroInput>(initialForm)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { getHeroes } = useHeroesStore()

    const onChange = <K extends keyof THeroInput>(key: K, value: THeroInput[K]) => {
        setForm((o) => ({ ...o, [key]: value }))
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        try {
            setIsLoading(true)
            await api.createHero(form)
            getHeroes()
            setForm(initialForm)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error?.message ?? err.message)
            } else {
                setError("Не удалось сохранить")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="form">
            <h2>Добавить героя</h2>

            <label className="field">
                Имя
                <input
                    onChange={(e) => onChange("Name", e.target.value)}
                    type="text"
                    name="Name"
                    value={form.Name}
                    required
                />
            </label>

            <label className="field">
                Описание
                <textarea
                    rows={3}
                    onChange={(e) => onChange("description", e.target.value)}
                    name="description"
                    value={form.description ?? ""}
                />
            </label>

            <label className="field">
                Основной атрибут
                <select
                    value={form.MainAttribute}
                    onChange={(e) => onChange("MainAttribute", e.target.value as MainAttribute)}
                    required
                >
                    {MAIN_ATTRIBUTES.map((a) => (
                        <option key={a} value={a}>
                            {MAIN_ATTRIBUTE_LABELS[a]}
                        </option>
                    ))}
                </select>
            </label>

            <div className="row">
                <label className="field">
                    Сила
                    <input
                        onChange={(e) => onChange("strength", Number(e.target.value))}
                        type="number"
                        name="strength"
                        value={form.strength}
                        min={0}
                        step={1}
                        required
                    />
                </label>
                <label className="field">
                    Ловкость
                    <input
                        onChange={(e) => onChange("agility", Number(e.target.value))}
                        type="number"
                        name="agility"
                        value={form.agility}
                        min={0}
                        step={1}
                        required
                    />
                </label>
            </div>

            <div className="row">
                <label className="field">
                    Интеллект
                    <input
                        onChange={(e) => onChange("intelligence", Number(e.target.value))}
                        type="number"
                        name="intelligence"
                        value={form.intelligence}
                        min={0}
                        step={1}
                        required
                    />
                </label>
                <label className="field">
                    Дата создания
                    <input
                        onChange={(e) => onChange("CreationDate", e.target.value)}
                        type="date"
                        name="CreationDate"
                        value={form.CreationDate ?? ""}
                    />
                </label>
            </div>

            {error && <p className="error">{error}</p>}

            <button disabled={isLoading} className="btn">
                {isLoading ? "Сохраняем…" : "Добавить героя"}
            </button>
        </form>
    )
}