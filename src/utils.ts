import { parseHTML } from "linkedom";

export const WTW = "whiteboardtheweb";

const COLOR_VARIABLES = ["orange", "green", "pink", "purple"];

export function toRandomColorVariable() {
  const randomIdx = Math.floor(Math.random() * COLOR_VARIABLES.length);
  return COLOR_VARIABLES[randomIdx];
}

export function getEditionInfo(
  file: string
): { base: string; num: number } | undefined {
  // matches file basename and first digit after the last "/" in a file path
  // ex. "/example/44/32-eslint-prettier.md" will match "32-eslint-prettier" and "32"
  const match = file.match(/((\d+)(\w|-)+)(\w|-|\.)+$/);
  if (!match) return undefined;

  const [, base, rawNum] = match;
  const num = Number.parseInt(rawNum);
  if (Number.isNaN(num)) return undefined;

  return { base, num };
}

export function stripHtmlHeadings(rawHtml: string): string {
  const { document } = parseHTML(rawHtml);
  for (const h of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
    document.removeChild(h);
  }
  return document.toString();
}

export function youtubeShortToEmbed(shortUrl: string): string {
  return (
    shortUrl
      .replace("/shorts/", "/embed/")
      .replace("youtube.com", "youtube-nocookie.com") + "?autoplay=1"
  );
}

export function youtubeShortToThumbnail(shortUrl: string): string | undefined {
  const idMatch = shortUrl.match(/\/((\w|-)+)$/);
  if (!idMatch) return undefined;

  const [, id] = idMatch;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
