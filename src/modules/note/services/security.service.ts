import cryptoService from './crypto.service';
const randomstring = require('randomstring');

const checkPassword = (password: string): boolean => {
    const testSequence = localStorage.getItem('check_sequence');
    const encryptedTestSequence = localStorage.getItem(
        'encrypted_check_sequence'
    );

    if (!testSequence || !encryptedTestSequence) return false;

    return (
        cryptoService.decryptString(encryptedTestSequence, password) ===
        testSequence
    );
};

const hasSession = () => {
    const testSequence = localStorage.getItem('check_sequence');
    const encryptedTestSequence = localStorage.getItem(
        'encrypted_check_sequence'
    );

    return Boolean(testSequence && encryptedTestSequence);
};

const saveCheckSequence = (password: string) => {
    const checkSequence = randomstring.generate(30);
    localStorage.setItem('check_sequence', checkSequence);
    localStorage.setItem(
        'encrypted_check_sequence',
        cryptoService.encryptString(checkSequence, password)
    );
};

const clearSession = () => {
    localStorage.clear();
};

const securityService = {
    checkPassword,
    hasSession,
    saveCheckSequence,
    clearSession,
};

export default securityService;
