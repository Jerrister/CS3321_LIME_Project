import re

def extract_names(text):
    # 去除不必要的数字和特殊字符，只保留字母和空格
    cleaned_text = re.sub(r'[\d\*\-,∗]', '', text)
    # 使用正则表达式匹配人名
    names = re.findall(r'[A-Z][a-z]+(?:\s[A-Z][a-z]+)+', cleaned_text)
    return names