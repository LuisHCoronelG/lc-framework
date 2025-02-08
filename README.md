# My automation framework

## This project contains all the requirements of the challenge provided by paylocity.

You can find the bug reports and the evidence of the performance execution in the documents folder 
```
./Documents
```

To execute the project you need to clone the repository

https://github.com/LuisHCoronelG/lc-framework.git

and set up these environment variables (ask the creator for the env vars values)
```
BASE_URL
BASE_URL_EMPLOYEES_API
USER_NAME
PASSWORD
```
Once all the variables are available and you are in the rooth directory of the cloned repository, you can execute the scripts

For integration
```
npm install
npm run integration:tests
```

For e2e
```
npm install
npm run e2e:tests
```

For performance
```
npm install
npm run performance:tests
```

Besides these scrips, you can find more useful scripts in the package.json file