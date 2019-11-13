module.exports = {
    validateUser
};

function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length < 6) {
        errors = [...errors, "Please include a username with at least 6 characters."];
    }

    if (!user.password || user.password.length < 8) {
        errors = [...errors, "Please include a password with at least 8 characters"];
    }

    return {
        isSuccessful: errors.length === 0,
        errors
    };
}