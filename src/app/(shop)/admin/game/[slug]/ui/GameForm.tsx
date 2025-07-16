"use client";

import { createUpdateGame } from "@/actions";
import { Category, Game, GameImage } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  game: Partial<Game> & { GameImage?: GameImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  categoryId: string;
  images?: FileList;
}

export const GameForm = ({ game, categories }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...game,
      tags: game.tags?.join(","),
      images: undefined,
    },
  });
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...gameToSave } = data;
    if (game.id) {
      formData.append("id", game.id ?? "");
    }
    formData.append("title", gameToSave.title);
    formData.append("slug", gameToSave.slug);
    formData.append("description", gameToSave.description);
    formData.append("price", gameToSave.price.toString());
    formData.append("inStock", gameToSave.inStock.toString());
    formData.append("tags", gameToSave.tags);
    formData.append("categoryId", gameToSave.categoryId);
    if (images) {
      for (let index = 0; index < images.length; index++) {
        formData.append("images", images[index]);
      }
    }

    const { ok, game: updateGame } = await createUpdateGame(formData);
    if (!ok) {
      alert("Not created a new game");
      return;
    }
    router.replace(`/admin/game/${updateGame?.slug}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
            value={game.title ?? ""}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={`option-${category.name}`} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Save
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>inStock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {game.GameImage?.map((image) => (
                <div key={image.id} className="shadow">
                  <Image
                    alt={game.title}
                    src={`/products/${image.url}`}
                    width={300}
                    height={300}
                    className="rounded-t"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      console.log(image.id, image.url);
                    }}
                    className="btn-danger w-full rounded-b-xl"
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
