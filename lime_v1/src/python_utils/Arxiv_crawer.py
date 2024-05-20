from bs4 import BeautifulSoup
import requests

import sys
import io

# 确保标准输出支持 UTF-8 编码
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def extract_paper_info(query, num = 10):
    url = f"https://arxiv.org/search/?query={query}&searchtype=all&source=header"
    response = requests.get(url, verify=False)
    
    if response.status_code != 200:
        print("Failed to fetch the webpage.")
        return []

    soup = BeautifulSoup(response.content, 'html.parser')

    results = []
    # cnt = 0

    # Extracting the elements containing the paper information
    for result in soup.find_all('li', class_='arxiv-result'):
        title_elem = result.find('p', class_='title is-5 mathjax')
        author_elem = result.find('p', class_='authors')
        time_elem = result.find('p', class_='is-size-7')
        # pdf_link_elem = result.find('a', title='Download PDF')
        pdf_link_elem = result.find('a', href=True, text='pdf')

 

        if title_elem and author_elem and time_elem:
            title = title_elem.text.strip()
            authors = [a.text.strip() for a in author_elem.find_all('a')]
            time_text = time_elem.text.strip()
            submitted = time_text.split(';')[0].split('Submitted')[-1].strip()
            # pdf_link = f"https://arxiv.org{pdf_link_elem['href']}" if pdf_link_elem else "No PDF link"
            pdf_link = pdf_link_elem['href'] if pdf_link_elem else "No PDF link"

            results.append({
                'title': title,
                'author': authors,
                'year': submitted,
                "path": pdf_link,
                'Journal': 'arVix'

            })
        if len(results) == num:
            break

    

    return results

# Path to the HTML file
# file_path = 'https://arxiv.org/search/?query=Embody&searchtype=all&source=header'
if __name__ == "__main__":
    papers = extract_paper_info("Embody")


    for paper in papers:
        print(f"Title: {paper['title']}")
        print(f"Authors: {(paper['authors'])}")
        print(f"Submitted: {paper['submitted'].split(' ')[-1]}")
        print(f"Link: {paper['pdf_link']}")


        print("-" * 40)