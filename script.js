const scenes = [...document.querySelectorAll('.scene')];
const dust = document.querySelector('.dust');
let current = 0;
let busy = false;

function particles(x, y, count = 34) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'particle';
    p.style.left = (x + (Math.random() - .5) * 70) + '%';
    p.style.top = (y + (Math.random() - .5) * 24) + '%';
    p.style.setProperty('--dx', ((Math.random() - .5) * 300) + 'px');
    p.style.setProperty('--dy', (-40 - Math.random() * 240) + 'px');
    p.style.setProperty('--dur', (1 + Math.random() * 1.7) + 's');
    dust.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

function transition() {
  if (busy || current >= 4) return;
  busy = true;
  const oldScene = scenes[current];
  const button = oldScene.querySelector('.artifact');

  // The keepsake opens first; only then does its magic reveal the next one.
  button.classList.add('opening', 'reveal');
  particles(50, 51, current === 0 ? 55 : 38);

  setTimeout(() => {
    oldScene.classList.remove('active');
    current += 1;
    const nextScene = scenes[current];
    nextScene.classList.add('active');
    const nextArtifact = nextScene.querySelector('.artifact');

    if (nextArtifact) {
      nextArtifact.classList.remove('arrive');
      // Restart the entrance animation cleanly.
      void nextArtifact.offsetWidth;
      nextArtifact.classList.add('arrive');
      particles(50, 54, 22);
      setTimeout(() => nextArtifact.classList.remove('arrive'), 1250);
    }

    busy = false;
    if (current === 4) startLetter();
  }, 1250);
}

scenes.slice(0, 4).forEach(scene => {
  const button = scene.querySelector('.artifact');
  button.addEventListener('click', transition);
});

const title = 'Nuestro nonagésimo latido';
const letter = `Llevamos 90 días juntos, pero bastaron unos días, unas horas, unos minutos y unos segundos para darme cuenta de algo…

Podría tener cinco vidas distintas, vivir en países y ciudades diferentes y tener cinco trabajos distintos; aun así, en cada una de ellas terminaría enamorándome de la misma persona.

Y esa persona eres tú.

Gracias por toda la felicidad que has traído a mi vida, corazón. Nunca me cansaré de decírtelo, jiji. Gracias por ser tú, por tu forma de quererme y por hacer que incluso la distancia tenga momentos tan bonitos.

Gracias por todos estos momentos que pasamos en nuestros primeros noventa días, por esas llamadas, las primeras videollamadas, aquel momento que nos dormimos juntos por primera vez, todas esas risas. Definitivamente, la distancia se va acortando mientras nuestro amor crece. O sea, cada momento, por más sencillo que sea, siempre va a ser extremadamente lindo, especial y hermoso si es contigo. Y siempre me va a hacer ilusión todo lo que todavía está por venir y lo que nos falta recorrer en nuestro camino.

Nunca me cansaré de decirlo, pero gracias por ser parte de mis días y permitirme ser parte de los tuyos. ¡TE AMO DEMASIADO, CORAZÓN!

Felices tres meses, mi bebé hermosapreciosa. Eres lo que siempre voy a querer en esta vida, jiji.`;

const titleEl = document.getElementById('typed-title');
const letterEl = document.getElementById('typed-letter');
const signature = document.getElementById('signature');

function typeText(el, text, speed, done) {
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      let delay = speed;
      if (/[.…!]/.test(text[i - 1])) delay *= 5;
      else if (text[i - 1] === '\\n') delay *= 3;
      setTimeout(tick, delay);
    } else if (done) {
      done();
    }
  }
  tick();
}

function startLetter() {
  setTimeout(() => {
    typeText(titleEl, title, 95, () => {
      setTimeout(() => {
        typeText(letterEl, letter, 23, () => {
          setTimeout(() => {
            signature.textContent = 'para mi mermelada 😳';
            particles(50, 92, 26);
          }, 650);
        });
      }, 850);
    });
  }, 650);
}
