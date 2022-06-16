class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  async search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = await this.query
      .find({ ...keyword })
      .clone()
      .exec();
    return this;
  }

  async filter() {
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
    this.query = this.query.find({
      categories: { $in: [queryCategory] },
      color: { $in: [queryColor] },
      size: { $in: [querySize] },
      price: filterProduct.price,
      ratings: filterProduct.rating,
    });

    return this;
  }

  async pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = await this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
