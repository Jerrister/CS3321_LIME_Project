import random
from http import HTTPStatus
from dashscope import Generation  # 建议dashscope SDK 的版本 >= 1.14.0

import dashscope
# 换用自己通议千问的key
dashscope.api_key="sk-a542efb1fe274360b0d1a6115aca4e26"

def call_with_messages(data_list, question):

    prompt = '''我文献管理系统的数据如下:
    ----------------------------------------
    '''  \
    +  str(data_list) + \
    '''

    请你进行分析之后，回答我的问题:
    
    ''' + question

    messages = [{'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': prompt}]
    response = Generation.call(model="qwen-long",
                               messages=messages,
                               # 设置随机数种子seed，如果没有设置，则随机数种子默认为1234
                               seed=random.randint(1, 10000),
                               # 将输出设置为"message"格式
                               result_format='message')
    if response.status_code == HTTPStatus.OK:

        return response["output"]["choices"][0]["message"]["content"]
        # print(response)
    else:
        return  ('Request id: %s, Status code: %s, error code: %s, error message: %s' % (
            response.request_id, response.status_code,
            response.code, response.message
        ))


if __name__ == '__main__':
    data = '''
        0
        : 
        {title: 'ASU', year: 29213, path: 'd', source: 'SJTU'}
        1
        : 
        {title: 'DBS Lecture 41', year: 2025, path: '313333331', source: 'FDU'}
        2
        : 
        {title: 'DBS Lecture 31', year: 2024, path: '313', source: 'SJTU'}
        3
        : 
        {title: 'DBS Lecture 7', year: 2024, path: undefined, source: 'SJTU'}
        4
        : 
        {title: 'Exploring Time-Frequency Domain Target Speaker Extraction For Causal and Non-Causal Processing', year: 2024, path: undefined, source: 'IEEE'}
        5
        : 
        {title: 'Generation-Based Targe', year: 20313, path: undefined, source: 'IEEE'}
        6
        : 
        {title: 'Improving Target Sound Extraction with Timestamp Knowledge Distillation', year: 2024, path: undefined, source: 'IEEE'}
        7
        : 
        {title: 'Mossformer: Pushing the Performance Limit of Monau… with Convolution-Augmented Joint Self-Attentions', year: 2024, path: undefined, source: 'IEEE'}
        8
        : 
        {title: 'Q1i3', year: 2024, path: undefined, source: 'IEEE'}
    '''
    
    print(call_with_messages(data, "文献中最新的文献的title是什么"))