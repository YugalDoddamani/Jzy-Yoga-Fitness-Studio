# J'zy Yoga & Fitness Studio

A mobile-first landing page concept for J'zy Yoga & Fitness Studio in Caranzalem, Panaji, Goa. Built with plain HTML, CSS and JavaScript for lightweight static hosting (including GitHub Pages and Cloudflare Pages).

## Design direction

The site has its own visual identity rather than borrowing the look of a conventional Pilates or studio template:

- Soft neumorphic surfaces using raised and inset shadows.
- Misty lilac, pearl, blush and pale sage tones.
- A quiet mandala-inspired brand mark and circular details for a gentle spiritual note.
- Clear, separate enquiry paths for women's classes and children's classes.
- Friendly, rounded typography and generous spacing, designed mobile-first.
- Photo placeholders instead of stock images, ready for Jasmine's approved photography.
- WhatsApp enquiry links, mobile navigation, and reduced-motion support.

## Photo placeholders

There are four main photo areas in \`index.html\`:

1. Hero: \`.hero-photo\` — ideally a wide portrait of Jasmine, the studio, or a real class moment.
2. Women's class: \`.placeholder-women\`.
3. Children's class: \`.placeholder-kids\`.
4. Instructor: \`.jasmine-visual\` — ideally a natural portrait of Jasmine.

When the photos are ready, keep the outer container and replace its placeholder artwork with an image, for example:

\`\`\`html
<div class="image-placeholder placeholder-women">
  <img class="placeholder-image" src="assets/womens-class.jpg" alt="Women taking part in a yoga class">
</div>
\`\`\`

Use the same \`placeholder-image\` class in the hero, kids' and instructor containers. Remove the placeholder icon/artwork and its explanatory captions for that container when inserting the real image. Put local images in an \`assets/\` folder and use descriptive alt text. Choose images approved by Jasmine, with particular care for children's photographs and permission to publish them.

## Preview locally

Open \`index.html\` in a browser or run a local static server from this folder. No framework or build step is required.

## Before sharing with the studio

- [ ] Replace \`REPLACE_WITH_JASMINE_NUMBER\` in \`script.js\` with Jasmine's full WhatsApp number in international digits-only format (India: 91 + mobile number).
- [ ] Confirm the exact studio address and the correct Google Maps pin. The current Maps link is a search, not a verified place pin.
- [ ] Confirm the class details, age groups, timings and descriptions with Jasmine. The current copy intentionally avoids promising unconfirmed schedules or outcomes.
- [ ] Replace each image placeholder with approved photos when available.
- [ ] Test the links, mobile menu, WhatsApp actions and layout on a real phone.
- [ ] Confirm any photo permissions and image licensing before launch.

