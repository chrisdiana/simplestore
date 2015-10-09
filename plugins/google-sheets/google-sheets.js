/*
 * To use Google spreadsheet as your database, follow the steps below:
 * 1. Use the "DemoSpreadsheet.xlsx" as a starting point
 * 2. Create a new Google spreadsheet
 * 3. Set sharing permissions to either “Public” or set to “Anyone with link can view”
 * 4. Publish the sheet (File -> Publish to the web -> Publish)
 * 5. Add the spreadsheet ID to your 'config.js' ( spreadsheetID : "XXXXXXXXXXXXXXXXXXXXXXX" )
 */

simpleStore.plugins.google = (function() {

	var storeProducts = [];

	function getSpreadsheetData(s, callback) {

		var spreadsheetURL = "https://spreadsheets.google.com/feeds/list/" +
							s.spreadsheetID + "/od6/public/values?alt=json";

		$.getJSON(spreadsheetURL, callback)
			.done(function(data) {

				var productsData = data.feed.entry;

				// Build products
				$(productsData).each(function(i) {

					var options = this.gsx$options.$t;
					var setOptions = function(options) {
						var productOptions = [];
						if(options) {
							var opts = options.split(";").filter(function(el) {return el.length != 0});
							$(opts).each(function(i, option){
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
					// TODO: Get additional store settings from another sheet (page title, logo, etc)
					var product = {
						name : this.gsx$name.$t,
						price : this.gsx$price.$t,
						description : this.gsx$description.$t,
						options : setOptions(options),
						image : this.gsx$image.$t
					};
					storeProducts.push(product);
				});
				callback();
			})
			.fail(function(data){
				var errorMsg = 'Error loading spreadsheet data. Make sure the spreadsheet ID is correct.';
				setTimeout(function(){ simpleStore.renderError(s, errorMsg); }, 1000);
			});
	}

	return {
		init: function(callback) {
			getSpreadsheetData(simpleStore.settings, function(){
				callback(storeProducts);
			});
		}
	};
})();