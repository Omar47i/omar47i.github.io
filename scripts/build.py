"""Generate the static homepage and shareable case studies. No dependencies."""
from html import escape, unescape
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://omar47i.github.io/'
TEMPLATE = (ROOT / 'scripts/portfolio.html').read_text()
ASSETS = {
    '@@PORTRAIT@@': 'assets/omar-portrait.png',
    '@@RUN_GAME@@': 'assets/game-runner-recreation.png',
    '@@TRIVIA_GAME@@': 'assets/game-quiz-recreation.png',
}
SLUGS = {
    'authoring': 'authoring',
    'curriculum': 'pathways',
    'feedback': 'feedback',
    'quality': 'quality',
    'games': 'games',
}


def render(html, prefix='', path='', title=None, description=None):
    for marker, asset in ASSETS.items():
        html = html.replace(marker, prefix + asset)
    if title:
        html = re.sub(r'<title>.*?</title>', f'<title>{escape(title)}</title>', html)
    if description:
        html = re.sub(r'<meta name="description" content="[^"]*">',
                      f'<meta name="description" content="{escape(description, quote=True)}">', html)
    title = re.search(r'<title>(.*?)</title>', html).group(1)
    description = re.search(r'<meta name="description" content="([^"]*)">', html).group(1)
    social = f'''<link rel="canonical" href="{SITE}{path}">
  <meta property="og:title" content="{escape(unescape(title), quote=True)}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:image" content="{SITE}assets/omar-portrait.png">'''
    return html.replace('@@SOCIAL@@', social).replace('@@PREFIX@@', prefix)


(ROOT / 'index.html').write_text(render(TEMPLATE))
header = TEMPLATE.split('<body id="top">', 1)[0] + '<body id="top">'
nav = re.search(r'  <header class="site-header">.*?</header>', TEMPLATE, re.S).group(0)
nav = re.sub(r'href="#(top|work|skills|about)"', r'href="../index.html#\1"', nav)
nav = nav.replace('href="assets/', 'href="../assets/')
footer = re.search(r'  <footer class="footer">.*?</footer>', TEMPLATE, re.S).group(0)
for case, slug in SLUGS.items():
    article = re.search(rf'<template id="case-{case}">\s*(.*?)\s*</template>', TEMPLATE, re.S).group(1)
    title = re.search(r'<h2[^>]*>(.*?)</h2>', article).group(1)
    description = re.search(r'<p class="case-lede">(.*?)</p>', article).group(1)
    article = article.replace(f'<h2 id="title-{case}">', f'<h1 id="title-{case}">', 1).replace('</h2>', '</h1>', 1)
    page = header + '\n  <a class="skip" href="#main">Skip to content</a>\n' + nav
    page += f'\n  <main id="main" class="case-page"><div class="case-navigation"><a class="case-back" href="../index.html#work">← All selected work</a></div>{article}</main>\n'
    page += footer + '\n</body>\n</html>\n'
    (ROOT / f'work/{slug}.html').write_text(render(page, '../', f'work/{slug}.html', f'{unescape(title)} — Omar Ibrahim', unescape(description)))

print('Built homepage and five case-study pages.')
