# simpleStore

[simpleStore](http://cdmedia.github.io/simplestore) is a clean, responsive
storefront boilerplate with no database you can setup in minutes. simpleStore is built on
[simpleCart.js](http://simplecartjs.org) and [Skeleton](http://getskeleton.com)
CSS Framework for a lightweight, fast, simple to use, and completely
customizable experience.

![simpleStore Screenshot](https://raw.githubusercontent.com/cdmedia/simplestore/gh-pages/images/screenshot-v1.1-full.png)
![simpleStore Cart Screenshot](https://raw.githubusercontent.com/cdmedia/simplestore/gh-pages/images/screenshot-v1.1-cart.png)
![simpleStore Detail Screenshot](https://raw.githubusercontent.com/cdmedia/simplestore/gh-pages/images/screenshot-v1.1-detail.png)

---

# Features

* No Databases, all client-side (just simple HTML, CSS & Javascript)
* Lightweight & Fast
* Tax Rate Calculations
* Unlimited product attributes
* Shipping
* Multiple Currencies
* Payment Gateways (Paypal, Google Checkout, Amazon Payments)
* For more features check out [simpleCart.js](http://simplecartjs.org)

# Demo

You can see a working demo [here](http://cdmedia.github.io/simplestore/demo/)


# Installation

Install with Bower

```
install bower
```

or manually install using the latest [release](https://github.com/cdmedia/simplestore/releases/latest)


# Setup

1.Configure your payment options in `js/config.js`.

```
checkout: {
	type: "PayPal" ,
	email: "you@yours.com"
},
```

2.Edit the `js/config.js` to your liking.

3.Add additional products in the `products.json` file.

## HTML Version

If you are looking for something more basic, check out the [HTML version on this
branch](https://github.com/cdmedia/simplestore/tree/simplestore-html).
The HTML version uses plain HTML to build the store instead of a JSON
file.

Add additional products using the `<div class="simpleCart_shelfItem"></div>` tags.


## Credit where credit is due

For further documentation on expanding/tweaking simpleStore, check out the
framework/plugin pages.

* [Skeleton](http://getskeleton.com)
* [simpleCart.js](http://simplecartjs.org)
* [Normalize.css](http://necolas.github.io/normalize.css)
* [FontAwesome](http://fortawesome.github.io/Font-Awesome)
* [jQuery](https://jquery.com/)

### A note about JavaScript shopping carts

ALL JavaScript shopping carts are NOT fullproof. Because simpleStore is fully
client-side, some users may attempt to alter prices before checkout. Make
sure to monitor your sales. Just like in real life, if someone
walks into your store and changes the price tag, you will certainly not honor
those changes.


# Contributing

All forms of contribution are welcome: bug reports, bug fixes, pull requests and simple suggestions. Thanks!


## List of contributors

You can find the list of contributors [here](https://github.com/cdmedia/simplestore/graphs/contributors).
