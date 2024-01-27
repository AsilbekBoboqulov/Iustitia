import PyPDF2

def extract_text_from_pdf(pdf_file: str) -> [str]: 
    with open(pdf_file, 'rb') as pdf:
        reader = PyPDF2.PdfFileReader(pdf, strict=False) 
        pdf_text = []
    
        for page in reader.pages:
            content = page.extract_text() 
            
            pdf_text.append(content)
    #return qiladi list shaklida
        return pdf_text
   


#pdf dan text ga o'tdi
law_texts = extract_text_from_pdf('constitution.pdf')
law_texts = [x.lower() for x in law_texts]
#for text in extracted_text:
#    print(text)

str_ai = str(input())
str_key = str(input())


#moddalar soni
law_num = 0
for law in law_texts:
    if "modda" in law:
        law_num += 1


#moddalar massivi
ls_num = []
for i in range(law_num):
    ls_num.append(0)


#kalit sozlar
ls = str_key.split('#')
del ls[0]
ls = [x.lower() for x in ls]