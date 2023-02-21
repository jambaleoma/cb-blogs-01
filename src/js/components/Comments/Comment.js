const userPostTemplate = document.createElement('template');
userPostTemplate.innerHTML = `
    <div class="card" style="width: 17rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                Email: <span id="comment-email"></span>
            </li>
            <li class="list-group-item">
                Titolo: <span id="comment-title""></span>
            </li>
            <li class="list-group-item">
                Commento: <span id="comment-desc"></span>
            </li>
        </ul>
    </div>
    <style>
    </style>
    <link rel="stylesheet" href="./src/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
`;

export class Comment extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(userPostTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.setCommentDetails();
    }

    setCommentDetails() {
        const {
            email,
            title,
            desc
        } = JSON.parse(this.dataset.comment);
        
        const commentEmail = this._shadowRoot.getElementById('comment-email');
        const commentTitle = this._shadowRoot.getElementById('comment-title');
        const commentDesc = this._shadowRoot.getElementById('comment-desc');

        commentEmail.innerHTML = email;
        commentTitle.innerHTML = title;
        commentDesc.innerHTML = desc;
    }
}