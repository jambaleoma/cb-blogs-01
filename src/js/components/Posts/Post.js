const userPostTemplate = document.createElement('template');
userPostTemplate.innerHTML = `
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button id="post-title" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
            </button>
            </h2>
            <div id="collapse1" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <p id="post-desc"></p>
            </div>
            </div>
        </div>
    </div>
    <div class="commentsTitle" style="text-align: -webkit-center;">
        <h2 id="user-post-title">Commenti </h2>
    </div>
    <style>
    .accordion-button:not(.collapsed)::after {
        visibility: hidden;
      }
    .commentsTitle {
        padding-top: 2em;
    }
    .accordion {
        margin-top: 2em;
    }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
`;

export class Post extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._shadowRoot.appendChild(userPostTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.setUserCardDetails();
    }

    setUserCardDetails() {
        const {
            id,
            title,
            desc
        } = JSON.parse(this.dataset.post);

        const postTitle = this._shadowRoot.getElementById('post-title');
        const postDesc = this._shadowRoot.getElementById('post-desc');

        postTitle.innerHTML = title;
        postDesc.innerHTML = desc;

        this.fillPostComments(id);
    }

    fillPostComments(postId) {
        const postCommentsSectionElement = document.createElement('div');
        postCommentsSectionElement.innerHTML = ``;
        
        this._shadowRoot.appendChild(postCommentsSectionElement); 

        const postCommentsElement = document.createElement('post-comments');

        postCommentsElement.appendChild(postCommentsSectionElement); 

        postCommentsElement.setAttribute('post-id', postId);

        this._shadowRoot.appendChild(postCommentsElement); 
    }

}