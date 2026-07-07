import { CATEGORY_CARDS } from "@/data/events";
import type { EventCategory } from "@/types/event";

interface CategoriesProps {
  onSelectCategory: (category: EventCategory) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <h2 className="section-title">Browse by category</h2>
        <div className="category-cards">
          {CATEGORY_CARDS.map((card) => (
            <button
              key={card.category}
              className="category-card"
              type="button"
              onClick={() => onSelectCategory(card.category)}
            >
              <span className="category-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
