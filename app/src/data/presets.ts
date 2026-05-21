// Backward compatibility re-export from products.ts
export type {
  Product as Preset,
  ProductFormat as PresetFormat,
  ProductBadge,
  ProductCategory,
} from './products';

export {
  allProducts as allPresets,
  categories,
  getProductById as getPresetById,
  getProductsByCategory as getPresetsByCategory,
  getProductsByFormat as getPresetsByFormat,
  getCategoryById,
  getFeaturedProducts,
  getRelatedProducts,
  productCategories,
} from './products';
