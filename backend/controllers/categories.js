const request = require('request');
const fs = require('fs/promises');
let options = { json: true };

exports.fetchData = async (req, res) => {
    const url = 'http://antisoft.netwatchlb.com/JSon.aspx?type=KBProduct'
    request(url, options, (error, res, body) => {
        if (error) {
            return console.log(error)
        };

        if (!error && res.statusCode == 200) {
            console.log(body);
            // do something with JSON, using the 'body' variable
        };
    })
}

exports.getCategories = async (req, res, next) => {
    try {
        //fetch data from json file and parse it into javascript object
        const json = await fs.readFile('/home/hadi/Desktop/kheirwbarake/backend/Categories.json', { encoding: 'utf8' })
        const data = JSON.parse(json).ItemFile


        // create a set of categories from data
        const categories = new Set()
        data.forEach(({ CategoryName }) => { categories.add(CategoryName); console.log(CategoryName) })

        const payload = [...categories].map((category, i) => {
            return {
                id: i,
                name: category.trim(),
                slug: category.trim().replace(' ', '-'),
                products: data.filter(({ CategoryName }) => { return CategoryName === category })
            }
        })

        console.log(categories)
        res.status(200).send(payload)
    }
    catch (err) {
        next(err)
    }




}
