(function (window) {
    function myLibrary() {

        var catalog = createRandomCatalog(100);


        return {
            searchProductById: searchProductById,
            searchProductsByType: searchProductsByType,
            searchProductsByPrice: searchProductsByPrice,
            searchAllProducts: searchAllProducts,
        }

        function searchProductById(id) {
            var promise = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    for (var i = 0; i < catalog.length; i++) {
                        if (catalog[i].id == id) {
                            resolve({ id: catalog[i].id, price: catalog[i].price, type: catalog[i].type });
                        }
                    }
                    reject("Invalid ID: " + id);
                }, 1000);
            })
            return promise;
        }

        function searchProductsByType(type) {
            var promise = new Promise(function (resolve, reject) {
                var i = 0;
                var typeArray = [];
                var possibleTypes = ['Electronics', 'Food', 'Book', 'Clothing'];
                if (!possibleTypes.includes(type)) {
                    reject("Invalid type: " + type);
                }
                else {
                    setTimeout(function () {
                        while (i < catalog.length) {
                            if (catalog[i].type == type) {
                                typeArray.push({ id: catalog[i].id, price: catalog[i].price, type: catalog[i].type });
                            }
                            i++;
                        }
                        resolve(typeArray);
                    }, 1000);
                }

            })
            return promise;
        }

        function searchProductsByPrice(price, difference) {
            var promise = new Promise(function (resolve, reject) {
                var i = 0;
                var priceArray = [];
                if (!isFinite(price)) {
                    reject("Invalid price: " + price);
                }
                else {
                    setTimeout(function () {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < difference) {
                                priceArray.push({ id: catalog[i].id, type: catalog[i].type, price: catalog[i].price });
                            }
                            i++;
                        }
                        resolve(priceArray);
                    }, 1000);
                }
            })
            return promise;
        }

        function searchAllProducts() {
            var promise = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(catalog);
                }, 1000);
            })
            return promise;
        }

        function createRandomProduct() {
            var typeArray = ['Electronics', 'Food', 'Book', 'Clothing'];
            var type = typeArray[Math.floor(Math.random() * 4)];
            var price = (Math.random() * 500).toFixed(2);
            var valid = Math.random() > .5 ? true : false;

            return { price: price, type: type };

        }

        function createRandomCatalog(num) {
            catalog = [];
            for (var i = 1; i <= num; i++) {
                var obj = createRandomProduct();
                catalog.push({ id: i, price: obj.price, type: obj.type });
            }
            return catalog;
        }

    }

    if (typeof (window.api === 'undefined')) {
        window.api = myLibrary();
    }

})(window);