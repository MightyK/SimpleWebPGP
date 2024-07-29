document.addEventListener('DOMContentLoaded', function() {
    var generateKeyButton = document.getElementById('generate-key');
    var encryptButton = document.getElementById('encrypt');
    var decryptButton = document.getElementById('decrypt');
    var title = document.getElementById('title');
    var privateKeyTextArea = document.getElementById('private-key');
    var publicKeyTextArea = document.getElementById('public-key');
    var inputText = document.getElementById('input-text');
    var outputText = document.getElementById('output-text');

    function setActiveButton(button) {
        generateKeyButton.classList.remove('active');
        encryptButton.classList.remove('active');
        decryptButton.classList.remove('active');
        button.classList.add('active');
    }

    function setStatusMessage(message) {
        title.innerText = message;
    }

    function placeholderToggle(text) {
        if (text.getAttribute("placeholder") === "Enter the text you would like to encrypt") {
            text.setAttribute("placeholder", "Decrypted text will output here");
        }
        else if (text.getAttribute("placeholder") === "Decrypted text will output here") {
            text.setAttribute("placeholder", "Enter the text you would like to encrypt");
        }
    }

    async function handleEncryption() {
        try {
            const publicKeyArmored = publicKeyTextArea.value;
            const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
            const message = await openpgp.createMessage({ text: inputText.value });

            const encrypted = await openpgp.encrypt({
                message,
                encryptionKeys: publicKey
            });

            if (inputText.value.trim() === "") {
                setStatusMessage("Blank text cannot be encrypted!");
            }
            else {
                outputText.value = encrypted;
                placeholderToggle(inputText);
                setStatusMessage("Plaintext encrypted!");
            }
            inputText.value = "";
        } catch (error) {
            console.error(error);
            setStatusMessage("Encryption failed!");
        }
    }

    async function handleDecryption() {
        try {
            const privateKeyArmored = privateKeyTextArea.value;
            const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });

            // Decrypt the private key if not already decrypted
            if (!privateKey.isDecrypted()) {
                await openpgp.decryptKey({
                    privateKey
                });
            }

            const message = await openpgp.readMessage({ armoredMessage: outputText.value });

            const { data: decrypted } = await openpgp.decrypt({
                message,
                decryptionKeys: privateKey
            });

            inputText.value = decrypted;
            outputText.value = "";
            placeholderToggle(inputText);
            setStatusMessage("Ciphertext decrypted!");
        } catch (error) {
            console.error(error);
            setStatusMessage("Decryption failed!");
        }
    }

    generateKeyButton.addEventListener('click', async function() {
        setActiveButton(generateKeyButton);
        setStatusMessage("Generating keys...");

        try {
            const { privateKey, publicKey } = await openpgp.generateKey({
                type: 'rsa',
                rsaBits: 2048,
                userIDs: [{ name: 'Your Name', email: 'example@email.com' }],
            });

            privateKeyTextArea.value = privateKey;
            publicKeyTextArea.value = publicKey;
            outputText.value = "";
            inputText.value = "";
            setStatusMessage("Public/private key pair generated!");
        } catch (error) {
            console.error(error);
            setStatusMessage("Key generation failed!");
        }
    });

    encryptButton.addEventListener('click', function() {
        setActiveButton(encryptButton);
        setStatusMessage("Encrypting plaintext. Please wait...");
        handleEncryption();
    });

    decryptButton.addEventListener('click', function() {
        setActiveButton(decryptButton);
        setStatusMessage("Decrypting ciphertext. Please wait...");
        handleDecryption();
    });
});