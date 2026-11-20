import { api, API_URL } from "../api"
import { useHeroesStore } from "../store/useHeroesStore"
import { MAIN_ATTRIBUTE_LABELS } from "../types"
import type { IHero } from "../types"

interface IHeroCardProps extends IHero {}

export function HeroCard({
    Name,
    description,
    MainAttribute,
    strength,
    agility,
    intelligence,
    portrait,
    CreationDate,
    documentId,
}: IHeroCardProps) {
    const { getHeroes } = useHeroesStore()

    const formattedDate = CreationDate
        ? new Date(CreationDate).toLocaleDateString("ru-RU")
        : "—"

    const handleDelete = async () => {
        await api.deleteHero(documentId)
        getHeroes()
    }

    return (
        <article className="card" aria-label={`Герой ${Name}`}>
            <div className="card__cover">
                {portrait?.url ? (
                    <img
                        src={API_URL + portrait.url}
                        alt={portrait.alternativeText ?? Name}
                        loading="lazy"
                    />
                ) : (
                    <span>{Name.charAt(0)}</span>
                )}
                <b className="card__badge">{MAIN_ATTRIBUTE_LABELS[MainAttribute]}</b>
            </div>

            <div className="card__body">
                <h3>{Name}</h3>
                {description && <p className="card__desc">{description}</p>}
                <p className="card__meta">Сила: {strength}</p>
                <p className="card__meta">Ловкость: {agility}</p>
                <p className="card__meta">Интеллект: {intelligence}</p>
                <p className="card__meta">Дата создания: {formattedDate}</p>
            </div>

            <footer className="card__footer">
                <button
                    className="link-btn"
                    onClick={handleDelete}
                    aria-label={`Удалить героя ${Name}`}
                >
                    Удалить
                </button>
            </footer>
        </article>
    )
}