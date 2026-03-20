// ─── Helpers ──────────────────────────────────────────────────────────────────
// All queries accept $locale ("bg" | "en"). Fields fall back to BG if EN is missing.

const localeName = `select($locale == "en" && defined(name_en) => name_en, name)`
const localeDesc = `select($locale == "en" && defined(description_en) => description_en, description)`
const localeCat  = `select($locale == "en" && defined(category->name_en) => category->name_en, category->name)`
const localeSpec = `"key": select($locale == "en" && defined(definition->label_en) => definition->label_en, definition->label_bg), value`

// ─── Featured hero product (home page — single highlighted product) ───────────
export const featuredHeroQuery = `
  *[_type == "product" && featured == true && inStock == true]
  | order(powerKW desc) [0] {
    _id,
    "name": ${localeName},
    slug,
    "description": ${localeDesc},
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "specifications": specifications[] { ${localeSpec} },
    "image": images[0].asset->url,
    "imageAlt": images[0].alt,
    "category": ${localeCat}
  }
`

// ─── Featured products (home page) ────────────────────────────────────────────
export const featuredProductsQuery = `
  *[_type == "product" && featured == true && inStock == true][0...3]
  | order(powerKW asc) {
    _id,
    "name": ${localeName},
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
    "category": ${localeCat}
  }
`

// ─── All products (list page — no filter) ─────────────────────────────────────
export const allProductsQuery = `
  *[_type == "product" && inStock == true]
  | order(powerKW asc) {
    _id,
    "name": ${localeName},
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
    "category": ${localeCat}
  }
`

// ─── Filtered products (list page — with searchParams) ────────────────────────
// Params: $locale, $fuelType (string|""), $minKW (number), $maxKW (number), $inStockOnly (bool)
export const filteredProductsQuery = `
  *[_type == "product"
    && ($fuelType == "" || fuelType == $fuelType)
    && powerKW >= $minKW
    && powerKW <= $maxKW
    && (!$inStockOnly || inStock == true)
  ]
  | order(powerKW asc) {
    _id,
    "name": ${localeName},
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
    "category": ${localeCat}
  }
`

// ─── Single product by slug (detail page) ─────────────────────────────────────
// Params: $locale, $slug (string)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "name": ${localeName},
    slug,
    "description": ${localeDesc},
    price,
    oldPrice,
    powerKW,
    powerKVA,
    fuelType,
    phases,
    inStock,
    autoStart,
    "specifications": specifications[] { ${localeSpec} },
    seoTitle,
    seoDescription,
    "images": images[].asset->url,
    "imageAlts": images[].alt,
    "category": ${localeCat},
    "categorySlug": category->slug.current,
    "related": *[_type == "product"
      && fuelType == ^.fuelType
      && slug.current != $slug
      && inStock == true
    ][0...3] {
      _id,
      "name": ${localeName},
      slug,
      price,
      powerKW,
      fuelType,
      "image": images[0].asset->url
    }
  }
`

// ─── All slugs (for generateStaticParams) ─────────────────────────────────────
export const allProductSlugsQuery = `
  *[_type == "product"] { "slug": slug.current }
`

// ─── All categories ────────────────────────────────────────────────────────────
// Params: $locale
export const categoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    "name": ${localeCat},
    slug,
    "productCount": count(*[_type == "product" && references(^._id)])
  }
`

// ─── Product prices (server-side validation — API route use only) ──────────────
// Params: $ids (array of strings) — no locale needed, prices are language-neutral
export const productPricesQuery = `
  *[_type == "product" && _id in $ids] {
    _id,
    price,
    name,
    inStock
  }
`
