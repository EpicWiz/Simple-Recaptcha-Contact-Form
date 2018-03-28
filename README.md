# A Simple Example of how to get reCAPTCHA 2.0 Working with AJAX and PHP

This is a simple guide to getting reCAPTCHA v2.0 set up with your website's contact form. This information can be applied to other types of forms and user entry as well, but I focus on a contact form because it's simple and what I used to learn it with.

I made this guide because I had some problems getting it set up, and it was difficult finding information about it online. This process is simple for intermediate/advanced users, but slightly challenging for beginner/intermediate users. I hope this guide helps you, and if you see any issues please let me know! I'll credit your correction to you and link to your github page. (Woohoo)

## Contents

### 1. [reCAPTCHA Keys](#recaptcha-keys)
### 2. [HTML Setup](#html-setup)
### 3. [JavaScript Setup](#javascript-setup)
### 4. [PHP Setup](#php-setup)
### 5. [Potential Issues](#potential-issues)
### 6. [Sources](#sources)

## reCAPTCHA Keys

The first thing you need to do is visit the reCAPTCHA website (here)[https://www.google.com/recaptcha/intro/] to get your keys.

When you get to the page, you will have to click the button in the top right corner that says `get reCAPTCHA`.

If you are not logged in with your google account already, you will be prompted to do so.

You will be sent to the admin page to register a new site.

Go ahead and insert your label name `Contact Form` or whatever you want, then click the circle next to `reCAPTCHA V2`.

After you click that circle the `Domains` text box will appear. This is where you will enter all the domain names that be authorized to use this `site key` and `secret`.

Although you could use the same key/secret pair for multiple websites, you should try to make a new one for each site in my opinion. It's better practice, and will help you better narrow down security issues in the future should a number of things I can think of right now happen.

In the text box you can put your domain and any domains that redirect to the site that you may use for your website in the future. `.com`, `.net`, `.org`, `.ly`, etc.

Click `Accept the reCAPTCHA Terms of Service` then click the `Register` button.

You will then be taken to a page that displays your `site key`, `secret`, and some basic information about how to get started.

## HTML Setup

Along with this readme are three files that I provided. The first I'll be discussing is the `index.html`.

There isn't much to this page.

Just as the reCAPTCHA instructions state, you will add the `script` tag provided under `Step 1: Client side integration`.

There is also a div tag with a `data-sitekey` attribute that holds the value of your `site key` already. You can copy and past that entire element inside the `form` tags on your page.

I put it at the very end, but you can even put it at the beginning if you want, it doesn't matter.

Thats pretty much if for `index.html` other than linking the next files, which is `script.js`.

**Note** In the provided files I have the CDN for bootstrap and jQuery. The bootstrap is not really necessary, but `jQuery is` for how I set up the JavaScript page.

## JavaScript Setup

For the most part you can just check out my provided JavaScript page to see how I have this set up. I provided notes where relevant.

Essentially you're just going to make a `jQuery AJAX` call to your `PHP` file.

Along with your other `data` you will need to provide the response from calling the function:

```javascript
grecaptcha.getResponse()
```

I did that by just adding `captcha: grecaptcha.getResponse()` as a key/value pair in the object passed to `data` in the AJAX call.

## PHP Setup

Again, here you can just check out my provided page that is already excessively for you.

This was the most challenging part for me as I'm not the greatest with `PHP`. You might be a ***wiz***, so take a look and hit the ground running!

For the rest of us I will go into a few details about what is required here.

This is where you will store your `secret` in a variable, retrieve your `reCAPTCHA` response from the `AJAX` call, then send it off to Google to verify its validity.

Although there are plenty of other ways to make this request, we only need to send a bit of info and get a short `JSON` object in return.

I nested `file_get_contents()` inside `json_decode()` just to get the decoding out of the way so we can access the object.

The `JSON` object you get back has 4 key/value pairs. The only two I found a need for were `success`, which returns true or false, and `error_codes`, which gives you 1 of 5 possible problems.

You will access your `JSON` object's values by using the following method (for those that don't know PHP like me):

`object["key"]`

```JavaScript
//response data
$captcha = $_POST["captcha"];
//your recaptcha secret
$secret = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
//Recaptcha verification and JSON response decode
$verify = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha), true);

//store value of JSON key "success"
$success = $verify["success"];
```

Again, thats all provided in `contact.php`.

You can get more information about the `JSON` object and the `error_codes` that it potentially could have by clicking [here](https://developers.google.com/recaptcha/docs/verify).

Really, the most important thing here is that you get a value of `true` for `success` so that you know the reCAPTCHA was verified.

## Potential Issues

### 1.

One of the biggest issues I had when getting all this set up was returning the `true` value back to my `JavaScript` so that I could do something in response.

In my case it was to allow `Message sent successfully!` to appear under the form.

When returning the value for `success` I would get either `1` (which is truthy) or `empty string` (I think) for a falsy value.

This confused me because I didn't expect simple `true` and `false` boolean values to be converted in this way when sent from my `PHP` to `JavaScript` functions.

### 2.

The provided `site key` and `secret` are from google's reCAPTCHA developers page. They are meant to be used while in development and `ALWAYS return true`. You must exchange them for your own `site key` and `secret` to know if your code is really working.

### 3.

In order for mail to be sent without jumping through tons of hoops that you probably aren't yet qualified to even try if you're reading this tutorial, you must have your files hosted on a server on the internet.

All of my testing took place on my `GoDaddy.com` Deluxe Web Hosting account.

It is *possible* you will need to adjust some settings to get it to work on your server if you host elsewhere.

***Please share with me any problems you ran into when trying to figure out how to get reCAPTCHA working so I can address them here to be of further help.***

## Sources

* [Google's reCAPTCHA PHP client library](https://github.com/google/recaptcha)
* [reCAPTCHA Developers Page](https://developers.google.com/recaptcha/)
* [Discussion of how reCAPTCHA works](https://stackoverflow.com/questions/27286232/how-does-new-google-recaptcha-work)
* [Using reCAPTCHA on localhost](https://stackoverflow.com/questions/3232904/using-recaptcha-on-localhost)
* [1. AJAX/PHP with reCAPTCHA](https://stackoverflow.com/questions/12527891/php-recaptcha-ajax) - Wan't the whole story, and kinda old.
* [2. AJAX/PHP with reCAPTCHA](https://stackoverflow.com/questions/47762955/google-recaptcha-v2-with-ajax-and-php) - much newer, and helped me piece a lot of things together.
* [3. AJAX/PHP with reCAPTCHA](https://stackoverflow.com/questions/49468919/recaptcha-ajax-call-forward-result/49542742#49542742) - Newest question about this same topic that I answered using a link to this page.
* [TUTORIAL that helped a lot](https://www.kaplankomputing.com/blog/tutorials/php/setting-recaptcha-2-0-ajax-demotutorial/) - I tried to follow this and actually used a lot I learned here to get my final solution. I was still having a little bit of trouble understanding what I was doing though, so I pressed on!
