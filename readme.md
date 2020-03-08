# Youtube Music Search

Search Songs in youtube Music without API Key. This approach uses Chrome Headless with Selenium to capture search results.

## Installation

- Include Chrome Webdriver in your path: https://chromedriver.chromium.org/downloads
- `npm install` - Download dependencies
- `node main.js` - Initialize Express (API REST)

## Example of usage

Request

```
curl -X GET "http://localhost:3000?q=nothing+else+matters"
```

Result:

```json
{ "id": "kaOOfci2YC8" }
```

## License

Distributed under MIT License
