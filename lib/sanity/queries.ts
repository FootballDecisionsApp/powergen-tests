// ─── Featured hero product (home page — single highlighted product) ───────────
export const featuredHeroQuery = `
  *[_type == "product" && featured == true && inStock == true]
  | order(powerKW desc) [0] {
    _id,
    name,
    slug,
    description,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    specifications,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── Featured products (home page) ────────────────────────────────────────────
export const featuredProductsQuery = `
  *[_type == "product" && featured == true && inStock == true][0...3]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── All products (list page — no filter) ─────────────────────────────────────
export const allProductsQuery = `
  *[_type == "product" && inStock == true]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── Filtered products (list page — with searchParams) ────────────────────────
// Params: $fuelType (string|""), $minKW (number), $maxKW (number), $inStockOnly (bool)
export const filteredProductsQuery = `
  *[_type == "product"
    && ($fuelType == "" || fuelType == $fuelType)
    && powerKW >= $minKW
    && powerKW <= $maxKW
    && (!$inStockOnly || inStock == true)
  ]
  | order(powerKW asc) {
    _id,
    name,
    slug,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": category->name
  }
`

// ─── Single product by slug (detail page) ─────────────────────────────────────
// Params: $slug (string)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    specifications,
    seoTitle,
    seoDescription,
    "images": images[].asset->url,
    "imageAlts": images[].alt,
    "category": category->name,
    "categorySlug": category->slug.current,
    "related": *[_type == "product"
      && fuelType == ^.fuelType
      && slug.current != $slug
      && inStock == true
    ][0...3] {
      _id, name, slug, price, powerKW, fuelType,
      "image": images[0].asset->url
    }
  }
`

// ─── All slugs (for generateStaticParams) ─────────────────────────────────────
export const allProductSlugsQuery = `
  *[_type == "product"] { "slug": slug.current }
`

// ─── All categories ────────────────────────────────────────────────────────────
export const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    slug,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`

// ─── Product prices (server-side validation — API route use only) ──────────────
// Params: $ids (array of strings)
export const productPricesQuery = `
  *[_type == "product" && _id in $ids] {
    _id,
    price,
    name,
    inStock
  }
`
