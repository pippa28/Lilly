const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

// Function to add a rotating class to the spinner
function startSpinnerRotation() {
  const spinner = document.querySelector('.spinner');
  spinner.classList.add('rotating');
  console.log('Spinner rotating class added');
}

function drawLine (start, end, style) {
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

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

// Start rotating the spinner after a delay
setTimeout(startSpinnerRotation, 1000);

