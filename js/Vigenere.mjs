const encryptable='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789.,;:!?()[]{}<>@#$%^&*+-=_~|/\\\'"';

class Vigenere
{
    #key;
    #instantiated;

    constructor()
    {
        this.#instantiated = false;
    }

    setKey(key)
    {
        this.#key = key;
        this.#instantiated = true;
    }

    encrypt(plaintext)
    {
        if(!this.#instantiated)
        {
            throw new Error("Vigenere cipher not instantiated with a key.");
        }
        let ciphertext = '';

        for(let i = 0; i < plaintext.length; i++)
        {
            let char = plaintext.charAt(i);
            if(!encryptable.includes(char))
            {
                ciphertext += char;
            }

            let keyChar = this.#key.charAt(i % this.#key.length);
            let charIndex = encryptable.indexOf(char);
            let keyIndex = encryptable.indexOf(keyChar);
            let encryptedIndex = (charIndex + keyIndex) % encryptable.length;
            ciphertext += encryptable.charAt(encryptedIndex);
        }
        return ciphertext;
    }

    decrypt(ciphertext)
    {
        if(!this.#instantiated)
        {
            throw new Error("Vigenere cipher not instantiated with a key.");
        }
        let plaintext = '';

        for(let i = 0; i < ciphertext.length; i++)
        {
            let char = ciphertext.charAt(i);
            if(!encryptable.includes(char))
            {
                plaintext += char;
            }

            let keyChar = this.#key.charAt(i % this.#key.length);
            let charIndex = encryptable.indexOf(char);
            let keyIndex = encryptable.indexOf(keyChar);
            let decryptedIndex = (charIndex - keyIndex + encryptable.length) % encryptable.length;
            plaintext += encryptable.charAt(decryptedIndex);
        }
        return plaintext;
    }

    static withKey(key)
    {
        const vigenere = new Vigenere();
        vigenere.setKey(key);
        return vigenere;
    }

    static encryptWithKey(plaintext, key)
    {
        const vigenere = new Vigenere();
        vigenere.setKey(key);
        return vigenere.encrypt(plaintext);
    }


}

export default Vigenere;