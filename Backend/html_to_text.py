from bs4 import BeautifulSoup

def html_to_raw_text(html_string):
    soup = BeautifulSoup(html_string, 'html.parser')
    raw_text = soup.get_text()
    return raw_text
