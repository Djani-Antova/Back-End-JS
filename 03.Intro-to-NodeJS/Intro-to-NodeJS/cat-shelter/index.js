const http = require('http');
const fs = require('fs/promises');
const querystring = require('querystring')


const catTemplate = (cat) => `
    <li>
        <img src="${cat.imageUrl}" alt="Black Cat">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>
    `;



const server = http.createServer(async (req, res) => {    
    let [pathname, qs] = req.url.split('?');
    let params = querystring.parse(qs)

    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    if (req.url == '/styles/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        let siteCss = await fs.readFile('./styles/site.css', 'utf-8')

        res.write(siteCss);       
    } else if (req.url == '/cats/add-cat') {
        let addCatPage = await fs.readFile('./view/addCat.html', 'utf-8');

        res.write(addCatPage);           
    }  else {
        let homePageHtml = await fs.readFile('./views/home.html', 'utf-8');
        let catsResult = await fs.readFile('./cats.json');
        let cats = JSON.parse(catsResult);

        const catsPageResult = cats
                .filter(x => params.name 
                    ? x.name.toLowerCase().startsWith(params.name.toLowerCase()) 
                    : true)
                .map(x => catTemplate(x)).join('');
        const homePageResult = homePageHtml.replace('{{cats}}', catsPageResult)
        res.write(homePageResult)            
    }
    res.end()

});
server.listen(5000, () => console.log('Server is listening on port 5000...'))

