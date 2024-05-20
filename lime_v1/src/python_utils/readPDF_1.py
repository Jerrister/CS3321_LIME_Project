from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer
import os
import re
import argparse
import json
import sys
import io
# import tempfile
TMP_DIR = r"lime_v1\tmp"

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def remove_n(text):
    return ' '.join(text.split('\n'))


def extract_title_and_author_from_flask(file):
    file_path = os.path.join(TMP_DIR, str(file.filename).replace('/', '\\').split('\\')[-1] )
    
    file.save(file_path)
    page_layout = list(extract_pages(file_path))[0]

    # page_layout = list(extract_pages(pdf_flask))[0]
    elements_with_y = []

    for element in page_layout:
        if isinstance(element, LTTextContainer):
            text = element.get_text().strip()
            text = remove_n(text)
            if not text:
                continue
            if not text[0].isalpha():
                continue
            y0 = element.y0  # 获取元素的底部坐标
            y1 = element.y1
            elements_with_y.append((text, (y0 + y1)))

    elements_with_y.sort(key=lambda x: x[1], reverse=True)

    result = ['', '']
    flag = 0
    for x in range(min(len(elements_with_y), 10)):
        if flag > 1:
            break
        text = elements_with_y[x][0]
        l = len(text)
        if flag == 0 and l < 20:
            continue
        if flag == 1 and l < 5:
            continue
        if "IEEE" in text:
            continue
        spaces_count = len(re.findall(r' ', text))
        if spaces_count / l > 0.4:
            continue
        digits_count = len(re.findall(r'\d', text))
        if digits_count / l > 0.4:
            continue
        result[flag] = text
        flag += 1
    return result[0], result[1] , file_path


def extract_title_and_author(pdf_path):
    page_layout = list(extract_pages(pdf_path))[0]
    elements_with_y = []

    for element in page_layout:
        if isinstance(element, LTTextContainer):
            text = element.get_text().strip()
            text = remove_n(text)
            if not text:
                continue
            if not text[0].isalpha():
                continue
            y0 = element.y0  # 获取元素的底部坐标
            y1 = element.y1
            elements_with_y.append((text, (y0 + y1)))

    elements_with_y.sort(key=lambda x: x[1], reverse=True)

    result = ['', '']
    flag = 0
    for x in range(min(len(elements_with_y), 10)):
        if flag > 1:
            break
        text = elements_with_y[x][0]
        l = len(text)
        if flag == 0 and l < 20:
            continue
        if flag == 1 and l < 5:
            continue
        if "IEEE" in text:
            continue
        spaces_count = len(re.findall(r' ', text))
        if spaces_count / l > 0.4:
            continue
        digits_count = len(re.findall(r'\d', text))
        if digits_count / l > 0.4:
            continue
        result[flag] = text
        flag += 1

    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="single")
    parser.add_argument("--folder", type=str, default="")
    args = parser.parse_args()
    result = []

    folder_path = args.folder

    if folder_path != "":
        dict_f = {}

        for file in os.listdir(folder_path):
            pdf_path = os.path.join(folder_path, file)

            title, author = extract_title_and_author(pdf_path)
            dict_f[pdf_path] = {
                "title": title,
                "author": author,
                "file": file
            }

        result.append(dict_f)

    print(json.dumps(result))
