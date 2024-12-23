// components
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentGallerySkeletonProps {
  type: "Anime" | "Manga" | "Producer";
}

export default function ContentGallerySkeleton({
  type,
}: ContentGallerySkeletonProps) {
  return (
    <section className="mx-auto flex h-[calc(100vh_-_var(--navbar-height))] max-w-7xl flex-col justify-between overflow-hidden px-5">
      <section>
        <Skeleton className="mb-2 h-9" />
      </section>

      <section className="mb-5 grow">
        <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 24 }).map((_, index) => (
            <AspectRatio
              key={index}
              ratio={type === "Producer" ? 1 / 1 : 4 / 5}
            >
              <Skeleton className="size-full" />
            </AspectRatio>
          ))}
        </section>
      </section>

      <section className="py-10">
        <Skeleton className="h-10" />
      </section>
    </section>
  );
}
