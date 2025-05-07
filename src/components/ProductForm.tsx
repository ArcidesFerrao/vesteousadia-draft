"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { updateSchema } from "@/schema/productSchema";
import { Product, ProductSize } from "@prisma/client";
import { updateProduct } from "@/actions/products";
import toast from "react-hot-toast";

type Category = {
  id: number;
  name: string;
  description: string | null;
};

export default function ProductForm({
  product,
  productSize,
}: {
  product?: Product | null;
  productSize?: ProductSize[] | null;
}) {
  const [state, action, pending] = useActionState(updateProduct, undefined);
  const [priceFormat, setPriceFormat] = useState<number | null>(
    product?.price || null
  );
  const [categoriesL, setCategoriesL] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>();
  const [discount, setDiscount] = useState(false);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value.toString());
    console.log(selectedCategory);
  };

  const handleDiscountCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  };

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    }
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Error fetching categories");
        const categoryData = await res.json();
        setCategoriesL(categoryData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    getCategories();
  }, [state]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setPriceFormat(value);
  };

  // console.log(pending);
  return (
    <div className="form-product flex flex-col">
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="flex flex-col gap-6 p-4 h-fit"
      >
        <input
          type="hidden"
          defaultValue={product?.id}
          id="productId"
          name="productId"
        />
        <div className="name-price flex gap-4">
          <div className="name  flex justify-between">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={pending}
              defaultValue={product?.name}
            />
          </div>
          <div className="price flex gap-2 items-center">
            <label htmlFor="price">Preco:</label>
            <input
              type="number"
              id="price"
              name="price"
              min={100}
              value={priceFormat !== null ? priceFormat.toString() : ""}
              onChange={handlePriceChange}
            />
            <span>
              <p>
                {priceFormat !== null
                  ? `${priceFormat.toFixed(2)} MZN`
                  : "0.00 MZN"}
              </p>
            </span>
          </div>
        </div>
        <fieldset>
          <legend>Categoria</legend>
          <div className="radio-category flex gap-2">
            {categoriesL.map((category) => (
              <label key={category.id} className="radio">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  onChange={handleCategoryChange}
                  defaultChecked={product?.categoryId === category.id}
                />
                <span className="radio-option">{category.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="category flex justify-between">
          <div className="radio-category flex gap-2">
            {categoriesL.map((category) => (
              <label key={category.id} className="radio">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  onChange={handleCategoryChange}
                  defaultChecked={product?.categoryId === category.id}
                />
                <span className="radio-option">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="discount-section flex gap-12">
          <div className="check-discount flex gap-4">
            <input
              type="checkbox"
              name="discounted"
              id="discounted"
              onChange={handleDiscountCheck}
              defaultChecked={product?.discounted}
            />
            <label htmlFor="discount">Discount</label>
          </div>
          {discount && (
            <div className="discount-amount flex gap-4 ">
              <label htmlFor="discountAmount">Discount Amount:</label>
              <input
                type="number"
                name="discountAmount"
                id="discountAmount"
                defaultValue={product?.discountAmount || "0"}
                min={0}
                max={90}
                required={discount}
              />
            </div>
          )}
        </div>
        <div className="size flex flex-col gap-4">
          <label>Tamanho:</label>
          <div className="sizeInput flex gap-4">
            {productSize &&
              ["s", "m", "l", "xl"].map((size) => {
                const sizeData = productSize.find((ps) => ps.size === size) || {
                  size,
                  stock: 0,
                };

                const sizeNameMap: Record<string, string> = {
                  s: "small",
                  m: "medium",
                  l: "large",
                  xl: "extralarge",
                };

                // console.log("size data", size, sizeData?.stock);
                return (
                  <label
                    key={size}
                    htmlFor={size.toLocaleLowerCase()}
                    className="flex flex-col"
                  >
                    <span>{size.toLocaleUpperCase()}</span>
                    <input
                      type="number"
                      min={0}
                      id={size.toLocaleLowerCase()}
                      name={sizeNameMap[size]}
                      defaultValue={Number(sizeData.stock)}
                    />
                  </label>
                );
              })}
          </div>
        </div>
        <div className="bottom-section flex justify-between gap-8">
          <div className="left-section flex flex-col gap-4 justify-between">
            <div className="color flex justify-between">
              <label htmlFor="color">Cor:</label>
              <input
                type="text"
                id="color"
                name="color"
                defaultValue={product?.color}
              />
            </div>
            <div className="brand flex justify-between">
              <label htmlFor="brand">Marca:</label>
              <input
                type="text"
                id="brand"
                name="brand"
                defaultValue={product?.brand}
              />
            </div>
          </div>
        </div>

        <div className="imagesUpload flex justify-center">
          <div className="main-image-upload flex flex-col gap-4">
            <h3>Main Image</h3>
            <input
              type="hidden"
              defaultValue={product?.imageUrl}
              name="imageUrl"
            />
            {mainImage || product?.imageUrl ? (
              <Image
                src={mainImage || product?.imageUrl || ""}
                width={300}
                height={300}
                alt="main image"
              />
            ) : (
              <UploadDropzone
                className="ut-labe:text-md ut-allowed-content:ut-uploading:text-red-200"
                endpoint="imageUploader"
                onClientUploadComplete={(resMain) => {
                  console.log("Files: ", resMain);
                  setMainImage(resMain[0].url);
                  alert("Upload Completed");
                }}
                onUploadError={() => {
                  alert("something went wrong");
                }}
              />
            )}
          </div>
        </div>
        <SubmitButton pending={pending} />
      </form>
      {fields.name.errors && (
        <p className="errorsField">{fields.name.errors}</p>
      )}
      {fields.category.errors && (
        <p className="errorsField">{fields.category.errors}</p>
      )}
      {fields.price.errors && (
        <p className="errorsField">{fields.price.errors}</p>
      )}
      {fields.brand.errors && (
        <p className="errorsField">{fields.brand.errors}</p>
      )}
      {fields.color.errors && (
        <p className="errorsField">{fields.color.errors}</p>
      )}
      {fields.imageUrl.errors && (
        <p className="errorsField">{fields.imageUrl.errors}</p>
      )}
      {fields.backImageUrl.errors && (
        <p className="errorsField">{fields.backImageUrl.errors}</p>
      )}
      {fields.description.errors && (
        <p className="errorsField">{fields.description.errors}</p>
      )}
      {fields.small.errors && (
        <p className="errorsField">{`small ${fields.small.errors}`}</p>
      )}
      {fields.medium.errors && (
        <p className="errorsField">{`medium ${fields.medium.errors}`}</p>
      )}
      {fields.large.errors && (
        <p className="errorsField">{`large ${fields.large.errors}`}</p>
      )}
      {fields.extralarge.errors && (
        <p className="errorsField">{`extralarge ${fields.extralarge.errors}`}</p>
      )}
      {fields.discountAmount.errors && (
        <p className="errorsField">{`discountAmount ${fields.discountAmount.errors}`}</p>
      )}
      {fields.discounted.errors && (
        <p className="errorsField">{`discounted ${fields.discounted.errors}`}</p>
      )}
    </div>
  );
}

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <input
      className={pending ? "sudmit-button" : ""}
      type="submit"
      name="submit"
      id="submit"
      value={pending ? "Updating..." : "Update"}
      disabled={pending}
    />
  );
};
