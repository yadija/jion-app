import { TbHeart } from "react-icons/tb";

export default function Footer() {
  return (
    <footer className="bg-fun-blue py-4 text-center text-soft-peach selection:bg-soft-peach dark:bg-denim-blue dark:selection:bg-soft-peach">
      <p className="inline-flex">
        Create with{" "}
        <TbHeart className="mx-1 translate-y-[0.3rem] text-pink-500" /> by
        yadija
      </p>
    </footer>
  );
}
