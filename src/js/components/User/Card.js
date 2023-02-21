const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
<div class="card" style="width: 18rem;">
    <img src="src/assets/img/user.webp" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title" id="user-card-title"></h5>
        <div class="card-header">
            <div class="footer-card">
                <a href='' id="personalPageLink" class="btn btn-primary">Dettaglio</a>
            </div>
        </div>
    </div>
</div>
<style>
    .card-img-top {
        margin: 1em;
        width: 50% !important;
        align-self: center !important;
    }
    .card-title {
        text-align: -webkit-center !important;
    }
    .footer-card {
        text-align: -webkit-center !important;
    }
</style>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
`;

export class Card extends HTMLElement {
    constructor() {
        super();

        this.sroot = this.attachShadow({
            mode: 'open'
        });
        this.sroot.appendChild(cardTemplate.content.cloneNode(true));
    }
    
    connectedCallback() {
        this.setUserCard();
    }

    setUserCard() {
        const { id, name } = JSON.parse(this.dataset.userCard);
        
        const userCardTitle = this.sroot.getElementById('user-card-title');
        const personalPageLink = this.sroot.getElementById('personalPageLink');
        const userCardPersonalLink = `/personal.html?id=${id}`;
        personalPageLink.href = userCardPersonalLink;
        
        
        userCardTitle.innerHTML = name;
    }

}
