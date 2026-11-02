## Tailwind 
**sir class point**
-   **default:** "prefers-color-scheme"
    calls from JS -> window.matchMedia()
    
    **for accessing system's theme:**
        window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";

    **@custom-variant ......** 
        - in index.css from tailwind will activate the toggle of light dark theme
        - the class applied to index.html 
        `<html class ="">` 
            - to change class in html element by toggle use 
                `root.classList.toggle("theme name");`
            

## why not instead?
    `window.matchMedia("(prefers-color-scheme:light)").matches ? "light" : "dark";`

__ANSWER:__ Check **System color theme_setting_React** markdown file




## shadcn for themes
https://ui.shadcn.com/