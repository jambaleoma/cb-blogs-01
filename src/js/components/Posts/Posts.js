export class Posts extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.getData();
    }

    get userId() {
        return this.getAttribute('user-id');
    }

    getData() {
        return new Promise((res, rej) => {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(data => data.json())
            .then((json) => {
                const posts = json.filter(post => post.userId.toString() === this.userId.toString());
                this.initPosts(posts);
                res();
            })
            .catch((error) => rej(error));
        })
    }

    initPosts(posts) {
        posts.forEach(post => {            
            const postElement = document.createElement('user-post');
            const postDetails = {
                id: post.id,
                title: post.title,
                desc: post.body              
            };
            postElement.setAttribute('data-post', JSON.stringify(postDetails));
            this.appendChild(postElement);
        });
    }

}