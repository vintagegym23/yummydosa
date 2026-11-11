import React from 'react';
import { PageHero } from '../components/layout/PageHero';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { MENU_PHOTOS, MenuPhotoKey, menuPhotoSrc } from '../data/menuPhotos';
import { DEMO_IMAGES } from '../data/demoImages';

/** Licence names -> their deed pages, for the CC licences used by the menu photos. */
const licenseUrl = (license: string) => {
  const m = license.match(/^CC (BY(?:-SA)?) ([\d.]+)$/);
  if (m) return `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/`;
  if (license === 'CC0') return 'https://creativecommons.org/publicdomain/zero/1.0/';
  return undefined;
};

export default function PhotoCreditsPage() {
  useDocumentMeta();

  const menuPhotos = (Object.entries(MENU_PHOTOS) as [MenuPhotoKey, (typeof MENU_PHOTOS)[MenuPhotoKey]][])
    .filter(([, p]) => p.license !== 'Own photo')
    .sort(([, a], [, b]) => a.title.localeCompare(b.title));

  return (
    <>
      <PageHero eyebrow="CREDITS" title="Photo Credits" align="center" height="compact" />
      <Breadcrumbs items={[{ label: 'Photo Credits' }]} />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="space-y-2 text-sm text-stone-600 max-w-3xl">
          <p>
            The dish photos on our menu are illustrative. They are freely licensed photographs from{' '}
            <a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer" className="text-[#D9531E] font-semibold hover:underline">
              Wikimedia Commons
            </a>
            , shown resized. Each is credited below with its author and licence. Our dishes are freshly prepared
            in our own kitchen and may look different when served.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-stone-900 mb-4">Menu photos</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {menuPhotos.map(([key, photo]) => {
              const deed = licenseUrl(photo.license);
              return (
                <li key={key} className="flex items-center gap-3 bg-white rounded-xl border border-stone-100 p-2.5">
                  <img
                    src={menuPhotoSrc(key)}
                    alt=""
                    loading="lazy"
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 text-xs leading-relaxed">
                    <a
                      href={photo.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-stone-800 hover:text-[#D9531E] break-words"
                    >
                      “{photo.title}”
                    </a>
                    <p className="text-stone-500">
                      by {photo.author} ·{' '}
                      {deed ? (
                        <a href={deed} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {photo.license}
                        </a>
                      ) : (
                        photo.license
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-stone-900 mb-2">Other photos</h2>
          <p className="text-sm text-stone-600">
            Venue, event and promotional photos are from{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-[#D9531E] font-semibold hover:underline">
              Unsplash
            </a>{' '}
            ({Object.keys(DEMO_IMAGES).length} images), used under the Unsplash License.
          </p>
        </div>
      </section>
    </>
  );
}
