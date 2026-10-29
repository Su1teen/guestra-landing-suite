"""Генерирует превью для соцсетей (public/og/*.png) и облегчённые иконки из public/logo.png.

Запуск: python scripts/og.py  (нужен Pillow). Заголовки берутся из списка PAGES ниже,
он повторяет src/routes.tsx. Результат коммитится в репозиторий.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OG = PUBLIC / "og"
FONTS = Path("C:/Windows/Fonts")

INK = (13, 19, 33)
MUTED = (103, 112, 131)
PRIMARY = (25, 94, 255)
GRID = (233, 236, 242)

PAGES = {
    "home": ("PMS · CRM · AI-администратор", "Гостиничная система, где AI доводит обращение до оплаченной брони"),
    "ai": ("AI-администратор", "Отвечает гостям сразу и доводит разговор до оплаченной брони"),
    "crm": ("CRM и входящие", "Каждое обращение доходит до брони или закрывается с причиной"),
    "pms": ("PMS", "PMS, с которой работает весь отель"),
    "revenue-management": ("Управление доходами", "Цена следует за спросом, а решение остаётся за отелем"),
    "operations": ("Операции", "Службы знают, что делать. Руководитель видит, что не сделано."),
    "owner": ("Кабинет собственника", "Выручка, решения команды и состояние отеля в одном окне"),
    "platform": ("Как работает Guestra", "Одна бронь проходит через всю систему"),
    "integrations": ("Интеграции", "Каналы, оплаты и данные, с которыми работает Guestra"),
    "security": ("Безопасность", "Каждый видит своё, каждое изменение на виду"),
    "implementation": ("Внедрение", "Переход на Guestra без остановки работы отеля"),
    "pricing": ("Цены", "Стоимость считаем под ваш отель"),
    "updates": ("Что нового", "Как развивается Guestra"),
    "privacy": ("Документы", "Политика конфиденциальности"),
}


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, width: int) -> list[str]:
    lines, line = [], ""
    for word in text.split():
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=fnt) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def render(slug: str, eyebrow: str, title: str, logo: Image.Image) -> None:
    img = Image.new("RGB", (1200, 630), "white")
    d = ImageDraw.Draw(img)
    for x in range(0, 1200, 48):
        d.line([(x, 0), (x, 630)], fill=GRID)
    for y in range(0, 630, 48):
        d.line([(0, y), (1200, y)], fill=GRID)
    # Мягкая подложка под текстом.
    d.rounded_rectangle([56, 56, 1144, 574], radius=36, fill="white", outline=GRID, width=2)

    img.paste(logo.resize((56, 56), Image.LANCZOS), (104, 100), logo.resize((56, 56), Image.LANCZOS))
    d.text((176, 104), "Guestra", font=font("segoeuib.ttf", 40), fill=INK)

    d.text((104, 214), eyebrow.upper(), font=font("segoeuib.ttf", 24), fill=PRIMARY)
    title_font = font("segoeuib.ttf", 60 if len(title) < 60 else 54)
    y = 258
    for line in wrap(d, title, title_font, 960)[:3]:
        d.text((104, y), line, font=title_font, fill=INK)
        y += 76
    d.text((104, 520), "guestra.org", font=font("segoeui.ttf", 26), fill=MUTED)
    img.save(OG / f"{slug}.png", optimize=True)


def main() -> None:
    OG.mkdir(exist_ok=True)
    logo = Image.open(PUBLIC / "logo.png").convert("RGBA")
    for slug, (eyebrow, title) in PAGES.items():
        render(slug, eyebrow, title, logo)
    for size, name in [(64, "logo-64.png"), (180, "apple-touch-icon.png"), (32, "favicon-32.png")]:
        logo.resize((size, size), Image.LANCZOS).save(PUBLIC / name, optimize=True)


if __name__ == "__main__":
    main()
