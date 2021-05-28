export default class ApiService {
    constructor() {

    }

    fetchImages() {
        const options = {
            headers: {
                Autorization: '21833182-c50b5ade5b44b638c37fcd74e',
            },
        };
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;

        fetch(url, options)
        .then(r=>r.json)
        .then(console.log);
    };

