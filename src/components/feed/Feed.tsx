import { Foto } from "@/actions/get-fotos";
import FeedFotos from "./FeedFotos";

export default function Feed({ fotos }: { fotos: Foto[] }) {
  return (
    <>
      <div>
        <FeedFotos fotos={fotos} />
      </div>
    </>
  );
}
