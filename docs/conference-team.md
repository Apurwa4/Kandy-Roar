# Conference team

The homepage section and navigation link use `#conference-team`. The EB and OC tabs support mouse, touch, arrow keys, Home, and End. Names and positions live in `src/components/ConferenceTeam.tsx`.

The section includes 16 EB members and 21 OC members. Its 34 available portraits are transparent PNGs in `public/images/team/`. Binni, Nikila, and Thushanth intentionally have placeholders. To add their photos, save transparent portraits in that folder and add an `image` path to their existing member entries.

Lahiru Dinusha appears first as EB President. Kavithanjali's portrait was extracted from the supplied OC flyer. Names and roles otherwise follow the supplied flyers.

## Selected EB sources

These assignments were supplied by the user; duplicate shots were omitted.

| Member | Source filename |
| --- | --- |
| Fathima | IMG_9184.JPG |
| Ihara | IMG_9194.JPG |
| Pavithri | IMG_9207.JPG |
| Shahnaas | IMG_9215.JPG |
| Harindu | IMG_9198.JPG |
| Shahla | IMG_9223.JPG |
| Inuri | IMG_9234.JPG |
| Devmi | IMG_9258.JPG |
| Jayani | IMG_9267.JPG |
| Sayuni | IMG_9280.JPG |
| Zahra | IMG_9399.JPG |
| Yethmini | IMG_9406.JPG |

## Portrait editing

Portraits were processed using the built-in imagegen tool with `transparent_background: true`, one edit per portrait. Original downloads and intermediate files remain in the ignored `.team-work/` directory.

The prompt set asked for background extraction, head-to-waist framing (retaining tighter original framing where necessary), full hair/head coverings and shoulders, and preservation of the person's face, skin texture, expression, clothing and pose without retouching or redesign. Backgrounds and unrelated people/objects were removed with genuine alpha transparency. The Kavithanjali prompt specifically selected the first OCM portrait in the Marketing row of the OC flyer, above her printed name, excluding the frame and surrounding text. Lahiru's prompt retained both crossed arms and his blue-and-white jersey.
