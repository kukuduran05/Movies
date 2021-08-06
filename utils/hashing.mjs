import bcrypt from "bcrypt";

export async function hash(password) {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);
    return pass;
}

export async function match(loginPass, DBPass) {
    let data = await bcrypt.compare(loginPass, DBPass);
    return data;
}