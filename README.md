# maizey-tools
These are some tools to enhance Maizey's base functionality.

1. **scraper.ipynb** - A simple recursive web scraper configured to be compatible with Duo authentication.
2. **enricher.ipynb** - An HTML parser to extract text and enrich it using an LLM.
3. **sheets.gs** - A Google Apps Script to add a `MAIZEY` function to Google Sheets.

All tools are designed to be supplementary to Maizey, a [RAG service](https://its.umich.edu/computing/ai/maizey-in-depth) provided and maintained by U-M ITS. Most users will not require any of these tools as the [July 18th release](https://its.umich.edu/computing/ai/release-notes) covers several features these tools were designed to accomplish. However, if you are not satisfied with Maizey's performance, it may be worth looking at these tools.

# scraper.ipynb
This Jupyter Notebook uses Selenium to recursively follow unique <a> tags and download their HTML. It also provides a basic authentication flow to get past Duo, as many Umich sites are locked behind it. This can be disabled.
Originally, Maizey was not able to handle multiple data sources (i.e. it could accept either Google Drive or webpages, but not both). As we had a mix of documents, our use-case entailed pulling info from webpages and uploading them to Google Drive. This is no longer necessary as of July 18th.
There are still a few reasons one might use this scraper:

1. To scrape and pull links en masse. While Maizey is powerful, it doesn't have a scraper built-in. You have to add each individual link to its data sources, and this process can be tedious. With this tool, simply define a scope, a starting URL, and modify its settings to only return links. Then, copy/paste its output into Maizey.
2. To gain more granular control over Maizey's data sources. As a user, Maizey's loaders are a black box; you don't know how webpages are being processed, and therefore don't know whether it will have access to the correct data or is being diluted by bad data. You can use this scraper to take control of the process. You can even modify documents after scraping to enhance results.

# enricher.ipynb
This Jupyter Notebook uses U-M GPT Toolkit and BeautifulSoup to parse and enhance HTML files. However, you can also configure it to use Maizey's API instead of GPT Toolkit. It extracts all propositions from a document and provides a summary at the end in order to increase the likelihood of a retrieval hit. In addition, the BS4 parser formats links so that Maizey can use them as part of its response (the default loader does not do this).
Be careful when using this tool. It is designed to be used with the scraper, and as such, it expects a certain format. If you are using it with a different source, you may need to modify the code. It is also not perfect; it is designed to be a supplement to Maizey, not a replacement. It is not a full-fledged NLP model, and as such, it may not always provide the best results. However, it is a good starting point for those who want to experiment with Maizey's API.
Make sure to additionally check your documents to make sure they are being parsed correctly. You may need to manually include or exclude certain tags to get the best results. This tool is not perfect, and it may make errors when parsing. It is up to you to ensure that the data is correct.

# sheets.gs
This is a Google Apps Script that can be used to add a `MAIZEY` function to Google Sheets. You can use it to query Maizey's API and get a response directly in your spreadsheet.
To use this script, go to the sheet you'd like to use it in and click on `Extensions > Apps Script`. Then, paste the code into the editor and click save. Then, navigate to Script Properties and add your token. Go back and create a new conversation (the instructions for doing so are in the script). You should now be able to use the `MAIZEY` function in your sheet. For example, `=MAIZEY("Who was George Washington?")` will return the response to that question.
