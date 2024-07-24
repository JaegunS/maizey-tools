# maizey-tools
These tools were developed for Pascal, the Project Pal, a chatbot for the U-M PMO. They consist of:

1. A simple recursive web scraper configured to be compatible with Duo authentication.
2. An HTML parser to extract text and enrich it using an LLM.

Both tools are designed to be supplementary to Maizey, a [RAG service](https://its.umich.edu/computing/ai/maizey-in-depth) provided and maintained by U-M ITS. Most users will not require either tool as the [July 18th release](https://its.umich.edu/computing/ai/release-notes) covers several features these tools were designed to accomplish. However, if you are not satisfied with Maizey's performance, it may be worth looking at these tools.

# scraper.ipynb
This Jupyter Notebook uses Selenium to recursively follow unique <a> tags and download their HTML. It also provides a basic authentication flow to get past Duo, as many Umich sites are locked behind it. This can be disabled.
Originally, Maizey was not able to handle multiple data sources (i.e. it could accept either Google Drive or webpages, but not both). As we had a mix of documents, our use-case entailed pulling info from webpages and uploading them to Google Drive. This is no longer necessary as of July 18th.
There are still a few reasons one might use this scraper:

1. To scrape and pull links en masse. While Maizey is powerful, it doesn't have a scraper built-in. You have to add each individual link to its data sources, and this process can be tedious. With this tool, simply define a scope, a starting URL, and modify its settings to only return links. Then, copy/paste its output into Maizey.
2. To gain more granular control over Maizey's data sources. As a user, Maizey's loaders are a black box; you don't know how webpages are being processed, and therefore don't know whether it will have access to the correct data or is being diluted by bad data. You can use this scraper to take control of the process. You can even modify documents after scraping to enhance results.

# enricher.ipynb
This Jupyter Notebook uses U-M GPT Toolkit and BeautifulSoup to parse and enhance HTML files.
