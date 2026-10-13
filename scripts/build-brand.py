#!/usr/bin/env python3
"""Builds Neptune's logo files in brand/ from the mark geometry below and the Newsreader font.

The wordmark is outlined (text turned into paths) so the SVGs render the same everywhere.

    npm install --prefix /tmp/np-fonts @fontsource/newsreader@5
    pip install fonttools brotli pillow
    python3 scripts/build-brand.py /tmp/np-fonts/node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff2

Colours come from tokens.json, so a token change flows into the logo on the next build.
"""
import json
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "brand"

tokens = {t["name"]: t["value"] for t in json.loads((ROOT / "tokens.json").read_text())["color"]["tokens"]}
INK_L, INK_D = tokens["ink"]["light"], tokens["ink"]["dark"]
BLUE_L, BLUE_D = tokens["neptune"]["light"], tokens["neptune"]["dark"]
ON_L, ON_D = tokens["on-neptune"]["light"], tokens["on-neptune"]["dark"]
PAPER_L, PAPER_D = tokens["paper"]["light"], tokens["paper"]["dark"]

# The mark: Neptune's trident, the planet's astronomical sign, drawn on a 24-unit grid with
# 2-unit square strokes inside a square tile. Two prongs and a cup, the stem through the middle,
# a crossbar low on the stem. Nothing rounds; every edge sits on the grid.
TRIDENT = "M6 4h2v6h8V4h2v8h-5v3h3v2h-3v3h-2v-3H8v-2h3v-3H6z M11 4h2v6h-2z"


def mark(tile, ink, size=24, title="Neptune"):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="{size}" height="{size}" role="img" aria-label="{title}">'
        f"<title>{title}</title>"
        + (f'<rect width="24" height="24" fill="{tile}"/>' if tile else "")
        + f'<path fill="{ink}" d="{TRIDENT}"/></svg>\n'
    )


def wordmark_path(font_file, text="Neptune", size=100.0, tracking=-0.01):
    font = TTFont(font_file)
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
    upm = font["head"].unitsPerEm
    scale = size / upm
    x, parts = 0.0, []
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        # flip y (font units go up, SVG goes down) and place on the baseline at y = 0
        gs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 0)))
        parts.append(pen.getCommands())
        x += hmtx[name][0] * scale + tracking * size
    ascent = font["OS/2"].sCapHeight * scale
    return " ".join(parts), x - tracking * size, ascent


def lockup(font_file, tile, glyph, word):
    # Mark at cap height x 1.5, gap of half a tile, wordmark baseline aligned to the tile's foot.
    d, width, cap = wordmark_path(font_file)
    tile_px = round(cap * 1.5)
    gap = tile_px / 2
    s = tile_px / 24
    h = tile_px
    w = tile_px + gap + width
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h}" role="img" aria-label="Neptune">'
        f"<title>Neptune</title>"
        f'<g transform="scale({s:.4f})"><rect width="24" height="24" fill="{tile}"/><path fill="{glyph}" d="{TRIDENT}"/></g>'
        f'<path fill="{word}" transform="translate({tile_px + gap:.1f} {h - (h - cap) / 2:.1f})" d="{d}"/></svg>\n'
    )


def main(font_file):
    OUT.mkdir(exist_ok=True)
    files = {
        "neptune-mark.svg": mark(BLUE_L, ON_L),
        "neptune-mark-deep.svg": mark(BLUE_D, ON_D),
        "neptune-mark-ink.svg": mark(None, INK_L),
        "neptune-lockup.svg": lockup(font_file, BLUE_L, ON_L, INK_L),
        "neptune-lockup-deep.svg": lockup(font_file, BLUE_D, ON_D, INK_D),
        # The favicon follows the system theme on its own.
        "favicon.svg": (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'
            f"<style>rect{{fill:{BLUE_L}}}path{{fill:{ON_L}}}"
            f"@media (prefers-color-scheme: dark){{rect{{fill:{BLUE_D}}}path{{fill:{ON_D}}}}}</style>"
            f'<rect width="24" height="24"/><path d="{TRIDENT}"/></svg>\n'
        ),
    }
    for name, svg in files.items():
        (OUT / name).write_text(svg)

    # Raster icons from the mark, drawn on its grid at whole pixels so edges stay crisp.
    from PIL import Image, ImageDraw

    def raster(px):
        k = px / 24
        img = Image.new("RGBA", (px, px), BLUE_L)
        d = ImageDraw.Draw(img)
        for x0, y0, x1, y1 in [(6, 4, 8, 12), (16, 4, 18, 12), (6, 10, 18, 12), (11, 4, 13, 20), (8, 15, 16, 17)]:
            d.rectangle([round(x0 * k), round(y0 * k), round(x1 * k) - 1, round(y1 * k) - 1], fill=ON_L)
        return img

    raster(180).save(OUT / "apple-touch-icon.png")
    raster(512).save(OUT / "icon-512.png")
    raster(192).save(OUT / "icon-192.png")
    raster(48).save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Wrote", ", ".join(sorted(p.name for p in OUT.iterdir())))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])


def logo_preview():
    """components/Logo/preview.html with the SVGs inline, so it renders without the brand/ folder."""
    read = lambda n: (OUT / n).read_text().strip()
    sizes = "".join(
        f'<figure><div style="width:{px}px;height:{px}px">{read("neptune-mark.svg").replace(" width=\"24\" height=\"24\"", f" width=\"{px}\" height=\"{px}\"")}</div><figcaption>{px}</figcaption></figure>'
        for px in (16, 24, 32, 48, 96)
    )
    html = f"""<!-- @dsCard group="Brand" height=520 subtitle="Lockup on Paper and Deep, mark sizes, single-ink" -->
<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="../../tokens.css"><link rel="stylesheet" href="../bundle.css"><title>Logo</title>
<style>
body{{margin:0;padding:24px}}
.row{{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:var(--space-6)}}
.plate{{padding:var(--space-12) var(--space-8);border:var(--stroke-hairline) solid var(--line-strong);display:grid;place-items:center}}
.plate svg{{height:48px;width:auto}}
.plate--paper{{background:{PAPER_L}}}.plate--deep{{background:{PAPER_D}}}
.sizes{{display:flex;align-items:flex-end;gap:var(--space-8);margin-top:var(--space-8)}}
.sizes figure{{flex:none;margin:0;display:flex;flex-direction:column;align-items:center;gap:var(--space-2)}}
.sizes svg{{display:block;width:100%;height:100%}}
figcaption,.cap{{font-family:var(--font-mono);font-size:11px;line-height:16px;letter-spacing:.04em;color:var(--ink-muted)}}
.ink{{margin-left:auto}}.ink svg{{width:48px!important;height:48px!important}}
</style></head>
<body class="np-root">
<div class="row">
  <div><div class="plate plate--paper">{read("neptune-lockup.svg")}</div><p class="cap">Paper · neptune-lockup.svg</p></div>
  <div><div class="plate plate--deep">{read("neptune-lockup-deep.svg")}</div><p class="cap">Deep · neptune-lockup-deep.svg</p></div>
</div>
<div class="sizes">{sizes}<figure class="ink">{read("neptune-mark-ink.svg")}<figcaption>Single ink</figcaption></figure></div>
</body>
</html>
"""
    (ROOT / "components" / "Logo").mkdir(exist_ok=True)
    (ROOT / "components" / "Logo" / "preview.html").write_text(html)


if __name__ == "__main__" and len(sys.argv) == 2:
    logo_preview()
