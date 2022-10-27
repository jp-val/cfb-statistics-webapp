export function generateToken(length) {

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>/?0123456789';

	let token = "";
    for (let i = 0; i < length; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    return token;
}