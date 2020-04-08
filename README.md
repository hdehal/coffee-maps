![Screenshot](https://github.com/hdehal/coffee-maps/raw/master/public/app_screenshot.png)

## Get Started:
1. Clone the repo:
```
git clone https://github.com/hdehal/coffee-maps.git
```
2. Create an API key in Google Console:
https://developers.google.com/sheets/api/guides/authorizing#APIKey

3. Create an API key for Bing Maps (for geocoding/nominatim):
https://www.bingmapsportal.com

4. Create a ".env" file in your root (coffee-maps) folder with:
```
REACT_APP_BING_MAPS_API_KEY=<YOUR-API-KEY-HERE>
REACT_APP_GOOGLE_SHEETS_API_KEY=<YOUR-API-KEY-HERE>
```

## General File Structure:

```
src/
└── components/
    ├── header.js
    ├── map.js
    ├── table.js
    └── twemoji.js
```

## How to Deploy on GitHub Pages using Yarn and gh-pages:
Assuming you have an existing working GitHub repository, and your local code is checked-in.

1. Run `yarn add -D gh-pages` to install gh-pages as a dev dependency

2. Create CNAME file in the public/ folder)
```
Your CNAME file should look like this:
mywebsite.com
```
3. Edit your `package.json` and add the following:
If it's a GitHub repo:
```
"homepage": "https://<your_github_username>.github.io/st",
```
OR if it's a custom TLD/domain:
```
  "homepage": "https://yourwebsite.com",
```
AND add your build and deploy scripts -- this will deploy your `build` folder to a new branch it will automatically create for you called `gh-pages`:
```
"scripts": {
    "deploy": "yarn run build && gh-pages -d build",
}
```
4. Add basename to your your routing:
<BrowserRouter basename="/st">

5. Commit your changes to your normal repo

6. Create your username.github.io repo at https://pages.github.com

7. Configuring a custom domain for your GitHub Pages site:
https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site

8. Run `yarn deploy` -- it will prompt you for your Github username/password and automatically create and push your build files to a new branch `gh-pages` on your remote origin.

9. You should shortly see your changes on either https://yourwebsite.com or https://your_github_username.github.io