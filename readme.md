# Arusuvai v1.0.0 — Your Recipe Companion

Arusuvai is a local-first, mobile-first recipe book designed for everyday kitchen use. It keeps recipes, bilingual ingredient information, cooking instructions, favorites, recent recipes and culinary-dictionary data in the browser, while providing high-resolution recipe-card export and optional Google Drive backup/sync.

The application is a standalone HTML app and can be hosted as a static site such as GitHub Pages.

## Version

**Arusuvai v1.0.0**

The application version is intentionally kept at **1.0.0**.

## What is included

### Recipe book
- Built-in vegetarian-focused recipe examples.
- Recipe numbers, cuisine, rating, description and local-language name.
- Prep time, cook time, total time, servings and difficulty.
- Equipment / toolkit and taste profile.
- Grouped ingredients with measurement and ingredient text.
- Timed cooking phases with step-by-step instructions and notes.
- Cheat sheet sections for make-ahead, substitutions and pairing.
- Optional recipe note.
- Create, edit, duplicate and delete recipes.
- Favorite recipes and recently opened recipes.

### Search and discovery
- Search by recipe name, Recipe No., local-language name, ingredient, alias, cuisine and taste.
- English/Tamil ingredient display.
- Cross-language ingredient matching through the Culinary Dictionary.
- Quick filters such as ≤30 minutes, Easy, South Indian and Sweet.
- Favorites and Recent Recipes shortcuts.

### Culinary Dictionary
- Add, edit and maintain reusable ingredient terms.
- Store English and local-language terms.
- Store comma-separated aliases.
- Organize dictionary entries into categories.
- Dictionary data participates in JSON backup/import and Google Drive sync.

### Themes
- Light and dark themes.
- Recipe viewing follows the active theme.
- Export layouts use the active theme.

### Recipe image / PNG export
- Export the complete recipe card as a PNG.
- PNG rendering is produced at **3× the base export resolution** for higher-resolution output.
- The complete card is rendered rather than only the visible viewport.
- Optional recipe artwork watermark can be placed behind the card.
- The watermark checkbox is enabled by default.
- Dark-theme watermark exports use a dark base (`#22201B`) so the recipe remains readable.
- The export uses the same structured recipe-card layout as the PDF/print version.

### Print / PDF
- The recipe card can be opened in the browser print dialog.
- Use **Print → Save as PDF** to create a PDF.
- Print/PDF uses the same export layout and active theme.
- Background graphics/colors may need to be enabled in the browser print dialog for the intended visual result.

### Backup and restore
The **Settings → Data Backup** section supports separate JSON files for:
- App Settings
- Recipes
- Culinary Dictionary
- All Data

Backup options can include:
- Favorites
- Recent Recipes

Import:
- Identifies Arusuvai backup files by their backup header/type.
- Supports **Merge** or **Replace** for the matching data type.
- Multiple JSON files can be selected for one import operation.

Important: recipe JSON backups intentionally do not carry the embedded recipe artwork payload. Built-in/default recipe artwork is restored by the application itself. If a future recipe uses a separately supplied/custom image, keep that image separately if it is not embedded by the application.

### Reset
Data Backup also provides:
- Clear all local data and leave the app empty.
- Clear all local data and restore the built-in defaults.

These operations affect the browser's local Arusuvai data on that device/browser.

### Google Drive sync
Google Drive is optional.

The current app can sync:
- App Settings
- Recipes
- Culinary Dictionary
- All Data

The sync uses JSON files in the user's own Google Drive:
- `arusuvai_settings.json`
- `arusuvai_recipes.json`
- `arusuvai_culdict.json`
- `arusuvai_all_data.json`

When both local and Drive data exist, Arusuvai can:
- Keep local data and upload it.
- Keep Drive data and restore it locally.
- Merge local and Drive data.

The current implementation uses Google Identity Services and the Google Drive API with the `drive.file` scope.

A Google OAuth Web Client ID must be configured for the hosted deployment. The app does **not** hard-code another deployment's OAuth credential. Enter the client ID under **Settings → Data Backup**.

Google Drive requires a hosted HTTPS deployment such as GitHub Pages. Opening the HTML directly with `file://` is not sufficient for Drive authorization or PWA installation.

## Local storage

Normal recipe browsing, editing, search, favorites, recent recipes and local backup work without a server.

Application data is stored in the browser's local storage for the device/browser where Arusuvai is used.

Clearing browser site data can remove the local application data. Keep JSON backups if the data matters.

## PWA deployment

The intended GitHub Pages deployment contains:

```text
index.html
manifest.json
service-worker.js
pwa-192x192.png
pwa-512x512.png
pwa-maskable-512x512.png
readme.md
readme.html
privacy.html
terms.html
LICENSE
```

### Service worker

The supplied `service-worker.js`:
- Uses an Arusuvai v1.0.0 cache namespace.
- Pre-caches the application shell and documentation/legal files.
- Removes older Arusuvai caches during activation.
- Uses a network-first strategy for navigations / `index.html`, helping a hosted update become available without requiring a cache-name change.
- Uses cached assets as an offline fallback.
- Does not intercept cross-origin Google API requests.

The service worker must be registered by the application page to become active. The current HTML file was intentionally left untouched in this delivery, so if the HTML does not already contain a service-worker registration block, add that registration separately.

## Manifest and icons

The manifest is configured for:
- Standalone display.
- Arusuvai as the app name.
- Light default background and blue application theme.
- 192×192 standard icon.
- 512×512 standard icon.
- 512×512 maskable icon.

The icons are generated from the supplied Arusuvai artwork.

## Recommended GitHub Pages setup

1. Upload the final `index.html` without renaming its application logic.
2. Upload `manifest.json`.
3. Upload `service-worker.js`.
4. Upload all three PWA PNG icons.
5. Upload `readme.md` and `readme.html`.
6. Upload `privacy.html`, `terms.html` and `LICENSE`.
7. Enable GitHub Pages for the repository.
8. Open the HTTPS GitHub Pages URL.
9. Test:
   - Recipe search and editing.
   - Favorites and Recent Recipes.
   - JSON backup/export and import.
   - PNG export in both themes.
   - Print / Save as PDF in both themes.
   - Google Drive connection and sync.
   - PWA installation.
   - Offline reopening after the first successful load.

## Google OAuth setup

For a GitHub Pages deployment:

1. Create/select a Google Cloud project.
2. Enable the Google Drive API.
3. Configure the OAuth consent screen.
4. Create an OAuth Client ID for a **Web application**.
5. Add the exact GitHub Pages origin as an authorized JavaScript origin.
6. Put the generated client ID into **Settings → Data Backup → Google OAuth Client ID**.
7. Test Google sign-in from the HTTPS GitHub Pages deployment.

Do not commit private OAuth client secrets. A browser OAuth client ID itself is not a secret, but it must be restricted to the correct authorized web origins.

## Privacy

Arusuvai's core data model is local-first. The app does not require a developer-operated database or application server for normal use.

If Google Drive is connected, selected backup data is sent to the user's own Google Drive through Google's APIs. Review `privacy.html` for the deployment-specific privacy terms.

## Legal

- `privacy.html` — privacy information.
- `terms.html` — terms of use.
- `LICENSE` — MIT License.

Arusuvai is provided as open-source software under the MIT License.

## Documentation

- `README.md` — source/repository documentation.
- `README.html` — browser-friendly version of this documentation.
