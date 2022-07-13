# [Codad5](https://github.com/codad5)/[Jbotrex](https://github.com/jerrygeorge360) web-based text editor

**This is a module for a web based text editor which would ensure seamless intergration into  a website,blog etc with less than 2 lines of code.** :smiley:

## How to Use
> link our module with a script tag at the bottom of your html file
```html
<script type="module" src="https://github.com/codad5/Insert-text-Editor/insert/index.js"></script>
```
 > Create your Parent div 
 ```html
    <div data-editor-frame>

    </div>
 ```
 > NOTE : To add Name attribute for form usage 
 ```html
    <form>
        <input type="text" name="title">
        <!-- the value for the data attribute data-editor-formName is the same as
        <textarea name="body"> </textarea>
        -->
        <div data-editor-frame data-editor-formname="body">

    </div>
    </form>
 ```
 >the value for the data attribute data-editor-formName is the same as
 ```html
        <textarea name="body">

        </textarea>
```

# Open source contribution
### Clone this repo
```bash
    $ git clone 
```
>
### Run on a Live serve
>> if you have node installed
```bash
    $ npx serve
```
>> OR run live-server if you are using vs-code live server extension

### Begin development 
To being developent the main script is at `./insert/main.js`

The `./insert/index.js` is a script for adding Eventlistener

The `index.html` is not to be edited as it is just a template

The `script` directory is an old directory it can be ignored
##### Todos
- [ ] Style The Editor 
- [ ] Fix Highlighed Coloring Bug
- [ ] Add Media Insertion Feature