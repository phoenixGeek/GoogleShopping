const express = require('express')
const cors = require('cors');
const axios = require('axios')

const app = express()
const port = 8080
const { getShoppingResult, getDetailProducts, getProductsPagination, getGoogleProducts, getSaleProducts, getGoogleProductsPagination, getSaleProductsPagination } = require('./util')
// const GSR = require('google-search-results-nodejs')
// const client = new GSR.GoogleSearch("785b13dff993a94ced03ceae610a9063b9692bb5a5d9f0f42a43a03b797890e7");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example App listening at http://localhost:${port}`)
})

app.post('/productlist', async (req, res) => {

    const { searchkey, page } = req.body;

    try {
        const { products, pagination, spelling_fix } = await getShoppingResult(searchkey);
        const { googleProducts } = await getGoogleProducts(searchkey);
        const { saleProducts } = await getSaleProducts(searchkey);

        const pPromises = products.filter(p => p.product_id).map((p) => (getDetailProducts(p.product_id)));
        const detailsList = await Promise.all(pPromises);
        const detailed = products.map(p => {
            const { product_id } = p

            if (!product_id) {
                return p;
            }

            const { data } = detailsList.find((dp) => dp.productId === product_id);
            return { ...p, detail: data }
        })

        /*  Another way using for loop...

            const detailed = [];
            for (const p of products) {
                const { product_id } = p;

                if (!product_id) {
                    detailed.push(p);
                } else {
                    const detail = await getDetailProducts(product_id);
                    detailed.push({ ...p, detail })
                }
            }

        */

        // const detailed = await products.reduce(async (acc, product) => {
        //     const { product_id } = product;

        //     if (!product_id) {
        //         const detailedAcc = await acc;
        //         return Promise.resolve([...detailedAcc, product]);
        //     }
        //     const detailedAcc = await acc;
        //     const detail = await getDetailProducts(product_id);
        //     return Promise.resolve([...detailedAcc, { ...product, detail }]);
        // }, Promise.resolve([]));

        res.status(200).json({ products: detailed, pagination, spelling_fix, googleProducts: googleProducts, saleProducts: saleProducts }).end();
    } catch (err) {
        res.status(500).json({ error: 'network error' }).end();
    }

});

app.post('/pagination', async (req, res) => {

    const { searchkey, pageNumber } = req.body;

    try {
        const { products, pagination, spelling_fix } = await getProductsPagination(searchkey, pageNumber);
        const { googleProducts } = await getGoogleProductsPagination(searchkey, pageNumber);
        const { saleProducts } = await getSaleProductsPagination(searchkey, pageNumber);

        const pPromises = products.filter(p => p.product_id).map((p) => (getDetailProducts(p.product_id)));
        const detailsList = await Promise.all(pPromises);
        const detailed = products.map(p => {
            const { product_id } = p

            if (!product_id) {
                return p;
            }

            const { data } = detailsList.find((dp) => dp.productId === product_id);
            return { ...p, detail: data }
        })

        res.status(200).json({ products: detailed, pagination, spelling_fix, googleProducts: googleProducts, saleProducts: saleProducts }).end();
    } catch (err) {
        res.status(500).json({ error: 'network error' }).end();
    }

});

// app.post('/productlistlow', async (req, res) => {
//     const products = [];
//     client.json({
//         q: req.body.searchkey,
//         tbm: "shop",
//         hl: "en",
//         gl: "us",
//         location: "Austin, TX"
//     }, (result) => {

//         result.shopping_results.map((product, index) => {

//             if (product.product_id) {

//                 const params = {
//                     engine: "google_product",
//                     product_id: product.product_id
//                 };

//                 const callback = function (data) {
//                     product['detail'] = data;
//                     products.push(product);
//                 }

//                 client.json(params, callback);

//             } else {
//                 products.push(product)
//             }
//         })

//         setTimeout(() => {
//             res.send(products)
//         }, 1000);
//     })
// });


axios.get('https://api.myip.com/')
    .then(function (response) {
        console.log("ip info: ", response.data)
    })
    .catch(function (error) {
        console.log("error: ", error)
    })

