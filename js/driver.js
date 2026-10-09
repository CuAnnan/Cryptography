import Vigenere from './Vigenere.mjs';
import TranspositionCypher  from "./TranspositionCypher.mjs";
import EncryptionFactory from './EncryptionFactory.mjs';

const plaintext = "Hello, World!";
console.log("Plaintext:  " + plaintext);

const factory = EncryptionFactory.withEncryptors([
    new TranspositionCypher(),
    Vigenere.withKey("pandora")
]);

const vigenere = Vigenere.withKey("pandora");
const transposition = new TranspositionCypher();

console.log("Without factory");

let transposedText = transposition.encrypt(plaintext);
let ciphertext = vigenere.encrypt(transposedText);
let decryptedText = vigenere.decrypt(ciphertext);
let untransposedText = transposition.decrypt(decryptedText);

console.log("Ciphertext: " + ciphertext);
console.log("Untransposed Text: " + untransposedText);

let factoryCiphertext = factory.encrypt(plaintext);
console.log("With factory");
console.log("Ciphertext: " + factoryCiphertext);
let factoryDecryptedText = factory.decrypt(factoryCiphertext);
console.log("Decrypted Text: " + factoryDecryptedText);