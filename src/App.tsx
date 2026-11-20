import { useEffect, useState } from "react"
import axios from "axios"
import { HeroCard } from "./components/HeroCard"
import { HeroForm } from "./components/HeroForm"
import { useHeroesStore } from "./store/useHeroesStore"
import "./App.css"

export default function App() {
    const { heroes, getHeroes } = useHeroesStore()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                await getHeroes()
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.error?.message ?? err.message)
                } else {
                    setError("Что-то пошло не так")
                }
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return (
        <div className="layout">
            <header className="top">
                <h1>Герои Dota 2</h1>
                <span className="pill">Количество {heroes?.data.length ?? 0}</span>
            </header>

            <aside>
                <HeroForm />
            </aside>

            <main>
                {loading ? (
                    <p className="hint">Загрузка…</p>
                ) : error ? (
                    <p className="error">Ошибка: {error}</p>
                ) : heroes?.data && heroes.data.length > 0 ? (
                    <div className="grid">
                        {heroes.data.map((el) => (
                            <HeroCard key={el.documentId} {...el} />
                        ))}
                    </div>
                ) : (
                    <p className="hint">Добавьте героя</p>
                )}
            </main>
        </div>
    )
}