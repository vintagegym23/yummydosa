# /public/images/menu/

Real dish photography for the menu, organized by category to match
`src/data/menuImageCatalog.ts`:

```
dosa/          Classic dosa menu
rava-dosa/     Rava dosa menu
special-dosa/  Special Dosas + Yummy Dosa Special Dosas
south-indian/  All-Time Favorites (idli, vada, pongal, upma, etc.)
starters/      Starters, soups, desi snacks
chaat/         Desi chaat
kids/          Kids menu
thali/         Thalis + extras/sides
drinks/        Soft drinks, lassi/milkshakes, juices, hot drinks, shakes
desserts/      Ice cream/kulfi, falooda, waffles, packaged sweets
```

## Adding a photo

1. Find the dish's intended filename in `src/data/menuImageCatalog.ts`
   (the `image` field, e.g. `/images/menu/dosa/masala-dosa.webp`).
2. Export/crop the photo to that exact path, WebP format, ~1200px on the
   long edge, cropped tight on the food (see the craveability notes in
   `MISSING_IMAGES.md` at the project root).
3. That's it — no code changes. `DishImage` (`src/components/DishImage.tsx`)
   requests the path directly; once the file exists it renders, and until
   then it shows a "Photo coming soon" placeholder instead of a broken
   image or a substituted, unrelated dish.

Never rename a dish's id in the catalog without also renaming its file,
and never point two unrelated dishes at the same file.
