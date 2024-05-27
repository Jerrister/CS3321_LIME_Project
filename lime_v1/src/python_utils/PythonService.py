from flask import Flask, jsonify ,request
from flask_cors import CORS
import os
from readPDF_1 import extract_title_and_author_from_flask
from Arxiv_crawer import extract_paper_info
# import 
import time
from filter_author import extract_names_2
from LLM import call_with_messages
app = Flask(__name__)
CORS(app)




@app.route('/analyze', methods=['POST'])
def LLM_question():

    data = request.json.get('reference', '')
    question = request.json.get('question', '')

    with open("log.txt", "a") as f:
        f.write("data:" +  str(data) + '\n' )
        f.write("question:" +  str(question)+ '\n')

    ans = call_with_messages(data_list=data, question=question)

    with open("log.txt", "a") as f:
        f.write("ans:" +  str(ans)  + '\n')
        # f.write("question:" +  str(question))
    
    return jsonify({'result': ans})

@app.route('/upload', methods=['POST'])
def upload_files():
    files = request.files.getlist('files')
    if not files:
        return jsonify({'error': 'No files uploaded'})
    
    # print(files)
    # print("ADDDDDD : " , title, author)
    result = []

    for file in files:
        title, author , path  = extract_title_and_author_from_flask(file)
        f_dict = {}
        f_dict["title"] = title
        f_dict["author"] = extract_names_2(author)
        f_dict['path'] = path
        result.append(f_dict)
        
    return jsonify({'message': 'Files successfully uploaded' , 'result': result})


@app.route('/search', methods=['POST'])
def search_files():

    time_start = time.time()
    query = request.json.get('query', '')
    with open("log.txt", "a") as f:
        f.write('\n begin: ' + str(time.time()) +  " , query: " + query + ' \n' )
    if not query:
        return jsonify({'error': 'No search query provided'})

    # 简单的搜索功能，匹配文件标题或作者
    # print("Search: " , query)

    with open("log.txt", "a") as f:
        f.write("Begin:"   + str( time.time() - time_start) +'\n')

    # print()
    time_start = time.time()
    result = []

    result = extract_paper_info(query)
    with open("log.txt", "a") as f:
        f.write("extract need:" + str( time.time() - time_start) +'\n')

    # matched_files = []
    # print(result)
    with open("log.txt", "a", encoding='utf-8') as f:
        f.write("result: "   + str(  result ) + '\n')

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, port=8848)

