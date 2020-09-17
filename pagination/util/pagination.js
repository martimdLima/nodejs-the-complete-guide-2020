const Product = require("../models/product");
const { errHandling } = require("./errorhandling");
const ITEMS_PER_PAGE = 2;

/* exports.paginateItems = (req, res, next, viewRender, pageTitle, pagePath) => {
    
    const page = +req.query.page || 1;

    let totalItems;
  
    Product.find()
      .countDocuments()
      .then((numProducts) => {
        totalItems = numProducts;
        return Product.find()
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE);
      })
      .then((products) => {
        res.render(viewRender, {
          prods: products,
          pageTitle: pageTitle,
          path: pagePath,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        });
      })
      .catch((err) => {
        errHandling(err);
      });
}; */

exports.paginateItems = (viewRender, pageTitle, pagePath) => {
  return (req, res, next) => {
    const page = +req.query.page || 1;

    let totalItems;

    Product.find()
      .countDocuments()
      .then((numProducts) => {
        totalItems = numProducts;
        return Product.find()
          .skip((page - 1) * ITEMS_PER_PAGE)
          .limit(ITEMS_PER_PAGE);
      })
      .then((products) => {
        res.render(viewRender, {
          prods: products,
          pageTitle: pageTitle,
          path: pagePath,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalItems,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        });
      })
      .catch((err) => {
        errHandling(err);
      });
  };
};
