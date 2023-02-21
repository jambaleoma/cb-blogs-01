const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
<div class="container" style="text-align: -webkit-center;">
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col">
            <div class="card" style="width: 20rem;">
            <img src="src/assets/img/user.webp" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title" id="user-card-title"></h5>
                <p class="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    Username: <span id="user-card-username"></span>
                </li>
                <li class="list-group-item">
                    Email: <span id="user-card-email"></span>
                </li>
            </ul>
        </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Indirizzo</h5>
                    <p id="user-card-address" class="map-card-text"></p>
                    <div id="map-card"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="postTitle">
        <h2 id="user-post-title">Post di </h2>
    </div>
</div>
<style>
    .card-img-top {
        width: 50% !important;
        align-self: center !important;
        margin: 1em;
    }
    .card-title {
        text-align: -webkit-center !important;
    }
    .postTitle {
        padding-top: 2em;
    }
    #map-card {
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 300px;
        height: 300px;
    }
</style>
<script src="./../../../../src/js/google_API/lit-google-map.bundle.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
`;

export class PersonalCard extends HTMLElement {
    constructor() {
        super();

        const qs = window.location.search;
        const linkPrms = new URLSearchParams(qs);
        const id = linkPrms.get('id');
        this.checkId = undefined;
       
        this.checkId = id;
        this.sroot = this.attachShadow({
            mode: 'open'
        });
        this.sroot.appendChild(cardTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.getPersonalData();
    }

    getPersonalData() {
        return new Promise((res, rej) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${this.checkId}`)
                .then(data => data.json())
                .then((resp) => {
                    this.initPersonalUserData(resp);
                    res();
                })
                .catch((error) => rej(error));
        })
    }

    initPersonalUserData(userDetails) {

        const userCardTitle = this.sroot.getElementById('user-card-title');
        const userCardUserName = this.sroot.getElementById('user-card-username');
        const userCardEmail = this.sroot.getElementById('user-card-email');
        const userCardAdddress = this.sroot.getElementById('user-card-address');
        
        userCardTitle.innerHTML = userDetails.name;
        userCardUserName.innerHTML = userDetails.username;
        userCardEmail.innerHTML = userDetails.email;
        userCardAdddress.innerHTML = userDetails.address.suite + ' ' + userDetails.address.street + ' ' + userDetails.address.city + ' ' + userDetails.address.zipcode;
        
        const mapCard = this.sroot.getElementById('map-card');

        mapCard.innerHTML =
        `<lit-google-map api-key="" zoom="2" center-latitude="${userDetails.address.geo.lat}" center-longitude="${userDetails.address.geo.lng}">

            <lit-google-map-marker slot="markers" latitude="${userDetails.address.geo.lat}" longitude="${userDetails.address.geo.lng}">
            </lit-google-map-marker>
    
        </lit-google-map>`;

        // ADD POSTS FOR THE USER
        this.addUserPosts(userDetails.id, userDetails.name);

    }

    addUserPosts(userId, name) {
        const userPostsTitle = this.sroot.getElementById('user-post-title');
        userPostsTitle.append(name)
        const userPostsElement = document.createElement('user-posts');
        userPostsElement.setAttribute('user-id', userId);
        this.sroot.appendChild(userPostsElement);
    }
}