function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }
  
  // Cadena de promesas para los jugadores
  luckyDraw('Pepeantoño')
    .then((result) => {
      console.log(result);
      return luckyDraw('Pepelu');
    })
    .then((result) => {
      console.log(result);
      return luckyDraw('Josefa');
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error.message);
    })
    .finally(() => {
      console.log('Proceso completo');
    });