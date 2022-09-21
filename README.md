# cytobi.github.io

this is the repository to [my website on github pages](https://cytobi.github.io)

## how to do this yourself

- setup a github pages project by creating a repository called *username*.github.io where username is your github username
- scaffold a vue + vite project:
```bash
npm create vite@latest
```
- build your project:
```bash
npm run build
```
- make sure to remove ```dist``` from the standard .gitignore in the vite template
- commit & push everything
- run the following git command to create a branch called gh-pages as a subtree of your main branch, meaning that gh-pages will contain everything in your dist folder and nothing else
```bash
git subtree push --prefix dist origin gh-pages
```
- go into the settings of your repository and under "Pages" set gh-pages as the branch to deploy from

now you're all set up!

remember to repeat the build and subtree commands to update the website

## contributors

- [cytobi](https://github.com/cytobi)

## license

[MIT](https://choosealicense.com/licenses/mit/)
