# CSR Programme

### Description
This is a custom form built with [Google Apps Script](https://developers.google.com/apps-script), [Vue JS](http://vuejs.org/), and [Vue Material](http://vuematerial.io/). You can make a copy of this [spreadsheet](https://docs.google.com/spreadsheets/d/1XJQMwgkzGstfBm7dmlMssBSV59T0mTUwW2KO6SOxf2s/copy) to your Google drive and deploy the project as an web app to use it. You also can clone this project to your local directory and deploy it with [clasp](https://github.com/ashtonfei/google-apps-script-projects/tree/GAS-059).

### Demo App
[Demo Form](https://script.google.com/macros/s/AKfycbxkvF8SRpKVDsnoZfhsiQJzrSeQ6tlOQ5BsC53SIapJPtnOOcO0/exec)

### Apps script type
Google Sheet

### Features
* Custom form
* Sequential registration number
* Input validation
* Dynamic confirmation message
* Error message
* Valid form in a time frame
* Max responses

### Settings
* Max responses
    ``` javascript
    const _max_responses = 1500 // max reseponses allowed
    ```
    ![image](https://user-images.githubusercontent.com/16481229/88295667-510aad80-cd30-11ea-95b2-478937f2815d.png)
* Form valid from
    ``` javascript
    start: new Date(2020, 6, 22, 6), // 27 Jul 2020, 6 am
    ```
    ![image](https://user-images.githubusercontent.com/16481229/88295882-94651c00-cd30-11ea-9584-8c51b4d8a094.png)
* Form invalid from
    ``` javascript
    end: new Date(2020, 6, 31, 13), // 31 Jul 2020, 1.00 pm
    ```
    ![image](https://user-images.githubusercontent.com/16481229/88296063-cf674f80-cd30-11ea-8b2b-176bb50aa733.png)

### Screenshots
* Form App
    ![image](https://user-images.githubusercontent.com/16481229/88294665-20764400-cd2f-11ea-8e25-342f48679c96.png)
* Form responses and form reset in the spreadsheet
    ![image](https://user-images.githubusercontent.com/16481229/87852806-b1b47780-c937-11ea-964e-68806931315f.png)
* Form validation
    ![image](https://user-images.githubusercontent.com/16481229/88295203-ac886b80-cd2f-11ea-918a-1bf183da8bac.png)
* Confirmation message
    ![image](https://user-images.githubusercontent.com/16481229/88295346-e194be00-cd2f-11ea-9acc-c4c3331fa050.png)

### YouTube
More videos about [Google Apps Script](https://www.youtube.com/ashtonfei/)






