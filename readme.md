# Youtube Music Search

Search Songs in youtube Music without an API Key. This approach uses Chrome Headless with Selenium to capture search results.

## Installation

- Include Chrome Webdriver in your path: https://chromedriver.chromium.org/downloads
- Update Chrome Driver version in `package.json` if necessary.
- `npm install` - Download dependencies
- `npm run start` - Initialize API at http://localhost:4000

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
