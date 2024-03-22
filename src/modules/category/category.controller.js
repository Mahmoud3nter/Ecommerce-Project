import { nanoid } from "nanoid";
import categoryModel from "../../../DB/models/category.model.js";
import { AppError, asyncHandler } from "../../utils/asyncHandler.js";
import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import brandModel from "../../../DB/models/brand.model.js";

////////////////////////createCategory////////////////
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const categoryExist = await categoryModel.findOne({
    name: name.toLowerCase(),
  });

  if (categoryExist) {
    return next(new AppError("category already exist", 409));
  }
  const slug = slugify(name, {
    replacement: "_",
    lower: true,
  });
  const customid = nanoid(4);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `Ecommercec/categories/${customid}`,
    }
  );
  const category = await categoryModel.create({
    name,
    slug,
    image: { secure_url, public_id },
    customid,
    createdBy: req.user._id,
  });
  if (!category) {
    await cloudinary.uploader.destroy(public_id);
    return next(new AppError("fail", 500));
  }
  res.status(201).json({ message: "done", category });
});

///////////////////updateCategory//////////////////
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const category = await categoryModel.findOne({
    _id: id,
    createdBy: req.user._id,
  });

  if (!category) {
    return next(new AppError("category not exist or you are not owner!", 404));
  }

  if (name) {
    if (name.toLowerCase() == category.name) {
      return next(
        new AppError("category name match old name plz change it!", 400)
      );
    }

    if (await categoryModel.findOne({ name: name.toLowerCase() })) {
      return next(new AppError("category namealready exist!", 400));
    }
    category.name = name.toLowerCase();
    category.slug = slugify(name, {
      replacement: "_",
      lower: true,
    });
  }

  if (req.file) {
    await cloudinary.uploader.destroy(category.image.public_id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `Ecommercec/categories/${category.customid}`,
      }
    );
    category.image = { secure_url, public_id };
  }


  await category.save();
  res.status(200).json({ message: "done", category });
});


///////////////////getCategories//////////////////
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.find().populate([
    {
      path: "subCategory",
      populate: [
        {
          path: "brand",
        },
      ],
    },
  ]);
  res.status(200).json({ message: "done", categories });
});



///////////////////deleteCategory//////////////////
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findOneAndDelete({
    _id: id,
    createdBy: req.user._id,
  });
    if (!category) {
    return next(new AppError("category not exist or you are not owner!", 404));
  }
  const deletedRelatedSubCategory = await subCategoryModel.deleteMany({
    categoryId: id,
  });
  if (!deletedRelatedSubCategory.deletedCount) {
    return next(new AppError("failed to deleted some related fields ", 404));
  }
  const deletedRelatedBrands = await brandModel.deleteMany({
    categoryId: id,
  });
  if (!deletedRelatedBrands.deletedCount) {
    return next(new AppError("failed to deleted some related fields ", 404));
  }

  await cloudinary.api.delete_resources_by_prefix(
    `Ecommercec/categories/${category.customid}`
  );

  await cloudinary.api.delete_folder(`Ecommercec/categories/${category.customid}`);
  res.status(200).json({ message: "done" });
});
