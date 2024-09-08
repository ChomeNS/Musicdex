let title: string;
let originalArtist: string;
let artist: string;
let imageUrl: string;

export function setTitle(name: string) {
  title = name;
}

export function setName(name: string, originalName: string) {
  artist = name;
  originalArtist = originalName;
}

export function setImageUrl(name: string) {
  imageUrl = name;
}

export async function stopRPC() {
  title = "";
  originalArtist = "";
  artist = "";
  imageUrl = "";

  await fetchSafely("http://127.0.0.1:3001/stop");
}

export async function update() {
  /* const response = */ await fetchSafely(
    `http://127.0.0.1:3001/?title=${title}&originalArtist=${originalArtist}&artist=${artist}&imageUrl=${imageUrl}`,
  );

  // if (response === 1) setTimeout(update, 5 * 1000)
}

async function fetchSafely(url: string) {
  try {
    await fetch(url);
  } catch (e: any) {
    console.error(`[Discord] Error: ${e.stack ?? e.message}`);

    return 1;
  }
}
