# Bus Buddy
### 2018 Interactive Digital Media Workshop
---
## Team Members
* Mike Carbone - Project Manager / Dev
* Yuang Li - Dev / UI
* Sarah Bray - UI / UX
* Craig Melendes - UX / Content Manager
---

## Installing this project
1. Navigate to root of the project folder
2. Run `npm install`
	- (This can take a while be patient)


## Editing this project
1. Fork this repository to your github account
2. Download locally
3. Install the project (see above)
4. Run `npm run full-dev`in the root of the project folder
5. Create a feature branch on your own GitHub Repo
6. Add and commit any changes on the feature branch
7. **All commits must include the [appropriate  gitmoji](https://gitmoji.carloscuesta.me/)**
8. Push all the changes
9. Navigate back to original repo and submit a pull request from your feature branch

## Editing front-end CSS / SASS
1. Follow steps above to install and setup dev environment
	- Specifically steps 3 - 5
2. Navigate to client/src/sass
3. To create a new SASS component, create a new file and name it _[YOUR FILE NAME].scss
	- The underscore indicates it is a partial
4. Save your SASS partial
4. Open the app.scss SASS file
5. Import your partial following the same schema `@import '[YOUR FILE NAME]';`
6. If you ran the dev command, webpack should be watching and auto-compile your SASS to `./client/build/css/screen.css`

--- 
## Code Structure
We use class prefixes with BEM syntax for our system’s CSS architecture.

Link to resources:
- [Css Architecture For Design Systems](http://bradfrost.com/blog/post/css-architecture-for-design-systems/)
- [Get BEM](http://getbem.com/)

