import re

def extract_names(text):
    # 去除不必要的数字和特殊字符，只保留字母和空格
    cleaned_text = re.sub(r'[\d\*\-,∗]', '', text)
    # 使用正则表达式匹配人名
    names = re.findall(r'[A-Z][a-z]+(?:\s[A-Z][a-z]+)+', cleaned_text)
    return names

def extract_names_2(text):
    # 使用正则表达式提取人名
    name_pattern = re.compile(r'[\u4e00-\u9fa5]+[\u4e00-\u9fa5]*|[A-Z][a-z]*\s+[A-Z][a-z]*|[A-Z][a-z]*')
    names = name_pattern.findall(text)
    
    # 清理和拆分组合的中文名
    cleaned_names = []
    for name in names:
        if re.match(r'[\u4e00-\u9fa5]+[\u4e00-\u9fa5]*', name):
            cleaned_names.extend(list(name))
        else:
            cleaned_names.append(name)
    
    return cleaned_names

if __name__ == "__main__":
    print(extract_names_2("Jiaxin Li Qixi Zheng John Kim Lina"))
