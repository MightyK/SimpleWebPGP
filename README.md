# Simple Web PGP Application

## Introduction

Welcome to the Simple Web PGP Application! This application allows you to generate PGP keys, encrypt messages, and decrypt messages using PGP (Pretty Good Privacy) encryption. It is built using HTML, CSS, Bootstrap, and the OpenPGP.js library.

## Prerequisites

To run this application, you need a modern web browser with JavaScript enabled.

## Files

- `index.html`: The main HTML file containing the structure of the application.
- `styles.css`: The CSS file for custom styling.
- `main.js`: The JavaScript file containing the application logic.
- `bootstrap.min.css`: The Bootstrap CSS file for styling.

## Setup

1. Clone or download the repository containing the above files.
2. Ensure all files (`index.html`, `styles.css`, `main.js`, `bootstrap.min.css`) are in the same directory.

## How to Use

1. **Open the Application**:
    - Open the `index.html` file in your web browser.

2. **Generate Keys**:
    - Click the `Generate Keys` button to generate a new pair of private and public keys.
    - The generated keys will be displayed in the respective text areas.

3. **Encrypt a Message**:
    - Enter the message you want to encrypt in the `Enter the text you would like to encrypt` text area.
    - Paste the recipient's public key into the `Insert recipient's public key here` text area.
    - Click the `Encrypt` button.
    - The encrypted message will be displayed in the `Encrypted text will output here` text area.

4. **Decrypt a Message**:
    - Paste the encrypted message into the `Encrypted text will output here` text area.
    - Paste your private key into the `Insert your private key here` text area.
    - Click the `Decrypt` button.
    - The decrypted message will be displayed in the `Enter the text you would like to encrypt` text area.

## User Interface

- **Buttons**:
    - `Generate Keys`: Generates a new pair of private and public keys.
    - `Encrypt`: Encrypts the message using the provided public key.
    - `Decrypt`: Decrypts the message using the provided private key.

- **Text Areas**:
    - `Enter the text you would like to encrypt`: Input area for the plaintext message to be encrypted.
    - `Encrypted text will output here`: Output area for the encrypted message.
    - `Insert your private key here`: Input area for the user's private key for decryption.
    - `Insert recipient's public key here`: Input area for the recipient's public key for encryption.

## Dependencies

- [Bootstrap](https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css): For styling and responsive design.
- [OpenPGP.js](https://unpkg.com/openpgp@latest/dist/openpgp.min.js): For PGP encryption and decryption functionalities.

## Customization

You can customize the styles in the `styles.css` file to match your preferred design. The JavaScript logic can be modified in the `main.js` file to add more features or change the existing behavior.

## Troubleshooting

- **Key Generation Failed**: Ensure you are connected to the internet as the OpenPGP.js library is fetched from a CDN.
- **Encryption/Decryption Failed**: Verify that the keys are correctly pasted into the respective text areas and that the input text is not empty.
