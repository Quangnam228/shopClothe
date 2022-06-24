class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const queryCategory = this.queryStr.category;
    const querySize = this.queryStr.size;
    const queryColor = this.queryStr.color;

    const removeFields = [
      "keyword",
      "page",
      "limit",
      "category",
      "size",
      "color",
    ];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const filterProduct = JSON.parse(queryStr);

    if (querySize === "" && queryColor === "" && queryCategory === "") {
      this.query = this.query
        .find(JSON.parse(queryStr))
        .sort({ createdAt: -1 });
    } else if (querySize === "" && queryColor !== "" && queryCategory === "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          inventory: { $elemMatch: { color: queryColor } },
        })
        .sort({ createdAt: -1 });
    } else if (queryColor === "" && querySize !== "" && queryCategory === "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          inventory: { $elemMatch: { size: querySize } },
        })
        .sort({ createdAt: -1 });
    } else if (queryColor === "" && querySize === "" && queryCategory !== "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          categories: { $in: [queryCategory] },
        })
        .sort({ createdAt: -1 });
    } else if (queryColor === "" && querySize !== "" && queryCategory !== "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          categories: { $in: [queryCategory] },
          inventory: { $elemMatch: { size: querySize } },
        })
        .sort({ createdAt: -1 });
    } else if (queryColor !== "" && querySize === "" && queryCategory !== "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          categories: { $in: [queryCategory] },
          inventory: { $elemMatch: { color: queryColor } },
        })
        .sort({ createdAt: -1 });
    } else if (queryColor !== "" && querySize !== "" && queryCategory === "") {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          inventory: { $elemMatch: { size: querySize, color: queryColor } },
        })
        .sort({ createdAt: -1 });
    } else {
      this.query = this.query
        .find({
          price: filterProduct.price,
          ratings: filterProduct.ratings,
          categories: { $in: [queryCategory] },
          inventory: {
            $elemMatch: { size: querySize, color: queryColor },
          },
        })
        .sort({ createdAt: -1 });
    }

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
