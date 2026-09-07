from pathlib import Path

from PIL import Image, ImageDraw, ImageOps


ROOT = Path(__file__).resolve().parents[1] / "src" / "assets" / "projects"
CANVAS_SIZE = (1800, 1080)
POSITIONS = {
    "bird-retirement": [(150, 178, 380, 760), (690, 82, 420, 860), (1270, 200, 380, 760)],
    "shehong-city": [(105, 92, 430, 860), (710, 205, 350, 700), (1265, 92, 430, 860)],
    "ronghua-city": [(155, 235, 350, 700), (670, 155, 390, 780), (1230, 72, 430, 860)],
}

PROJECTS = {
    "bird-retirement": ["01.webp", "02.webp", "03.webp"],
    "shehong-city": ["01.webp", "02.webp", "03.webp"],
    "ronghua-city": ["01.webp", "01.webp", "01.webp"],
}


def phone_screen(source: Image.Image, size: tuple[int, int], anchor_y: float) -> Image.Image:
    width, height = size
    fitted = ImageOps.fit(
        source.convert("RGB"),
        (width, height),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, anchor_y),
    )
    mask = Image.new("L", (width, height), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, width - 1, height - 1), radius=34, fill=255)
    fitted.putalpha(mask)
    return fitted


def build(slug: str, files: list[str]) -> None:
    background = "#E8EDE3" if slug == "shehong-city" else "#F3F0E7"
    canvas = Image.new("RGB", CANVAS_SIZE, background)
    draw = ImageDraw.Draw(canvas)

    for index, (filename, position) in enumerate(zip(files, POSITIONS[slug])):
        x, y, width, height = position
        frame_pad = 13 if index != 1 else 15
        radius = 48 if index != 1 else 54

        draw.rounded_rectangle(
            (x - frame_pad, y - frame_pad, x + width + frame_pad, y + height + frame_pad),
            radius=radius,
            fill="#FBFAF6",
            outline="#C7CEC2",
            width=3,
        )
        source = Image.open(ROOT / slug / filename)
        screen = phone_screen(source, (width, height), [0.05, 0.5, 0.95][index])
        canvas.paste(screen, (x, y), screen)

        speaker_width = 54 if index != 1 else 62
        speaker_y = y - frame_pad + 7
        draw.rounded_rectangle(
            (x + width // 2 - speaker_width // 2, speaker_y, x + width // 2 + speaker_width // 2, speaker_y + 5),
            radius=3,
            fill="#AEB7AA",
        )

    output = ROOT / f"{slug}-overview.webp"
    canvas.save(output, "WEBP", quality=92, method=6)
    print(output)


for project, images in PROJECTS.items():
    build(project, images)

qingshen = Image.open(ROOT / "qingshen" / "01.webp").convert("RGB")
qingshen_photo = qingshen.crop((34, 808, 1046, 1490))
qingshen_photo = ImageOps.fit(qingshen_photo, (1600, 1000), method=Image.Resampling.LANCZOS)
qingshen_photo.save(ROOT / "qingshen-reading-cover.webp", "WEBP", quality=92, method=6)
