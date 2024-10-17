const convertBtn = document.getElementById('convertBtn');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const resultDisplay = document.getElementById('result');

// Function to fetch exchange rates from an API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Get rates based on USD
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

// Convert currency based on the selected rates
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Fetch rates from the API
    const rates = await fetchExchangeRates();

    if (rates) {
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (fromRate && toRate) {
            const convertedAmount = (amount / fromRate) * toRate;
            resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            resultDisplay.textContent = 'Error: Invalid currency selected.';
        }
    } else {
        resultDisplay.textContent = 'Error: Unable to fetch exchange rates.';
    }
}

// Event listener for the button
convertBtn.addEventListener('click', convertCurrency);
