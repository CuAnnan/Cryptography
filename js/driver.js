import Vigenere from './Encryption Classes/Vigenere.mjs';
import TranspositionCypher  from "./Encryption Classes/TranspositionCypher.mjs";
import EncryptionFactory from './Encryption Classes/EncryptionFactory.mjs';

const plaintext = "Hello, World!";

const factory = EncryptionFactory.withEncryptors([
    new TranspositionCypher(),
    Vigenere.withKey("pandora")
]);


const factory2 = EncryptionFactory.withEncryptors([
    Vigenere.withKey("pandora"),
    new TranspositionCypher()
]);

let factoryCiphertext = factory.encrypt(plaintext);
let factoryDecryptedText = factory.decrypt(factoryCiphertext);
let factory2Ciphertext = factory2.encrypt(plaintext);

console.log(`Plaintext:    ${plaintext}`);
console.log(`Ciphertext:   ${factoryCiphertext}`);
console.log(`Ciphertext 2: ${factory2Ciphertext}`);