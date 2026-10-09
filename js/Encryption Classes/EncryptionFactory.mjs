class EncryptionFactory
{
    constructor()
    {
        this.encryptors = [];
    }

    get hasEncryptors()
    {
        return !!this.encryptors.length;
    }

    registerEncryptor(encryptor)
    {
        this.encryptors.push(encryptor);
    }

    encrypt(string)
    {
        for(let encryptor of this.encryptors)
        {
            string = encryptor.encrypt(string);
        }
        return string;
    }

    decrypt(string)
    {
        for(let i = this.encryptors.length - 1; i >= 0; i--)
        {
            string = this.encryptors[i].decrypt(string);
        }
        return string;
    }

    static withEncryptors(encryptors)
    {
        const factory = new EncryptionFactory();
        for(let encryptor of encryptors)
        {
            factory.registerEncryptor(encryptor);
        }
        return factory;
    }
}

export default EncryptionFactory;