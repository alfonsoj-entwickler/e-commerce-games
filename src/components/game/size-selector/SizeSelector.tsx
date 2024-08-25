import type { ValidSizes } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ValidSizes;
  availableSizes: ValidSizes[];
  onSizeChanged: (size: ValidSizes) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Hardware available</h3>
      <div className="flex">
        {availableSizes.length > 0 &&
          availableSizes.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => onSizeChanged(size)}
              className={clsx("mx-2 hover:underline text-lg", {
                underline: size === selectedSize,
              })}
            >
              {size}
            </button>
          ))}
      </div>
    </div>
  );
};
