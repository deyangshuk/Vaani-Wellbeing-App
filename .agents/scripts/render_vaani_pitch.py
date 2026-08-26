import fitz
from pathlib import Path

pdf = Path('attached_assets/Shark_Tank-1_1787714200450.pdf')
out = Path('.agents/outputs/vaani_pitch_pages')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
print({'pages': doc.page_count, 'metadata': doc.metadata})
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    path = out / f'page-{index+1:02d}.png'
    pix.save(path)
    text = ' '.join(span['text'] for block in page.get_text('dict').get('blocks', []) if block.get('type') == 0 for line in block.get('lines', []) for span in line.get('spans', []))
    print(f'PAGE {index+1} IMAGES {len(page.get_images(full=True))}')
    print(text[:1200])
