// Function to add a rotating class to the spinner
function startSpinnerRotation() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('rotating');
}

//Function to  fetch the list of stocks from the backend using XMLHttpRequest
function fetchStocks() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('List of available stocks:', JSON.parse(xhr.responseText).stockSymbols);
            } else {
                console.error('Error fetching stocks. Status:', xhr.status);
            }
        }
    };

    xhr.open('GET', '/stocks', true);
    xhr.send();
}

//Function to fetch data for each stock
function fetchStockData(stockSymbols) {
    stockSymbols.forEach(stockSymbol => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                try {
                    if (xhr.status === 200) {
                        const stockData = JSON.parse(xhr.responseText);
                        console.log(`Data for ${stockSymbol}:`, stockData);
                    } else {
                        handleError(stockSymbol, xhr.status);
                    }
                } catch (error) {
                    handleError(stockSymbol, `Parsing Error: ${error}`);
                }

                // Check if all data is loaded and hide the spinner
                checkAndHideSpinner(stockSymbols, stockSymbol);
            }
        };

        xhr.open('GET', `/stocks/${stockSymbol}`, true);
        xhr.send();
    });
}

//For drawing on canvas
const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')


function drawLine(start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

//Drawing on canvas
drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

// Start rotating the spinner after a slight  delay
setTimeout(startSpinnerRotation, 1000);

//Fetch list of stocks after a slight delay
setTimeout(fetchStocks, 1000);
