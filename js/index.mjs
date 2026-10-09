import Encryption from "./Encryption Classes/module.mjs";
const {_Encryptor, KeyBasedEncryptor, EncryptionFactory, TranspositionCypher, Vigenere} = Encryption;
const factory = new EncryptionFactory();

let $factoryBuildElement;
let $plaintextInput;
let $cyphertextInput;

document.addEventListener("DOMContentLoaded", () => {
    $factoryBuildElement = document.getElementById("factoryBuild");
    $plaintextInput = document.getElementById("plaintext");
    $cyphertextInput = document.getElementById("ciphertext");

    let $encryptorSelect = document.getElementById("encryptorSelect");
    document.getElementById("encryptButton").addEventListener('click', ()=>{
        addEncryptor($encryptorSelect.value);
    })
    document.getElementById('encryptTextButton').addEventListener('click', encryptText);
    document.getElementById('decryptTextButton').addEventListener('click', decryptText);
});

function encryptText()
{
    if(factory.encryptors.length === 0)
    {
           return;
    }
    $cyphertextInput.value = factory.encrypt($plaintextInput.value);
}

function decryptText()
{
    if(factory.encryptors.length === 0)
    {
           return;
    }
    $plaintextInput.value = factory.decrypt($cyphertextInput.value);
}

function addEncryptor(encryptorName)
{
    switch(encryptorName)
    {
        case 'vigenere':
            let vigenere = Vigenere.withKey("pandora");
            factory.registerEncryptor(vigenere);
            $factoryBuildElement.appendChild(getUIForEncryptor(vigenere));
            break;
        case 'transposition':
            let transposition = new TranspositionCypher();
            factory.registerEncryptor(transposition);
            $factoryBuildElement.appendChild(getUIForEncryptor(transposition));
            break;
    }
}

function getUIForEncryptor(encryptor)
{
    let element = document.createElement("div");
    element.classList.add("encryptor-ui");
    element.classList.add("row");

    let nameElement = document.createElement("h4");
    nameElement.textContent = encryptor.name;
    element.appendChild(nameElement);

    if(encryptor instanceof KeyBasedEncryptor)
    {
        let keyElement = document.createElement('div');
        let nameLabelElement = document.createElement('label');
        nameElement.innerText="Key for " + encryptor.name;
        nameLabelElement.setAttribute('for', 'key-input');
        let keyInputElement = document.createElement('input');
        keyInputElement.setAttribute('type', 'text');
        keyInputElement.setAttribute('id', 'key-input');
        keyInputElement.addEventListener('input', (event) => {
            encryptor.setKey(event.target.value);
        });
        keyElement.appendChild(nameLabelElement);
        keyElement.appendChild(keyInputElement);
        element.append(keyElement);
    }
    return element;
}

