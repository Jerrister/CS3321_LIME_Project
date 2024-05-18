from flask import Flask, jsonify ,request
from flask_cors import CORS
import os
from readPDF_1 import extract_title_and_author_from_flask
# import 
from filter_author import extract_names
app = Flask(__name__)
CORS(app)


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
        f_dict["author"] = extract_names(author)
        f_dict['path'] = path
        result.append(f_dict)
        
    return jsonify({'message': 'Files successfully uploaded' , 'result': result})
  

if __name__ == '__main__':
    app.run(debug=True, port=7688)

