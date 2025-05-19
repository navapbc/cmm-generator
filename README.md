# cmm-generator

This tool fetches data from AirTable and generates a nicely-formatted Capability Maturity Model document suitable for copying or importing into MS Word or Google Docs. At the moment this tool is exclusively for the WIC MIS project, but the future is bright and holds endless possibilities.

# Usage
To use, just visit the [github pages deployment](https://navapbc.github.io/cmm-generator/) and paste your API key there.

## Getting an API key
* Sign into AirTable.
* Visit the [Personal Access Tokens](https://airtable.com/create/tokens) page.
* Click "Create a new token"
* Name the token something like ```yourname-cmm```
* Add two scopes: ```data.records:read``` and ```schema.bases:read```
* Click "add a base" and select the CMM base
* Click "create token"

