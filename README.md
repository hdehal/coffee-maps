[<img src="https://github.com/hdehal/coffee-maps/raw/master/public/app_screenshot2.png">](https://hdehal.github.io/coffee-maps)

## Support Local Business!
☕ View the list here: [https://hdehal.github.io/coffee-maps](https://hdehal.github.io/coffee-maps)

Fortunately, the San Francisco Bay Area has an abundance of roasters and an exceedingly diverse coffee scene. Please consider purchasing from local coffee roasters to help support independently-run small businesses.

The term *third wave coffee* was originally coined by Trish Rothgeb (of Wrecking Ball) and succinctly summarized by the late and great Pulitzer Prize winning food critic Jonathan Gold:

> The first wave of American coffee culture was probably the 19th-century surge that put Folgers on every table, and the second was the proliferation, starting in the 1960s at Peet's and moving smartly through the Starbucks grande decaf latte, of espresso drinks and regionally labeled coffee. We are now in the third wave of coffee connoisseurship, where beans are sourced from farms instead of countries, roasting is about bringing out rather than incinerating the unique characteristics of each bean, and the flavor is clean and hard and pure.  
See also: [LA Times](https://www.latimes.com/food/story/2019-10-04/third-wave-coffee-trish-rothgeb) and [Wikipedia](https://en.wikipedia.org/wiki/Third_wave_of_coffee#Use_of_the_term)

## Add a Roaster to the List!
If you see a coffee roaster missing from the list, feel free to contribute by adding to the Google Sheet (please request access), which will automatically update the map: [https://docs.google.com/spreadsheets/d/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/edit?usp=sharing)

## Or Get Started as a Developer:
If you would like to roll your own maps for your region or city, please feel free to clone or fork the code!

1. Clone the repo:
```
git clone https://github.com/hdehal/coffee-maps.git
```

2. Create a "Service Account Key": https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys

3. Enable API access to Google Sheets: https://developers.google.com/sheets/api/quickstart/js#step_1_turn_on_the

4. Share your Google Sheet with your "Service Account Key" address (that you created above) as write/edit

5. Create an API key for Bing Maps (for geocoding/nominatim -- not using Google here since their service requires a credit card on file): https://www.bingmapsportal.com

6. Create a ".env" file in your root (coffee-maps) folder with:
```
REACT_APP_BING_MAPS_API_KEY=<YOUR-API-KEY-HERE>
REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL=<YOUR-API-KEY-HERE>
REACT_APP_GOOGLE_PRIVATE_KEY=<YOUR-API-KEY-HERE>
```

7. Install and run:
```
yarn install
yarn start
```

### General File Structure:
```
src/
└── components/
    ├── header.js
    ├── map.js
    ├── table.js
    ├── tableCount.js
    └── twemoji.js
```

### How to Deploy on GitHub Pages using Yarn and gh-pages:
Assuming you have an existing working GitHub repository, and your local code is checked-in.

1. Run `yarn add -D gh-pages` to install gh-pages as a dev dependency

2. Edit your `package.json` and add the following:
If it's a GitHub repo:
```
"homepage": "https://<your_github_username>.github.io/<your_repo_name>",
```
AND add your build and deploy scripts -- this will deploy your `build` folder to a new branch it will automatically create for you called `gh-pages`:
```
"scripts": {
    "deploy": "yarn run build && gh-pages -d build",
}
```
3. Commit your changes to your normal repo

4. Create your username.github.io repo at https://pages.github.com (skip the other steps as gh-pages will take care of them)

5. Run `yarn deploy` -- it will prompt you for your Github username/password and automatically create and push your build files to a new branch `gh-pages` on your remote origin.

6. You should shortly see your changes on https://your_github_username.github.io/your_repo_name