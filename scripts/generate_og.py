"""Create the social preview card from the site's visual language."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630
image = Image.new("RGB", (WIDTH, HEIGHT), "#eaf1ed")
draw = ImageDraw.Draw(image)

for x in range(0, WIDTH, 38):
    draw.line((x, 0, x, HEIGHT), fill="#dce9df", width=1)
for y in range(0, HEIGHT, 38):
    draw.line((0, y, WIDTH, y), fill="#dce9df", width=1)

draw.rounded_rectangle((52, 48, 1148, 582), radius=28, fill="#f8faf7", outline="#cbded1", width=2)
draw.rounded_rectangle((82, 78, 160, 156), radius=16, fill="#193c35")

regular = "C:/Windows/Fonts/arial.ttf"
bold = "C:/Windows/Fonts/arialbd.ttf"
font_brand = ImageFont.truetype(bold, 42)
font_small = ImageFont.truetype(bold, 22)
font_title = ImageFont.truetype(bold, 66)
font_body = ImageFont.truetype(regular, 28)
draw.text((94, 92), "JG", font=font_brand, fill="#f4faf5")
draw.ellipse((141, 132, 150, 141), fill="#65d6a8")
draw.text((184, 106), "JORGE GUIJARRO FUENTES", font=font_small, fill="#2d614f")

draw.text((87, 224), "Full Stack Developer", font=font_title, fill="#17372f")
draw.text((90, 316), "Foco en backend", font=font_title, fill="#18846a")
draw.text((90, 423), "APIs  ·  Integraciones  ·  Despliegue", font=font_body, fill="#5a7769")

draw.rounded_rectangle((860, 448, 1093, 520), radius=12, fill="#193c35")
draw.text((889, 470), "JAVA  /  VUE  /  PHP", font=ImageFont.truetype(bold, 18), fill="#d5f1dd")

target = Path(__file__).resolve().parents[1] / "frontend" / "public" / "og-card.png"
image.save(target, optimize=True)
print(target)
