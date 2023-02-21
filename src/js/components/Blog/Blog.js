export class Blog extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('blog-component');
        this.getUserData();
    }

    getUserData() {
        return new Promise((res, rej) => {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(data => data.json())
            .then((json) => {
                this.createBlogTemplate();
                this.appendUserCards(json);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    createBlogTemplate() {
    }

    appendUserCards(data) {
        data.forEach(user => {
            const userCardElement = document.createElement('user-card');
            const userDetails = {
                id: user.id,
                name: user.name
            };
            userCardElement.setAttribute('data-user-card', JSON.stringify(userDetails));
            this.appendChild(userCardElement);
        });
    }

}