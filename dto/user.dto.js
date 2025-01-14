class UserDTO {
    constructor({ id, firstName, lastName, email, userType, libraryId }) {
        this.id = id;
        this.fullName = `${firstName} ${lastName}`;
        this.email = email;
        this.userType = userType;
        this.libraryId = libraryId;
    }
}

// Builder para construir UserDTO
class UserDTOBuilder {
    constructor() {
        this.user = {};
    }

    setId(id) {
        this.user.id = id;
        return this;
    }

    setFirstName(firstName) {
        this.user.firstName = firstName;
        return this;
    }

    setLastName(lastName) {
        this.user.lastName = lastName;
        return this;
    }

    setEmail(email) {
        this.user.email = email;
        return this;
    }

    setUserType(userType) {
        this.user.userType = userType;
        return this;
    }

    setLibraryId(libraryId) {
        this.user.libraryId = libraryId;
        return this;
    }

    build() {
        return new UserDTO(this.user);
    }
}

module.exports = { UserDTO, UserDTOBuilder };
