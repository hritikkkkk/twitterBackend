class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }
  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }

  async getAll() {
    const response = await this.model.find({});
    return response;
  }
  async getOne(id) {
    const response = await this.model.findById(id);
    return response;
  }

  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return response;
  }
}

module.exports = CrudRepository;
