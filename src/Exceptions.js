class Exceptions {
    static ValueNotIntegerException() {
        return { name: "InvalidInteger", message: "Value is not a valid integer" };
    }
}

module.exports = Exceptions;