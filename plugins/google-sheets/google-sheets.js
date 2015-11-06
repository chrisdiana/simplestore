/*
 * SimpleStore Google Sheets Plugin
 * To use Google spreadsheet as your database, follow the steps below:
 * 1. Use the "DemoSpreadsheet.xlsx" as a starting point
 * 2. Create a new Google spreadsheet
 * 3. Set sharing permissions to either “Public” or set to “Anyone with link can view”
 * 4. Publish the sheet (File -> Publish to the web -> Publish)
 * 5. Add the spreadsheet ID to your 'config.js' ( spreadsheetID : "XXXXXXXXXXXXXXXXXXXXXXX" )
 */

simpleStore.plugins.google = (function() {

	var storeProducts = verifyProducts = [];

	function getSpreadsheetData(s, verify, callback) {

		verify = typeof verify !== 'undefined' ? verify : false;

		var hostname = "https://spreadsheets.google.com";
		var format = "json";
		var spreadsheetURL = hostname + "/feeds/worksheets/" + s.spreadsheetID + "/public/full?alt=" + format;
		var mainsheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/od6/public/values?alt=" + format;
		var settingsSheetName = "Settings";

		function getSiteSettingsSheetKey (url, callback) {
			// Need to do this because od6 is default Google Sheet ID
			var id = '';

			$.getJSON(url)
				.done(function(data) {

					var sheets = data.feed.entry;

					$(sheets).each(function(i, sheet) {
						var title = sheet.title.$t;
						if(title == settingsSheetName) {
							id = sheet.id.$t;
						}
					});
					callback(id);
				});
		}

		function loadSiteSettings (id) {
			var sheetID = id.substr(id.lastIndexOf('/') + 1);
			var settingsSheetURL = hostname + "/feeds/list/" + s.spreadsheetID + "/" + sheetID + "/public/values?alt=" + format;

			$.getJSON(settingsSheetURL)
				.done(function(data) {
					var data = data.feed.entry;
					var s = simpleStore.settings;

					if(data[0]) {

						var siteName = data[0].gsx$sitenametextorimagelink.$t;
						var columns = data[0].gsx$columns123.$t;

						if (siteName) {
							s.brand = siteName;
						}
						if (columns) {
							s.numColumns = columns;
						}

						simpleStore.setLayout(s);
					}
				});
		}

		// Get Site Settings Sheet data
		getSiteSettingsSheetKey(spreadsheetURL, loadSiteSettings);

		// Get Main Sheet Products data
		$.getJSON(mainsheetURL)
			.done(function(data) {

				var productsData = data.feed.entry;

				// Build products
				$(productsData).each(function(i) {

					var options = this.gsx$options.$t;
					var setOptions = function(options) {
						var productOptions = [];
						if(options) {
							var opts = options.split(";").filter(function(el) {return el.length != 0});
							$(opts).each(function(i, option) {
								var opt = option.trim().split(":"),
									key = opt[0],
									val = opt[1],
									optObj = {};

								optObj[key] = val;
								productOptions.push(optObj);
							});
						}
						return productOptions;
					};

					// Get product values
					var product = {
						name : this.gsx$name.$t,
						price : this.gsx$price.$t,
						description : this.gsx$description.$t,
						options : setOptions(options),
						image : this.gsx$image.$t
					};

					if (verify) {
						verifyProducts.push(product);
					} else {
						storeProducts.push(product);
					}
				});
				callback();
			})
			.fail(function(data){
				if (verify) {
					var errorMsg = 'There was an error validating your cart.';
				} else {
					var errorMsg = 'Error loading spreadsheet data. Make sure the spreadsheet ID is correct.';
				}
				setTimeout(function(){ simpleStore.renderError(s, errorMsg); }, 1000);
			});
	}

	function validatePrices(s, checkoutData) {
		verifyProducts = [];

		getSpreadsheetData(s, true, function() {
			if(simpleStore.verifyCheckoutData(checkoutData, verifyProducts, true)) {
        		simpleStore.checkout();
			} else {
				var errorMsg = 'There was an error validating your cart.';
				simpleStore.renderError(s, errorMsg);
			}
		});
	}

	return {
		init: function(callback) {
			var s = simpleStore.settings;

			// Clears out brand to allow for spreadsheet site name
			s.brand = "";
			simpleStore.setLayout(s);

			getSpreadsheetData(s, false, function(){
				callback(storeProducts);
			});
		},
		validate: function(checkoutData) {
			validatePrices(simpleStore.settings, checkoutData);
		}
	};
})();
