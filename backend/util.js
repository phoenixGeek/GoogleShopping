const GSR = require('google-search-results-nodejs')
const client = new GSR.GoogleSearch("785b13dff993a94ced03ceae610a9063b9692bb5a5d9f0f42a43a03b797890e7");

const getShoppingResult = async (searchKey) => {
    return new Promise((resolve, reject) => {
        client.json({
            q: searchKey + " nearby",
            tbm: "shop",
            hl: "en",
            gl: "us",
            num: 25
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ products: result.shopping_results, pagination: result.pagination, spelling_fix: result.search_information });
        })
    });
};

const getGoogleProducts = async (searchKey) => {
    return new Promise((resolve, reject) => {
        client.json({
            q: searchKey + " online",
            tbm: "shop",
            hl: "en",
            gl: "us",
            num: 25
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ googleProducts: result.shopping_results });
        })
    });
}

const getSaleProducts = async (searchKey) => {
    return new Promise((resolve, reject) => {
        client.json({
            q: searchKey + " sale",
            tbm: "shop",
            hl: "en",
            gl: "us",
            num: 25
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ saleProducts: result.shopping_results });
        })
    });
}

const getDetailProducts = (productId) => {
    return new Promise((resolve, reject) => {
        client.json({
            engine: "google_product",
            product_id: productId,
        }, (data, err) => {
            if (err) {
                return reject(err);
            }

            return resolve({ data, productId });
        })
    })
}

const getProductsPagination = async (searchkey, pageNumber) => {

    return new Promise((resolve, reject) => {
        client.json({
            q: searchkey,
            start: pageNumber * 25,
            num: 25,
            tbm: "shop",
            hl: "en",
            gl: "us",
            location: "United States",
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ products: result.shopping_results, pagination: result.pagination, spelling_fix: result.search_information });
        })
    })
}

const getGoogleProductsPagination = async (searchkey, pageNumber) => {

    return new Promise((resolve, reject) => {
        client.json({
            q: searchkey + ' online',
            start: pageNumber * 25,
            num: 25,
            tbm: "shop",
            hl: "en",
            gl: "us",
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ googleProducts: result.shopping_results });
        })
    })
}

const getSaleProductsPagination = async (searchkey, pageNumber) => {

    return new Promise((resolve, reject) => {
        client.json({
            q: searchkey + ' sale',
            start: pageNumber * 25,
            num: 25,
            tbm: "shop",
            hl: "en",
            gl: "us",
        }, (result, err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ saleProducts: result.shopping_results });
        })
    })
}

module.exports = { getShoppingResult, getDetailProducts, getProductsPagination, getGoogleProducts, getSaleProducts, getGoogleProductsPagination, getSaleProductsPagination }