## APtimise website.

### Quick start

Node / npm must be installed: https://nodejs.org/en/download/

1. Install Gatsby on your machine:
    ```sh
    npm install -g gatsby-cli
    ```

2. Install modules:
    ```sh
    npm install
    ```
3. Develop site:
    ```sh
    gatsby develop
    ```
    Your site is now running at `http://localhost:8000`! 
    <br/>

4. Build website:
    ```sh
    gatsby build
    ```

5. Serve the built website locally:
    ```sh
    gatsby serve
    ```
    Your site is now running at `http://localhost:9000`! 
    <br/>


## Versioning / branches

There are 3 branches that are auto deployed by Azure to their respective url endpoints when a push is made:

1. master = live url
2. staging
3. dev

## Website guide

#### Data

The content of the website is stored using JSON under the following directories:

    ├── src
        ├── data
            ├── pages.json
            ├── contentBlocks.json

To create a new page add a new node inside pages.json with the following format:


    id: string (unique)
    path: string (unique)
    title: string
    metaDescription: string
    h1: string (optional) adds a h1 title to top of the page
    contentBlocks: array 

    Example: 

    {
        "id": "about", 
        "path": "/about/",
        "template": string (optional) (name of template)
        "title": "About",
        "metaDescription": "About our company",
        "h1": "About us"
        "contentBlocks": [
            "contentBlockId",
            "anotherId"
        ]
    }

The content blocks array contains a list of content block IDs.

To create a new content block add a new node inside contentBlocks.json, there are a number of different content blocks that can be created these are:

1. CalculatorBlock
2. CarouselBlock
3. DeviceBlock
4. FaqBlocks
5. ImageTextBlock
6. InfoBlockFullWidth
7. InfoBlocks
8. LandingBlock
9. LinkBlock
10. TextBlock
11. TextBlockTerms
12. WhitePaperBlock

Below are the fields that can be added for each block:

1. CalculatorBlock

        id: string (unique, required) 
        type: "CalculatorBlock" (required)
        title: string
        textHTML: string (accepts HTML)
        textInvoices: string
        textPaymentRuns: string
        textEmployees: string
        textSummary: string
        textButton: string 

2. CarouselBlock

        id: string (unique, required) 
        type: "CarouselBlock" (required)
        title: string,
        textHTML: string (accepts HTML),
        carouselBlocks: (array, required) [
            object {
                imageCopy: string,
                name: string,
                position: string
                textHTML: string (accepts HTML),
                twitter: string (url)
                linkedIn: string (url)
                facebook: string (url)
                youtubeVideoId: string (Youtube ID)
            }
        ]

3. DeviceBlock

        id: string (unique, required)
        type: "DeviceBlock" (required)
        title: string
        textHTML: string (acceps HTML)
        buttonText: string (required)
    
            
4. FaqBlocks

        id: string (unique, required)
        type: "FaqBlocks" (required)
        title: string
        shortIntroduction: string
        faqBlocks: array (required) [
            object {
                id: string (unique, required)
                title: string
                color: string (theme color)
                animation: string (animation type) (fast, accurate, secure, simple, more, oneElement)
                faqBlockElements: array (required) [
                    object {
                        title: string
                        textHTML: string (accepts HTML)
                    }
                ]
            }
        ]
        
            
5. ImageTextBlock

        id: string (unique, required)
        type: "ImageTextBlock" (required)
        title: string
        textHTML: string (accepts HTML)
        textPosition: string (right, left)
        link: string (url)
        linkText: string
        imageSVG: string (path to SVG, these images should be stored under /static/images/, required)
        imageCaption: string

6. InfoBlockFullWidth
    
        id: string (unique, required)
        type: "InfoBlockFullWidth" (required)
        animation: string (animation type) (fast, accurate, secure, simple, more, oneElement)
        title: string
        textIntroHTML: string (accepts HTML)
        textHTML: string (accepts HTML)

7. InfoBlocks
    
        id: string (unique, required)
        type: "InfoBlocks" (required)
        infoBlocks: array (required) [
            object {
                animation: string (animation type) (fast, accurate, secure, simple, more, oneElement)
                title: string 
                textHTML: string (accepts HTML)
            }
        ]

8. LandingBlock
    
        id: string (unique, required)
        type: "LandingBlock" (required)
        imageDesktop: string (required) (path to image, located in /src/images/ written like this: ../images/image.jpg) 
        imageMobile: string (required) (same as above)
        title: string
        videoText: string
        youtubeVideoID: string (youtube ID)
        text: string

9. LinkBlock
    
        id: string (unique, required)
        type: "LinkBlock" (required)
        links: array (required) [
            object {
                link: string (url)
                linkText: string
            }
        ]
    
10. TextBlock
       
        id: string (unique, required)
        type: "TextBlock" (required)
        size: string (theme font size, e.g xl)
        weight: string (theme font family, e.g light)
        textHTML: string (accepts HTML)

11. TextBlockTerms
       
        id: string (unique, required)
        type: "TextBlockTerms" (required)
        size: string (theme font size, e.g xl)
        weight: string (theme font family, e.g light)
        textHTML: string (accepts HTML)


12. WhitePaperBlock

        id: string (unique, required)
        type: "WhitePaperBlock" (required)
        title: string
        textHTML: string (accepts HTML),
        buttonText: string
        image: string (required) (path to image, located in /src/images/ written like this: ../images/image.jpg) 
    

#### Diagrams

1. Code base flow

    ![alt text](/architecture-diagrams/codebase-flow.jpg "Logo Title Text 1")

2. Architecture

    [Website Architecture](/architecture-diagrams/aptimise-architecture.pdf)


## What's inside?

A quick look at the top-level files and directories you'll see.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:
