// components
import CardItem, { CardItemProps } from "@/components/common/card-item";

interface CardsListProps {
  data: CardItemProps[];
}

export default function CardsList({ data }: CardsListProps) {
  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </section>
  );
}
