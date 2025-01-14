class LibraryDTO {
    constructor({ id, name, address }) {
      this.id = id;
      this.name = name;
      this.address = address;
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
  
    build() {
      return new LibraryDTO(this.library);
    }
  }
  
  module.exports = { LibraryDTO, LibraryDTOBuilder };
  