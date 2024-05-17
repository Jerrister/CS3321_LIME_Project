from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer

from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer

import os

def remove_n(text):
    return ' '.join(text.split('\n'))

def extract_title_and_author(pdf_path):
    for page_layout in extract_pages(pdf_path):
        text_blocks = []

        for element in page_layout:
            if isinstance(element, LTTextContainer):
                text = element.get_text().strip()
                text = remove_n(text)
                text_blocks.append(text)
        
        return text_blocks

# 使用示例
folder_path = 'E:\\XLANCE\\TSE\\basic papers'  # 你的PDF文件路径

for file in os.listdir(folder_path):
    pdf_path = os.path.join(folder_path, file)
    text_blocks = extract_title_and_author(pdf_path)
    print("File:", file)
    print("Blocks:", text_blocks[:5])
