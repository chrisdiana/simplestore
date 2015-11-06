/*
* simplestore
* Copyright 2015 Chris Diana
* https://github.com/cdmedia/simplestore
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

var simpleStore = {

    products: [],
    plugins: {},

    // Default settings
    settings: {
        numColumns: 3,
        brand: "SimpleStore",
        mode: "JSON",
        JSONFile: "products.json",
        fadeSpeed: 200,
        buttonColor: null,
        backgroundColor: null,
        textColor: null,
        container: $('.simpleStore_container'),
        cartContainer: $('.simpleStore_cart_container'),
        rowClass: 'simpleStore_row_',
        columnWidthClasses: {
            1: "",
            2: "one-half",
            3: "one-third"
        }
    },

    productPageOptions: [
        'OneOfAKind'
    ],

    extend: function (target, opts, callback) {
        var next;
        if (typeof opts === "undefined") {
            opts = target;
            target = simpleStore;
        }
        for (next in opts) {
            if (Object.prototype.hasOwnProperty.call(opts, next)) {
                target[next] = opts[next];
            }
        }
        callback(); // check user config options
        return target;
    },

    render: function (url, s) {
        var type = url.split('/')[0];

        var map = {
            // Main view
            '': function () {
                simpleStore.renderProducts(simpleStore.products, s);
            },
            // Detail view
            '#product': function () {
                var id = url.split('#product/')[1].trim();
                simpleStore.renderSingleProduct(id, s);
            },
            // Cart view
            '#cart': function () {
                simpleStore.renderCart(s);
            }
        };

        if (map[type]) {
            map[type]();
        } else {
            simpleStore.renderError(s);
        }
    },

    insertData: function (tmpl, product) {
        tmpl.find('.item_thumb').attr("src", product.image);
        tmpl.find('.item_name').text(product.name);
        tmpl.find('.item_price').text(product.price);
        tmpl.find('.item_description').text(product.description);
    },

    renderProducts: function (products, s) {

        var rowCount = 1,
            numProducts = products.length,
            numRows = Math.ceil(products.length / s.numColumns),
            itemWidth;

        s.cartContainer.hide();
        s.container.fadeOut(s.fadeSpeed, function () {

            // Empty out main container on load
            s.container.html('').fadeIn(s.fadeSpeed);

            // Build rows based on number of products
            for (var r = 0; r < numRows; r++) {
                s.container.append('<div class="row ' + s.rowClass + (r + 1) + '"></div>');
            }

            // Get item column width
            var widthClasses = s.columnWidthClasses;
            for (var k in widthClasses) {
                if (k == s.numColumns) {
                    itemWidth = widthClasses[k];
                }
            }

            // List layout
            products.forEach(function (product, i) {
                var tmpl = $('#products-template').html(),
                    $tmpl = $(tmpl);

                // Set item width
                $tmpl.first().addClass(itemWidth);

                // Insert data into template
                simpleStore.insertData($tmpl, product);

                // Render detail view on hash change
                var getDetail = $tmpl.find('.simpleStore_getDetail');
                getDetail.on('click', function (e) {
                    e.preventDefault();
                    window.location.hash = 'product/' + product.id;
                });

                // Check where to add new item based on row
                if (i === 0) {
                    i = 1;
                }
                if (i % (s.numColumns) === 0) {
                    rowCount++;
                }

                // Append to appropriate container
                $('.' + s.rowClass + rowCount).append($tmpl);
            });
        });
    },

    renderProductOptions: function (options, s) {

        var optionsLayout = '';

        options.forEach(function (option) {
            if (!(simpleStore.productPageOptions in option)) {
                var selectItems = '';
                var attributeLabel = Object.keys(option)[0].trim();
                var attributeValues = option[attributeLabel].trim().split(",");

                // Set attribute values
                $(attributeValues).each(function (attribute, attributeValue) {
                    selectItems += '<option value="' + attributeValue.replace(/ /g, "_").toLowerCase() + '"> ' + attributeValue + ' </option>';
                });

                // Build options layout
                if (options.length) {
                    optionsLayout += '<label>' + attributeLabel + '</label><select class="item_' + attributeLabel.replace(/ /g, "_").toLowerCase() + '">' + selectItems + '</select>';
                }
            } else {
                simpleStore.renderProductPageOptions(option);
            }
        });

        return optionsLayout;
    },

    renderProductPageOptions: function (option) {
        if (option.OneOfAKind) {
            $('.item_qty').hide();
        }
    },

    renderSingleProduct: function (id, s) {

        s.container.fadeOut(s.fadeSpeed, function () {

            var tmpl = $('#product-detail-template').html(),
                $tmpl = $(tmpl);

            simpleStore.products.forEach(function (product) {
                if (product.id == id) {

                    // Insert data into template
                    simpleStore.insertData($tmpl, product);

                    // Load detail view into main container
                    s.container.html($tmpl);

                    // Render product options
                    if (product.options.length) {
                        var options = simpleStore.renderProductOptions(product.options, s);
                        $('.simpleStore_options').append(options);
                    }
                    s.container.fadeIn(s.fadeSpeed);
                }
            });
        });
    },

    renderCart: function (s) {
        s.container.fadeOut(s.fadeSpeed, function () {
            s.cartContainer.fadeIn(s.fadeSpeed);
        });
    },

    renderError: function (s, msg) {
        var tmpl = $('#error-template').html(),
            $tmpl = $(tmpl);

		// Empty out main container on load
		s.container.html('').fadeIn(s.fadeSpeed);

		if (msg.length) {
			$tmpl.find('.error_text').text(msg);
		}
		s.container.append($tmpl);
		s.container.fadeIn(s.fadeSpeed);

		$tmpl.find('.alert_close').on('click', function (e) {
			e.preventDefault();
			$tmpl.fadeOut(s.fadeSpeed, function() {
				$tmpl.remove();
			});
		});
    },

	handleFailure:  function(s, errorMsg) {
		setTimeout(function () {
			simpleStore.renderError(s, errorMsg);
		}, 1000);
	},

    initJSON: function (s) {
        var errorMsg = 'There was an error loading the JSON file.' +
            ' Please make sure you have "' + s.JSONFile + '" file in' +
            ' your main directory.';

        // Checks to make sure file exists
        $.get(s.JSONFile)
            .success(function () {
                // Get product data from JSON file
                $.getJSON(s.JSONFile, function (data) {
                    simpleStore.setProducts(data.products);
                })
                .fail(function () { simpleStore.handleFailure(s, errorMsg); });
            })
            .fail(function () { simpleStore.handleFailure(s, errorMsg); });
    },

    checkMode : function (s) {
        if (s.hasOwnProperty("spreadsheetID") || s.hasOwnProperty("spreadsheetId")) {
            s.mode = "Google";
        }
    },

	checkout : function (s, checkoutData) {
		if (!$.isEmptyObject(checkoutData)) {
        	simpleCart.checkout();
			s.cartContainer.fadeOut(s.fadeSpeed, function () {
				s.container.html('<i class="fa fa-spin fa-circle-o-notch loader"></i>');
				s.container.fadeIn(s.fadeSpeed);
			});
		}
	},

	verifyCheckoutData : function (cdata, adata, v) {
		for (var d in cdata) {
			if (cdata.hasOwnProperty(d)) {
				var cp = cdata[d], cn = cp.name, cpp = cp.price;
				for (var i = 0; i < adata.length; i++) {
					var ap = adata[i], an = ap.name, app = ap.price;
					if (cn === an) {if (cpp != app) { v = false; }}
				}
			}
		}
		return v;
	},

    validatePrices : function (s) {
        var checkoutData = JSON.parse(localStorage.simpleCart_items),
			errorMsg = 'There was an error validating your cart.';

		if (s.mode === "JSON") {
			 $.get(s.JSONFile)
				.success(function () {
					$.getJSON(s.JSONFile, function (data) {
						var JSONData = data.products;
						if (simpleStore.verifyCheckoutData(checkoutData, JSONData, true)) {
        					simpleStore.checkout(s, checkoutData);
						} else {
							simpleStore.renderError(s, errorMsg);
						}
					})
                	.fail(function () { simpleStore.handleFailure(s, errorMsg); });
				})
                .fail(function () { simpleStore.handleFailure(s, errorMsg); });
		} else {
			var plugin = s.mode.toLowerCase();
			if(simpleStore.plugins[plugin]) {
				simpleStore.plugins[plugin].validate(checkoutData);
			}
		}
    },

    setProducts: function (products, s) {
        if (products.length > 0) {
            products.forEach(function (product, index) {
                product.id = index + 1;
                simpleStore.products.push(product);
            });
        }

        // Manually trigger on initial load
        $(window).trigger('hashchange');
    },

	setLayout: function (s) {
		// Set brand
        if (s.brand.match('^http://') || s.brand.match('^https://') || s.brand.match('^www.')) {
            $('.brand').html('<img src="' + s.brand + '" />');
        } else {
            $('.brand').html('<h5>' + s.brand + '</h5>');
        }

		// Set title
		$('title').html(s.brand);
	},

    generateCart: function (s) {
        var tmpl = $('#cart-template').html(),
            $tmpl = $(tmpl);
        s.cartContainer.html($tmpl);
    },

    generateStore: function () {

        var s = this.settings;

        // Set mode
        this.checkMode(s);

        // Check for hash changes
        $(window).on('hashchange', function () {
            simpleStore.render(window.location.hash, s);
        });

        // Set products based on mode
        switch (s.mode) {
            case 'JSON':
                this.initJSON(s);
                break;
            case 'Google':
				if(simpleStore.plugins.google) {
					simpleStore.plugins.google.init(function (products) {
						simpleStore.setProducts(products, s);
					});
				} else {
					var errorMsg = 'There was an error loading the Google plugin. Make sure it is installed properly.';
					simpleStore.renderError(s, errorMsg);
				}
                break;
            default:
                this.initJSON(s);
        }

        // Because simpleCart items appends to cart, set up only once
        this.generateCart(s);

        // Setup layout
        this.setLayout(s);

		// Handle Checkout
        $('.simpleStore_checkout').on('click', function (e) {
            e.preventDefault();
            simpleStore.validatePrices(s);
        });

        // View Cart
        $('.simpleStore_viewCart').on('click', function (e) {
            e.preventDefault();
            window.location = '#cart';
        });

        // Go to home on close
        $('.view_close').on('click', function (e) {
            e.preventDefault();
            window.location.hash = '';
        });
    },

    init: function (options) {
        if ($.isPlainObject(options)) {
            return this.extend(this.settings, options, function () {
                simpleStore.generateStore();
            });
        }
    }
};
