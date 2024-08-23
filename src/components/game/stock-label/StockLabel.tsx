"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  // const stock = await getStockBySlug(slug);
  const [stockLabel, setStockLabel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStockLabel(stock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <p className={`mb-2 bg-gray-200 animate-pulse`}>&nbsp;</p>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stockLabel}
        </h1>
      )}
    </>
  );
};
