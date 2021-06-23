export interface INote {
    id?: string;
    title?: string;
    content: any[];
    encryptedContent?: string;
    date?: string;
}

export interface IEncryptedNote {
    id?: string;
    encryptedTitle?: string;
    encryptedContent: string;
    date?: string;
}
