const baseURL = 'https://dummyjson.com/products'

const productsAPI = {

    getStartingProductsData: (limit = 10) => { //получение данных о продуктах для начального отображения 
        return (
            fetch(`${baseURL}?limit=${limit}&select=title,price`) // выбираем title и price,  так как только они используются для сортировки 
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json()
                    }
                    else {
                        throw new Error(response.status);
                    }
                })
                .then(data => data.products)
                .catch((e) => {
                    console.log('Error: ' + e.message);
                })
        )
    },

    getProductForId: (id) => { // получение данных о продукте по id
        return (
            fetch(`${baseURL}/${id}`)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json()
                    }
                    else {
                        throw new Error(response.status);
                    }
                })
                .catch((e) => {
                    console.log('Error: ' + e.message);
                })
        )
    },
}

export default productsAPI;