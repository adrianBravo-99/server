class LibraryDTO {
    constructor({ id, name, address, subscription, status }) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.subscription = subscription;
      this.status = status;
    }
  }
  
  class LibraryDTOBuilder {
    constructor() {
      this.library = {};
    }
  
    setId(id) {
      this.library.id = id;
      return this;
    }
  
    setName(name) {
      this.library.name = name;
      return this;
    }
  
    setAddress(address) {
      this.library.address = address;
      return this;
    }

    setSubscription(subscription) {
      this.library.subscription = subscription;
      return this;
    }

    setStatus(status) {
      this.library.status = status;
      return this;
    }
  
    build() {
      return new LibraryDTO(this.library);
    }
  }
  
  module.exports = { LibraryDTO, LibraryDTOBuilder };
  