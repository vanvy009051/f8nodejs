const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');
const methodOverride = require('method-override');
const db = require('./config/db');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(morgan('combined'));

app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons =  { 
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending'
            };
            const types =  { 
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            };

            const type = types[sortType];
            const icon = icons[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
              <span class="${icon}"></span>
            </a>`;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
