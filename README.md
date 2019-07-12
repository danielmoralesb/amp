# My First AMP Page

In my current Consultation Job a client approached us in search of a way to help get their ranking higher. After doing their own research, they concluded that **AMP** would be a good tool for them. At the time, we did not know much about **AMP** other than passive knowledge. My goal was to take a subset of their pages and convert them to AMP. There was a slight problem though, I didn't know AMP. So, like any developer I was off on a hunt for information. This article is my journey of learning **AMP**. Hopefully, you dear reader, will not have to suffer as I have when picking up something completely new. This will not be a comprehensive list of what AMP is capable of but more of a recap of the things I struggled with or wish I would have known in the beginning.

After reading through the [documentation][AMPSite] I understood there were **3** areas/languages that I needed to focus on. **HTML, CSS, and JavaScript**. Let's see them in more detail:<br/><br/>

1. **HTML**
    <br/>
    Just like any framework the HTML in an **AMP Page** has a required mark-up.

    This mark-up consists in already known HTML5 syntax, although with a few additions:
    <br/><br/>
    + **Regular HTML5 declaration**

        ```html
        <!doctype html>
        ```

    + **AMP HTML Declaration** (```<html amp>``` is accepted as well).

        ```html
        <html ⚡ lang="en">
        ```

    + **Regular Head Content**
    <br/>
    This a regular page ```<head>``` syntax, including the encoding of the page, its title and the responsive viewport syntax

        ```html
        <meta charset="utf-8">
        <title>AMP Template</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        ```

    + **AMP JS library**
    <br/>
    This includes and loads the AMP JS library. As a best practice, you should include the script as early as possible in the ```<head>``` of the page

        ```html
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        ```

    + **Canonical**
    <br/>
    Points to the regular HTML version of the AMP HTML document or to itself if no such HTML version exists

        ```html
        <link rel="canonical" href="https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup">
        ```

    + **Structure Data**
    <br/>
    AMP Project suggests to include in the structured data of your AMP at least these four schema.org properties to make your AMP pages more easy to find. For more information about this topic checkout this [WordLift][AMPStructuredData] article.

        ```html
        <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            "headline": "Open-source framework for publishing content",
            "datePublished": "2015-10-07T12:02:41Z",
            "image": [
            "logo.jpg"
            ]
        }
        </script>
        ```

    For more details please visit the [Create your AMP HTML page][RequiredMarkUp] section on the AMP official site.
    <br/><br/>

2. **CSS**
   <br/>
   As a Front-End Developer I needed to make sure that the styling of the **AMP Page** was similar to its **Regular Version**. So, I had to do some **Custom CSS** development, this CSS had to be placed in the ```<head>``` of the page in between the following tags: ```<style amp-custom></style>```.

   Then, I needed to know the guidelines of the **CSS**, its restriction in size and syntax:
   + The maximum _size_ of the CSS is **50KB**
   + The CSS syntax _cannot_ include:
     + **!important** qualifier
     + **-amp-** class and **i-amp-** tag names

   Not only had follow the previous guidelines, but I had to have my new **Custom CSS** followed by a **Boiler Plate**:

    ```html
    <style amp-boilerplate>
        body {
            -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
            animation: -amp-start 8s steps(1, end) 0s 1 normal both
        }

        @-webkit-keyframes -amp-start {
            from {
                visibility: hidden
            }

            to {
                visibility: visible
            }
        }

        @-moz-keyframes -amp-start {
            from {
                visibility: hidden
            }

            to {
                    visibility: visible
            }
        }

        @-ms-keyframes -amp-start {
            from {
                visibility: hidden
            }

            to {
                visibility: visible
            }
        }

        @-o-keyframes -amp-start {
            from {
                visibility: hidden
            }

            to {
                visibility: visible
            }
        }

        @keyframes -amp-start {
            from {
                visibility: hidden
            }

            to {
                visibility: visible
            }
        }
    </style><noscript>
        <style amp-boilerplate>
            body {
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none
            }
        </style>
    </noscript>
    ```

3. **JavaScript**
   <br/>
   Since JavaScript is **NOT** allowed on **AMP Pages** (that includes jQuery and other plugins and frameworks), any functionality must come from the **AMP Components**. I will talk more about them later in the [**AMP Components Section**][AMPComponents] .

<br/>

# Development process
Having the **3** previous areas in mind, it was time for me to focus on building my **AMP Page**. The development process included a few time consuming tasks, such tasks would allow me to achieve different goals but they will also present new challenges, let's take a look at them:

+ **Compiling and Minifying SASS files into CSS**
  + _The Goal_: I need to turn the SASS files into readable CSS code for the browser as well as to get rid of the extra space so the CSS is less than 50KB in size.
  + _The Problem_: this task is done manually by downloading a SASS compiler plugin and then clicking on a button on my IDE ce or by executing a command or a task every time I wish to test the styling rules that you have just typed. I would also have to validate the CSS on the [SASS Validator][AMPSiteValidator] to make sure I am still under the 50KB limit.
  <br/><br/>
+ **CSS injection into the head of the AMP page**
  + _The Goal_: I needed a **Custom CSS** in order to style the **AMP Page** the same way as its original version. This CSS also needs to live within the head of the page.
  + _The Problem_: I had to move the compiled CSS manually from a file to another file and place it in the head of the page also in between the ```<style amp-custom></style>``` tags that I previously talked about.
  <br/><br/>
+ **AMP Validation**
  <br/>
  + _The Goal_: to validate the AMP Page as soon as possible for faster debugging
  + _The Problem_: validation can be tedious since I have to copy and paste the code into [AMP Validator Site][AMPSiteValidator] every time we want to catch any issues with it.
  <br/><br/>

## _Gulp_ to the rescue
**Gulp is a _task runner_.**
<br/>
A task runner is a small application that automate often time consuming and boring tasks. For more information about Gulp, please visit [Andy Carter's Blog (A Beginners Guide to the Task Runner Gulp)][GulpForBeginners].
<br/><br/>
For the AMP Page development I will instruct Gulp to take care of the time consuming tasks that we previously talked about: **SASS Compilation**, **CSS Injection** and **AMP Validation** when watching for changes in relevant files, this way I can create the AMP Page faster.
<br/><br/>
### Adding Gulp
In order to save time at the start of this project, I used the [generic starter files][StarterFiles] from [Jermbo][Jermbo]. They include a set of tasks that allows me to build the **AMP Page** faster by taking advantage of its predefined Gulp tasks.
<br/><br/>
**Modifications to Jermbo's Generic Started Files**
<br/>
Jermbo's generic started files offered a great amount of advantages although since I was building an **AMP Page** I needed to make a few modifications to it:

+ **CSS injection into the head of the AMP page**
  <br/>
 In order to overcome the manual labor of moving the compiled CSS to the ```<style amp-custom></style>``` I needed a task that was going to allow me to move code from one file to another. That is when I bumped into this blog [Creating AMP boilerplate with SASS, Gulp and BrowserSync][CreatingAMPBoilerPlate], this was one of the few blog posts dedicated to create an AMP page using Gulp.
<br/><br/>
In one of their sections they talk about this **Gulp Inject String** dependency that they used in order to do the _string injection_ into the HTML. So I added that dependency into the Gulp **task:compile-html** inside the **gulpfile.js**:
  + I included the following dependency to the **package.json** file: ```"gulp-inject-string": "^1.1.2"```
  + Then, I installed it by using the terminal:
    + I went to the directory where the AMP project was located
    + I installed the node packages by using **npm i** command
  + After that, I modified the **task:compile-html**

    ```js
    gulp.task('task:compile-html', () => {
        const cssContent = fs.readFileSync('./build/styles/styles.css', 'utf8');
        return gulp
            .src(config.html.source)
            .pipe($.injectString.after('style amp-custom>', cssContent))
            .pipe(gulp.dest(config.html.build));
    });
    ```

+ **AMP Validation**
  <br/>
  I was surfing the web looking for a Gulp plugin that could help remove the _non allowed_ syntax from my AMP Page and I did not find anything that could do the job, but I did find a plugin that told me what was wrong with it. The name of that plugin was the [Gulp AMPHTML Validator][GulpAMPHTMLValidator]. A plugin for validating [AMPHTML files][AMPSite] using the official [AMPHTML Validator][AMPHTMLValidator].
  <br/><br/>
  Following the previous instructions I went and installed the AMP Validation node package:
  +  I included the following dependency in the **package.json** file: ```"gulp-amphtml-validator": "^1.0.2"```
  + Then, I installed it by using the terminal:
    + I went to the directory where the AMP project was located
    + I installed the node packages by using **npm i** command
  + Then, I needed to add a new task to the gulpfile.js, I called the it **task:amp-html-validate**

    ```js
    gulp.task('task:amp-html-validate', () => {
        const paths = {src: './src/index.html'};

        return gulp.src(paths.src)
            .pipe(errorHandler())
            .pipe($.amphtmlValidator.validate())
            .pipe($.amphtmlValidator.format())
            .pipe($.amphtmlValidator.failAfterError());
    });
    ```

  + I also included the recently created task: **amp-html-validate** into the recently updated **task:compile-html**, so we can validate the HTML every time we compile it:

    ```js
    gulp.task('task:compile-html', () => {
        const cssContent = fs.readFileSync('./build/styles/styles.css', 'utf8');

    runSequence('task:amp-html-validate');

        return gulp
            .src(config.html.source)
            .pipe($.injectString.after('style amp-custom>', cssContent))
            .pipe(gulp.dest(config.html.build));
    });
    ```

### Quick Note
Besides validating the code using Gulp, I was double checking it by using the _chrome extension_ [**AMP Validator**][AMPValidator], this extension helped me validate the AMP site on the browser as well.
<br/><br/>

# AMPComponents
Since JavaScript is not allowed on AMP Pages, I took advantage of the multiple components that AMP has to offer, so I could have the functionality that I needed.

Here is a List of the Components that I used on my **AMP Page**:

 + [AMP Bind (Toggle)][AMPBindToggle] -> _[ChecK out this CodePen Example](https://codepen.io/danielmorales/pen/gJQOMm)_
 + [AMP Accordion (Accordion Navigation)][AMPAccordion] -> _[ChecK out this CodePen Example](https://codepen.io/danielmorales/pen/LKLOra)_
 + [AMP Animation and AMP Position Observer (Sticky Nav)][AMPAnimationPositionObserver] -> _[ChecK out this CodePen Example](https://codepen.io/danielmorales/pen/KjqZPQ)_
 + [AMP Bind (Modal)][AMPBindModal] -> _[ChecK out this CodePen Example](https://codepen.io/danielmorales/pen/ZdJJxm)_
 + [AMP Carousel][AMPCarousel] -> _[Check out this CodePen Example](https://codepen.io/danielmorales/pen/WqEXMw)_
 + [AMP Lightbox][AMPLightbox] -> _[Check out this CodePen Example](https://codepen.io/danielmorales/pen/zVdRQN)_
<br/><br/>

_Note that for every component that is used on any AMP Page I had to add its required script._ This way I only used what I need instead of using the whole lirbary of components that AMP has, saving on loading time when users request the finished page.

#### AMPBindToggle
The Navigation of the Regular version of the Page had a button that toggle its visibility. This button's function was to add and remove a class on the body that with the use of CSS will toggle the navigation all with the use of JavaScript.
<br/><br/>
While researching a way to toggle a class when using AMP Components I bumped into an article on [Stack Overflow][SOAMPBind] where they suggested the use of the [AMP Bind Component][AMPSiteAMPBind] for such functionalities. This component is very useful since it allows to add custom stateful interactivity to your AMP pages via data binding and JS-like expressions.

+ Required Script:

    ```js
    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    ```

+ Code:

    ```html
    <button class="mobile-nav-trigger" on="tap:AMP.setState({navVisible: ! navVisible, searchVisible: false})">
        <span class="nav-pull fa fa-bars"></span>
    </button>

    <body [class]="navVisible ? 'nav-open' : 'nav-closed'"
    class="nav-closed">
    ```

+ Description:
  + By tapping the button I am toggling the **navVisible** state
  + The **body** listens for that _state_ change:
    + If there is a **navVisible** state, we add the **nav-open** class and we remove the **nav-closed** class
    + If there is **not** a **navVisible** state, then we add the **nav-closed** class and we remove the **nav-open** class

<br/>

#### AMPAccordion
The Regular version of the page had an accordion navigation on the its mobile menu. This navigation was done using JavaScript as well, so I though that maybe AMP had a solution for that, and guess what, they did. Welcome the [AMP Accordion Component][AMPSiteAMPAccordion]:

+ Required Script:

    ```js
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    ```

+ Code:

    ```html
    <section class="nav main-nav">
        <amp-accordion>
            <section class="nav-section">
                <header class="nav-section__header"">
                    <a class="nav-link" href="https://amp.dev/documentation/templates/?referrer=ampstart.com/about">About</a>
                </header>
                <ul class="nav-list">
                    <li><a class="nav-link" href="https://amp.dev/documentation/templates/?referrer=ampstart.com/about/websites">AMP Websites</a></li>
                    <li><a class="nav-link" href="https://amp.dev/documentation/templates/?referrer=ampstart.com/about/stories">AMP Stories</a></li>
                </ul>
            </section>
        </amp-accordion>
    </section>
    ```

+ Description:
  + It can contain one or more sections
  + Each section must contain at least 2 children

<br/>

#### AMPAnimationPositionObserver
One of the most challenging features for the AMP Page was to recreate the **Sticky Nav** using only AMP Components. While researching, I did not find an **AMP Sticky Nav Component**. I only found a similar functionality that was done with the combination of these two components:
+ [AMP Animation][AMPSiteAMPAnimation]
+ [AMP Position Observer][AMPSiteAMPPositionObserver]

AMP Animation

+ Required Script:

    ```js
    <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
    ```

+ Code:

    ```html
    <amp-animation id="showAnim" layout="nodisplay">
        <script type="application/json">
            {
                "duration": "400ms",
                "fill": "both",
                "direction": "alternate",
                "animations": [{
                    "selector": "#stickyWrapper",
                        "keyframes": [{
                        "opacity": "1",
                        "visibility": "visible"
                    }]
                }]
            }
        </script>
    </amp-animation>

    <amp-animation id="hideAnim" layout="nodisplay">
        <script type="application/json">
            {
                "duration": "400ms",
                "fill": "both",
                "direction": "alternate",
                "animations": [{
                    "selector": "#stickyWrapper",
                    "keyframes": [{
                        "opacity": "0",
                        "visibility": "hidden"
                    }]
                }]
            }
        </script>
    </amp-animation>
    ```

+ Description:
  + Each animation have a unique identifier
  + They have a set of instructions
  + Both animations target the same selector: _stickyWrapper_
  + The only difference is that keyframes do the total opposite actions: changing opacity and visibility

<br/>
Position Observer

+ Required Script:

    ```js
    <script async custom-element="amp-position-observer" src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js"></script>
    ```

+ Code:

    ```html
    <amp-position-observer target="stickyWrapper" on="enter:hideAnim.start; exit:showAnim.start" intersection-ratios="0.9" layout="nodisplay"></amp-position-observer>

    <div id="stickyWrapper" class="sticky">
        <section class="sticky__inner">
            <header class="sticky__header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.92 20.92"><path fill="#FFF" d="M10.46 0C4.683 0 0 4.683 0 10.46c0 5.777 4.683 10.46 10.46 10.46s10.46-4.683 10.46-10.46C20.92 4.683 16.237 0 10.46 0zM8.809 19.269l1.652-7H5.348l7.314-10.618-1.809 6.685 4.719.079-6.763 10.854z"/></svg>
                <h2 class="sticky-header__title">Success Stories</h2>
            </header>
            <nav class="sticky__nav">
                <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>Advertisers</span></a>
                <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>E-Commerce</span></a>
                <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>Publishers</span></a>
            </nav>
        </section>
    </div>
    ```

+ Description:
  + It targets the _stickyWrapper_ element
  + It triggers when the intersection value is met (0.9)
  + The _hideAnim_ animation starts when the _stickyWrapper_ is 90% visible
  + The _showAnim_ animation starts when the _stickyWrapper_ is less than 90% visible

<br/>

#### AMPBindModal

+ Code:

    + Trigger:

        ```html
        <div id="stickyWrapper" class="sticky">
            <section class="sticky__inner">
                <header class="sticky__header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.92 20.92"><path fill="#FFF" d="M10.46 0C4.683 0 0 4.683 0 10.46c0 5.777 4.683 10.46 10.46 10.46s10.46-4.683 10.46-10.46C20.92 4.683 16.237 0 10.46 0zM8.809 19.269l1.652-7H5.348l7.314-10.618-1.809 6.685 4.719.079-6.763 10.854z"/></svg>
                    <h2 class="sticky-header__title">Success Stories</h2>
                </header>
                <nav class="sticky__nav">
                    <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>Advertisers</span></a>
                    <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>E-Commerce</span></a>
                    <a class="btn" href="https://amp.dev/success-stories/" target="_blank"><span>Publishers</span></a>
                </nav>
            </section>
        </div>
        ```

    + Modal:

        ```html
        <div id="stickyAdvertisers" class="sticky-content"
            [class]="stickyState == 'advertisers' ? 'sticky-content -block' : 'sticky-content'">
            <div class="sticky-content__inner">
                <article class="sticky-content__card">
                    <div class="sticky-content-card__inner">
                        <div class="sticky-content-card__header">
                            <svg></svg>
                        </div>
                        <section class="sticky-content-card__section">
                            <p class="sticky-content-card__desc">Faster page loads with AMP deliver truckloads of new drivers to U.S. Xpress</p>
                        </section>
                    </div>
                </article>
            </div>
            <div class="modal-overlay" role="button" tabindex="0" on="tap:AMP.setState({stickyState: ''})"></div>
        </div>

        <div id="stickyEcommerce" class="sticky-content"
            [class]="stickyState == 'e-commerce' ? 'sticky-content -block' : 'sticky-content'">
            <div class="sticky-content__inner">
                <article class="sticky-content__card">
                    <div class="sticky-content-card__inner">
                        <div class="sticky-content-card__header">
                            <svg></svg>
                        </div>
                        <section class="sticky-content-card__section">
                            <p class="sticky-content-card__desc">DiscoverCarHire.com drives conversions with faster mobile page load times via AMP</p>
                        </section>
                    </div>
                </article>
            </div>
            <div class="modal-overlay" role="button" tabindex="0" on="tap:AMP.setState({stickyState: ''})"></div>
        </div>
        ```

+ Description:
  + By tapping the _btn_ we are toggling its **-active** class
  + We are also using the _state machine_ technique in order to pass the **stickyState** variable to its correspondent Modal
    +  If **stickyState** exists, add the **-block** class to it
    +  If not, do nothing

#### AMPCarousel
[(More Info)][AMPSiteCarousel]

+ Required Script:
    ``` js
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    ```
+ Code:
    ```html
    <amp-carousel width="400" height="400" layout="responsive" type="slides" autoplay>
        <div class="hero-carousel__item" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.333 287.375"><circle></circle></svg>
        </div>
        <div class="hero-carousel__item" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.333 287.375"><circle></circle></svg>
        </div>
    </amp-carousel>
    ```
+ Description:
    + In this example I used the "type" **slides** since I was using **SVG's** as images
    + I also used the "autoplay" for obvious reasons and styled the **carousel buttons** by overriding its default styles usign the _.amp-carousel-button-prev_ and _.amp-carousel-button-next_ classes

#### AMPLightbox
[(More Info)][AMPSiteLightbox]

+ Required Script:

    ```js
    <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
    ```

+ Code:
    + Trigger

        ```html
        <article class="featured-carousel__item" on="tap:lightboxBind" role="button" tabindex="0">
            <div class="featured-carousel__item-inner">
                 <header class="featured-carousel__header">
                    <h2 class="featured-carousel__title">Bind</h2>
                </header>
                <div class="featured-carousel__main">
                    <div class="featured-carousel__main-left"></div>
                        <p class="featured-carousel__desc">Amp-bind allows you to add custom interactivity to your pages beyond using AMP's pre-built components.</p>
                </div>
            </div>
        </article>
        ```

    + Lightbox:

        ```html
        <amp-lightbox id="lightboxBind" class="lightbox" layout="nodisplay">
            <div class="lightbox__wrapper">
                <article class="lightbox__inner">
                    <header class="lightbox__header">
                        <button class="close-btn" on="tap:lightboxBind.close" role="button" tabindex="0">
                            <i class="fas fa-times"></i>
                            <span class="sr-only">Close</span>
                        </button>
                        <div class="lightbox__hero">
                            <svg></svg>
                        </div>
                        <div class="lightbox__main">
                            <div class="lightbox-main__title">
                                <h1 class="lightbox-main-title__text">AMP - Bind</h1>
                            </div>
                            <div class="lightbox-main__intro">
                                <p class="lightbox-main-intro__text">The amp-bind component allows you to add custom stateful interactivity to your AMP pages via data binding and JS-like expressions.</p>
                            </div>
                        </div>
                    </header>
                        <section class="lightbox__section">
                            <div class="lightbox-section__title">
                                <h3 class="lightbox-section-title__text">Note</h3>
                            </div>
                            <div class="lightbox-section__desc">
                                <p class="lightbox-section-desc__text">For performance and to avoid the risk of unexpected content jumping, amp-bind does not evaluate expressions on page load. This means that the visual elements should be given a default state and not rely amp-bind for initial render</p>
                            </div>
                        </section>
                    </article>
                </div>
            <div class="modal-overlay" on="tap:lightboxBind.close" role="button" tabindex="0"></div>
        </amp-lightbox>
        ```

+ Description:
    + On the trigger _tap_, target the lightbox with the ID of **lightboxBind**
    + **lightboxBind** will open on tap
    + Clicking the **modal-overlay** will trigger the _close_ method ont the **lightboxBind** element

# Conclusion
**AMP** is a very useful and easy to use framework, although it does take a little time to get used to. One most acknowledge that NOT all the functionality can be recreated using AMP but you can get close enough, a good price to get your ranking higher.

You can check out the complete **AMP** example at _[Codepen](https://codepen.io/danielmorales/pen/jRXBjp)_.


[GULP]: #GULP
[RequiredHTMLMarkup]: #RequiredHTMLMarkup
[JS]: #JavaScript
[CSS]: #CSS
[AMPComponents]: #AMPComponents
[AMPBindToggle]: #AMPBindToggle
[AMPAccordion]: #AMPAccordion
[AMPAnimationPositionObserver]: #AMPAnimationPositionObserver
[AMPBindModal]: #AMPBindModal
[AMPCarousel]: #AMPCarousel
[AMPLightbox]: #AMPLightbox

[AMPSite]: https://amp.dev/
[GulpForBeginners]: https://andy-carter.com/blog/a-beginners-guide-to-the-task-runner-gulp
[Jermbo]: https://github.com/jermbo
[StarterFiles]: https://github.com/jermbo/GenericStarterFiles.git
[CreatingAMPBoilerPlate]: https://blog.pagepro.co/2016/11/22/creating-amp-boilerplate-with-sass/
[AMPHTMLValidator]: https://www.npmjs.com/package/amphtml-validator
[GulpAMPHTMLValidator]: https://www.npmjs.com/package/gulp-amphtml-validator
[RequiredMarkUp]: https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup?format=websites#required-mark-up
[StructureData]: https://amp.dev/boilerplate/
[AMPValidator]: https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en
[AMPSiteValidator]: https://validator.ampproject.org/
[AMPComponents]: https://amp.dev/documentation/components/?format=websites
[AMPSiteAMPBind]: https://amp.dev/documentation/components/amp-bind
[AMPSiteAMPAccordion]: https://amp.dev/documentation/components/amp-accordion
[AMPSiteAMPAnimation]: https://amp.dev/documentation/components/amp-animation
[AMPSiteAMPPositionObserver]: https://amp.dev/documentation/components/amp-position-observer
[AMPSiteCarousel]: https://amp.dev/documentation/examples/components/amp-carousel
[AMPSiteLightbox]: https://amp.dev/documentation/components/amp-lightbox
[AMPStructuredData]: https://wordlift.io/blog/en/amp-structured-data/
[SOAMPBind]: https://stackoverflow.com/questions/45239075/amp-easy-way-to-toggle-a-css-class
