const moonColor = "#711bf6";
const sunColor = "#c29b2e";
const compassColor = "#6015d5";
const calendarColor = "#9877fa";
const calendarBgColor = compassColor;
const bgColor = "#16152d";

function setup() {
  createCanvas(800, 600, P2D, document.querySelector("#screen"));
}

function windowResized() {
  //resizeCanvas(width, height-43);
}

function uiop(s, p) {
  const h = 3
  var b = (-sin(p) + h) / h
  var a = -cos(p)
  var x = a * cos(max(0, s))
  var y = (-b) * (sqrt(-pow(x / a, 2) + 1) - 1)
  return { x: x, y: y, a: a, b: b }
}



function drawcompass(mh, ma, sh, sa) {
  push()
  push()
  // Получить положение луны
  var g = uiop(mh, ma)
  translate(0, -100)
  scale(100)
  pop()


  var r = uiop(sh, sa)
  translate(0, -100)
  scale(100)

  push()
  // Нарисовать овал горизонта
  noFill()
  strokeWeight(0.01)
  stroke(compassColor)
  blendMode(DIFFERENCE)

  ellipse(0, 1, 2, 2.0 / 3)

  // Арка положения луны
  push()
  scale(g.a, g.b)
  arc(0, 1, 2, 2, 2 * PI - max(0, mh), 2 * PI)
  pop()

  push()
  scale(r.a, r.b)
  arc(0, 1, 2, 2, 2 * PI - max(0, sh), 2 * PI)
  pop()
  pop()

  // Сама луна
  noStroke()
  fill(moonColor)
  circle(g.x, g.y, 0.25)

  noStroke()
  fill(sunColor)
  circle(r.x, r.y, 0.25)
  pop()

}

// Функцию дал ChatGPT
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function drawCalendar() {
  fill(calendarColor)
  const maxGridY = 6
  let firstDay = new Date(moonDate)
  let numdays = getDaysInMonth(firstDay.getFullYear(), firstDay.getMonth())
  // Устанавливаем первый день текущего выбранного в поле ввода
  // даты месяца
  firstDay.setDate(1)
  // Получить день недели первого числа месяца
  let firstDayWeekDay = firstDay.getDay()

  let f = firstDay.getDate();
  // Временная дата, которую мы используем для получения фазы луны
  let d = new Date(moonDate)

  out:
  for (let gridY = 0; gridY < maxGridY; gridY++) {
    let weekDay = 1
    if (gridY == 0) {
      weekDay = firstDayWeekDay
    }
    // Пример: февраль 2025 начнётся с 6
    for (; weekDay <= 7; weekDay++) {
      push()
      if (f > numdays) {
        pop()
        break out
      }
      translate(weekDay * 20, gridY * 20)
      text(f, 0, 0)
      d.setDate(f)
      let p = SunCalc.getMoonIllumination(d).phase
      p *= 2
      p -= 1
      fill(calendarBgColor)
      rect(0, 11, 15, 5)

      fill(calendarColor)
      if (p <= 0) {
        rect(0, 11, 15 * (1 - abs(p)), 5)
      } else {
        rect(15, 11, -15 * (1 - abs(p)), 5)
      }
      f++
      pop()
    }
  }
}

function draw() {
  fillGradient('linear', {
    from: [0, 0],   // x, y : Coordinates
    to: [0, 400], // x, y : Coordinates
    steps: [
      lerpColor(color(currentBp.ca),color(prevbp.ca),1-bpi),
      lerpColor(color(currentBp.cb),color(prevbp.cb),1-bpi),
    ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
  });
  rect(-1, -1, 10000, 10000)

  // background(bgColor);
  fill(0)
  noStroke()
  textAlign(LEFT, TOP);

  push()
  translate(20, 20)
  drawCalendar()
  pop()

  push()
  noStroke()
  translate(width / 2, height - 43)
  drawcompass(moonAltitude, moonAzimuth, sunAltitude, sunAzimuth)
  pop()

  push()
  fill(moonColor)
  // rotate()
  translate(((-moonAzimuth + PI) / PI-1) * width, (PI - moonAltitude) / 2 / PI * height + 100)
  // translate(-width /2, 0)
  a = lerp(min(0.5, moonPhase) * 2, 0, 2 * PI)
  b = lerp((max(0.5, moonPhase) - 0.5) * 2, 0, 2 * PI)
  arc(0, 0, 60 + 10, 60 + 10, a, b, OPEN)
  pop()
  
  push()
  fill(sunColor)
  // rotate()
  translate(((-sunAzimuth + PI) / PI-1) * width, (PI - sunAltitude) / 2 / PI * height + 100)
  // translate(-width /2, 0)
  circle(0,0, 70)
  pop()
}
