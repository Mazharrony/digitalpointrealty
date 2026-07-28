#!/usr/bin/env python3
"""Light-background pipeline: polish only, no darkening.

The dark grade is gone. On white, these assets want their natural brightness
back -- the job here is a wide pannable sky, a cloud mass to fly through, and
clean bright cutouts.
"""
import os, random
from PIL import Image, ImageFilter, ImageChops, ImageDraw, ImageEnhance

SRC = "/Users/nuru/Projects/digitalpointrealty/images"
OUT = "/Users/nuru/Projects/digitalpointrealty/site/public/assets"
os.makedirs(OUT, exist_ok=True)
random.seed(7)


def tint(img, mult, lift=(0, 0, 0)):
    a = img.getchannel("A") if img.mode == "RGBA" else None
    rgb = img.convert("RGB")
    ch = []
    for i, c in enumerate(rgb.split()):
        ch.append(c.point(lambda v, m=mult[i], l=lift[i]: max(0, min(255, int(v * m + l)))))
    out = Image.merge("RGB", ch)
    if a is not None:
        out = out.convert("RGBA")
        out.putalpha(a)
    return out


# ------------------------------------------------------------ 1. SKY (wide)
# Crop the meadow, then EXTEND UPWARD before tiling. The source sky is only
# 828px tall; a full-viewport background layer is ~2.1 aspect, so without the
# extension object-cover upscales it ~2.5x and the sky goes soft.
sky = Image.open(f"{SRC}/blue sky bg.png").convert("RGB")
sky = sky.crop((0, 0, sky.width, 828))
sky = ImageEnhance.Brightness(sky).enhance(1.06)
sky = ImageEnhance.Color(sky).enhance(0.88)      # slightly less electric blue
sky = tint(sky, (1.0, 1.0, 1.0), lift=(6, 6, 4))  # lift shadows, airier

W, H = sky.size

# Extend by vertically STRETCHING the real top band of the sky rather than
# synthesising a gradient. A synthetic fill leaves a hard horizontal line
# because it never matches the source tone; a stretch shares the exact pixel
# row at the join, so there is nothing to see.
EXT = 760
BAND = 130
ext = sky.crop((0, 0, W, BAND)).resize((W, EXT), Image.LANCZOS)

# Deepen slightly toward the top — real zenith sky is denser than horizon.
grad = Image.new("L", (1, EXT))
for y in range(EXT):
    t = y / EXT                     # 0 at very top, 1 at the join
    grad.putpixel((0, y), int(255 * (0.88 + 0.12 * t)))
ext = ImageChops.multiply(ext, grad.resize((W, EXT)).convert("RGB"))

tall = Image.new("RGB", (W, EXT + H))
tall.paste(ext, (0, 0))
tall.paste(sky, (0, EXT))

TH = EXT + H
wide = Image.new("RGB", (W * 2, TH))
wide.paste(tall, (0, 0))
wide.paste(tall.transpose(Image.FLIP_LEFT_RIGHT), (W, 0))
wide = wide.resize((3400, int(TH * 3400 / (W * 2))), Image.LANCZOS)
wide.save(f"{OUT}/sky-light.webp", quality=90, method=6)
print("sky-light.webp", wide.size, "aspect %.2f" % (wide.width / wide.height))


# ------------------------------------------------ 2. CLOUD MASS (fly-through)
# One big soft cloud bank that fills frame and gets scaled past the camera.
CW, CH = 2400, 1500
mass = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))

def cloud(path, w, flip=False, bright=1.0):
    c = Image.open(path).convert("RGBA")
    if flip:
        c = c.transpose(Image.FLIP_LEFT_RIGHT)
    c = c.resize((w, int(c.height * w / c.width)), Image.LANCZOS)
    if bright != 1.0:
        c = ImageEnhance.Brightness(c).enhance(bright)
    return c

mass.alpha_composite(cloud(f"{SRC}/clouds 1.png", 1900, bright=1.04), (-160, 120))
mass.alpha_composite(cloud(f"{SRC}/clouds 2.png", 1700, flip=True, bright=1.02), (760, 420))
mass.alpha_composite(cloud(f"{SRC}/clouds 2.png", 1400), (140, 640))
mass.save(f"{OUT}/cloud-mass.webp", quality=86, method=6)
print("cloud-mass.webp", mass.size)


# ----------------------------------------- 3. CLOUD STRIP (right-to-left band)
# Seamless wide strip: transparent margins mean a -50% translate wraps cleanly.
SW, SH = 3600, 1000
strip = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
strip.alpha_composite(cloud(f"{SRC}/clouds 1.png", 1500), (120, 60))
strip.alpha_composite(cloud(f"{SRC}/clouds 2.png", 1250, flip=True), (1450, 240))
strip.alpha_composite(cloud(f"{SRC}/clouds 2.png", 1000), (2500, 80))

FEATHER = 420
a = strip.getchannel("A")
mask = Image.new("L", (SW, 1), 255)
for x in range(FEATHER):
    v = int(255 * (x / FEATHER) ** 1.4)
    mask.putpixel((x, 0), v)
    mask.putpixel((SW - 1 - x, 0), v)
strip.putalpha(ImageChops.multiply(a, mask.resize((SW, SH))))
strip.save(f"{OUT}/cloud-strip.webp", quality=86, method=6)
print("cloud-strip.webp", strip.size)


# ------------------------------------------------------------- 4. HOUSE
house = Image.open(f"{SRC}/house.png").convert("RGBA")
house = ImageEnhance.Contrast(house).enhance(1.04)
house.save(f"{OUT}/house-light.webp", quality=92, method=6)
print("house-light.webp", house.size)


# ------------------------------------------------------------- 5. WORKERS
# Natural colour. A soft white halo under each figure lifts them off the sky
# without looking like a cutout sticker.
WORKERS = [
    ("cleaner full body.png", "model-cleaner.webp"),
    ("electrician full body.png", "model-electrician.webp"),
    ("plumber full body.png", "model-plumber.webp"),
]
for src_name, out_name in WORKERS:
    w = Image.open(f"{SRC}/{src_name}").convert("RGBA")
    w = ImageEnhance.Contrast(w).enhance(1.05)
    w = ImageEnhance.Color(w).enhance(1.02)
    glow = w.getchannel("A").filter(ImageFilter.GaussianBlur(14)).point(lambda v: int(v * 0.34))
    halo = Image.new("RGBA", w.size, (255, 255, 255, 0))
    halo.putalpha(glow)
    w = Image.alpha_composite(halo, w)
    w.save(f"{OUT}/{out_name}", quality=92, method=6)
    print(out_name, w.size)


# ---------------------------------------------------------- 6. LOGO (on white)
# The original navy wordmark is already correct on a light background.
logo = Image.open(f"{SRC}/logo.png").convert("RGBA")
logo.save(f"{OUT}/logo-dark.webp", quality=92, method=6)
logo.resize((logo.width // 3, logo.height // 3), Image.LANCZOS).save(
    f"{OUT}/logo-mark-dark.webp", quality=92, method=6)
print("logo-dark.webp", logo.size)

print("\nLight assets written to", OUT)
