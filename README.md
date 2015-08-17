# simpleStore

[simpleStore](http://cdmedia.github.io/simplestore) is a clean, responsive
storefront boilerplate with no database you can setup in minutes. simpleStore is built on
[simpleCart.js](http://simplecartjs.org) and [Skeleton](http://getskeleton.com)
CSS Framework for a lightweight, fast, simple to use, and completely
customizable experience.

![simpleStore Screenshot](https://raw.githubusercontent.com/cdmedia/simplestore/gh-pages/images/screenshot-full.png)
![simpleStore Cart Screenshot](https://raw.githubusercontent.com/cdmedia/simplestore/gh-pages/images/screenshot-full-cart.png)

---
simpleStore Bootstrap version coming soon.
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

or manually install using the latest [release](https://github.com/cdmedia/simplestore/raw/master/release.zip)


# Setup

1. Configure your payment options in `js/simpleStore.js`.

```
checkout: {
	type: "PayPal" ,
	email: "you@yours.com"
},
```

2. Edit the `js/simpleStore.js` to your liking.

3. Add additional products using the `<div class="simpleCart_shelfItem"></div>` tags.


## Credit where credit is due

For further documentation on expanding/tweaking simpleStore, check out the
framework/plugin pages.

* [Skeleton](http://getskeleton.com)
* [simpleCart.js](http://simplecartjs.org)
* [Featherlight.js](http://noelboss.github.io/featherlight)
* [Normalize.css](http://necolas.github.io/normalize.css)
* [FontAwesome](http://fortawesome.github.io/Font-Awesome)
* [jQuery](https://jquery.com/)


# Contributing

All forms of contribution are welcome: bug reports, bug fixes, pull requests and simple suggestions. Thanks!


## List of contributors

You can find the list of contributors [here](https://github.com/cdmedia/simplestore/graphs/contributors).
