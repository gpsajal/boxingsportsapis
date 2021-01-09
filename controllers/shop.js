const Product = require("../models/product");
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([products, fieldData])=>{
        res.render("shop/product-list", {
          path:"/products",
          prods: products,
          pageTitle:"Products",
          hasProducts: products.length > 0 ? true:false,
      });
    })
    .catch((error)=>{
      console.log("getProducts catch", error);
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(([prodInfo, fieldData])=>{
      if(typeof prodInfo[0] !== 'undefined'){
          res.render("shop/product-detail", {
              path:"/products",
              product:prodInfo[0],
              pageTitle:prodInfo[0].title + "  Product",
              extra:""
          });
      }
      else{
        res.redirect('/');
      }
    }).catch((err)=>{
      console.log(err);
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([products, fieldData])=>{
        res.render("shop/index", {
          path:"/",
          prods: products,
          pageTitle:"Shop Home",
          hasProducts: products.length > 0 ? true:false
      });
    })
    .catch((err)=>{
      console.log("getIndex catch", err);
    });
};



exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
  };
  
  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    });
  };
  
  exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };
  