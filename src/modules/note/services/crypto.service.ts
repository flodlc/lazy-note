import CryptoJS from 'crypto-js';

function encryptJSON(json: any[], password: string) {
    const stringifiedContent = JSON.stringify(json);
    return encryptString(stringifiedContent, password);
}

function encryptString(cryptedString: string, password: string) {
    return CryptoJS.AES.encrypt(cryptedString, password).toString();
}

function decryptJSON(cryptedJSON: string, password: string) {
    try {
        const stringifiedContent = decryptString(cryptedJSON, password);
        return JSON.parse(stringifiedContent);
    } catch (e) {
        throw new Error('invalid args');
    }
}

function decryptString(cryptedString: string, password: string) {
    try {
        return CryptoJS.AES.decrypt(cryptedString, password).toString(
            CryptoJS.enc.Utf8
        );
    } catch (e) {
        throw new Error('invalid args');
    }
}

const cryptoService = {
    encryptJSON,
    decryptJSON,
    decryptString,
    encryptString,
};

export default cryptoService;
