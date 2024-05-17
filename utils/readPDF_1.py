from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer
import os
import re

def remove_n(text):
    return ' '.join(text.split('\n'))

def extract_title_and_author(pdf_path):
    page_layout = list(extract_pages(pdf_path))[0]
    # 存储元素及其y0坐标
    elements_with_y = []

    # page_width = page_layout.width
    # page_height = page_layout.height

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
            # width = element.width
            # height = element.height
            # if width > 0.7 * page_width and height < 0.3 * page_height:
            elements_with_y.append((text, (y0+y1)))

    # 按y0坐标降序排序，以模拟从上到下的阅读顺序
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

    # # 选择前两个元素作为标题和作者
    # if len(elements_with_y) > 0:
    #     title = elements_with_y[0][0]
    #     author = elements_with_y[1][0] if len(elements_with_y) > 1 else ""
    #     result = (title, author)
    # else:
    #     result = ('', '')

    # # 假设最有可能的标题和作者出现在第一页
    # return result

# 使用示例
folder_path = 'E:\\XLANCE\\TSE\\basic papers'  # 你的PDF文件路径

for file in os.listdir(folder_path):
    pdf_path = os.path.join(folder_path, file)
    title, author = extract_title_and_author(pdf_path)
    print("\nFile:", file)
    print("Title:", title)
    print("Author:", author)
