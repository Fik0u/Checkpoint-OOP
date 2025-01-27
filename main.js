// Test
// alert ("Hello, World!");

// Création des blueprints pour les produits et les éléments du panier
class Product {
    constructor (ID, Name, Price, Image){
        this.ID = ID;
        this.Name = Name;
        this.Price = Price;
        this.Image = Image;
    }
}

class ShoppingCartItem {
    constructor (Product, Quantity){
        this.Product = Product;
        this.Quantity = Quantity;
        this.liked = false;
    }

// Ajout de méthode pour calculer le prix total de chaque élément du panier
    TotalPrice(){
        return this.Product.Price * this.Quantity;
    }

    ToggleLike(){
        this.liked = !this.liked;
    }
}
// Cette classe permet de gérer les éléments du panier et comprendra les différentes méthodes pour ajouter, supprimer, modifier la quantité et liker les produits 
class Cart {
    constructor (){
        this.Items = [];
    }

    AddProduct(Product, Quantity){
    const item = this.Items.find((item) => item.Product.ID === Product.ID);
        item ?
        item.Quantity += Quantity
        : this.Items.push(new ShoppingCartItem(Product, Quantity));
        this.DisplayCart();
    }

    UpdateQuantity(ProductID, Change){
    const item = this.Items.find((item) => item.Product.ID === ProductID);
        item ?
        item.Quantity = Math.max(1, item.Quantity + Change) : null;
        this.DisplayCart();
        
    }

    RemoveProduct(ProductID){
        this.Items = this.Items.filter((item) => item.Product.ID !== ProductID);
        this.DisplayCart();
    }

    ToggleLike(ProductID){
    const item = this.Items.find((item) => item.Product.ID === ProductID);
        (item) ?
        item.ToggleLike() : null; 
        this.DisplayCart();
    }

// La fonction reduce() permet de calculer le prix total du panier
    TotalCartPrice(){
        return this.Items.reduce((total, item) => total + item.TotalPrice(), 0);
    }

// La méthode DisplayCart() permet de créer les éléments du panier et de les afficher dans l'HTML
    DisplayCart() {
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = this.Items.map((item) => 
    `<div class="card">
        <img src="${item.Product.Image}" class="card-img-top" alt="${item.Product.Name}">
        
        <div class="card-body">
            <h5>${item.Product.Name}</h5>
            <p>Price: $${item.Product.Price}</p>
            <span>Quantity: ${item.Quantity}</span>
        <div class="card-buttons">
            <button onclick="cart.UpdateQuantity(${item.Product.ID}, 1)">+</button>
            <button onclick="cart.UpdateQuantity(${item.Product.ID}, -1)">-</button>
            <button onclick="cart.RemoveProduct(${item.Product.ID})">🗑️</button>
            <button onclick="cart.ToggleLike(${item.Product.ID})">${item.liked ? "❤️" : "🤍"}</button>
        </div>
        </div>
    </div>`).join("");

    cartTotal.innerHTML = `$${this.TotalCartPrice()}`;     
    }
}

// Création d'instances de produits à partir de nos classes et ajout de ces produits au panier
const cart = new Cart();
const Products = [
    new Product (1, "Jacket", 100,"./assets/jacket.jpg"),
    new Product (2, "Pants", 20, "./assets/pant.png"),
    new Product (3,"Sneakers", 50, "./assets/sneakers.png"),
];

Products.forEach((Product) => cart.AddProduct(Product, 1));