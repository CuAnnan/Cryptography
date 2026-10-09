import Vigenere from './Vigenere.mjs';
import TranspositionCypher  from "./TranspositionCypher.mjs";

const vigenere = Vigenere.withKey("pandora");
const transposition = new TranspositionCypher();

let plaintext = "Hello, World!";

console.log("Plaintext:  " + plaintext);


let transposedText = transposition.encrypt(plaintext);
console.log("Transposed Text: " + transposedText);

let ciphertext = vigenere.encrypt(transposedText);
let decryptedText = vigenere.decrypt(ciphertext);
let untransposedText = transposition.decrypt(decryptedText);

console.log("Ciphertext: " + ciphertext);
console.log("Decrypted Text: " + decryptedText);
console.log("Untransposed Text: " + untransposedText);

