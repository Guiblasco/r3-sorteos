import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

function exitProcess(exitCode: number): void {
  process.exit(exitCode);
}
export function loginUser(email: string, password: string) {
  const user = programData.users.find(
    (user) => user.email == email && user.password == password
  );

  if (user) {
    programData.userEmail = email;
    if (user.email == "admin@admin.com") {
      programData.isAdmin = true;
    }
    saveData();
  } else {
    console.log("El usuario no coincide con los usuarios registrados");
    exitProcess(0);
  }
}
export function createGiveaway() {
  const giveawayData = askUserNewGiveawayData();
  const newGiveaway: Giveaway = {
    name: giveawayData.giveawayName,
    socialNetwork: giveawayData.giveawaySocialNetwork,
    participants: [],
  };
  console.log(`Sorteo creado con éxito`);

  programData.giveaways.push(newGiveaway);
  saveData();
}

export function listGiveaways() {
  if (!programData.giveaways) {
    console.log("No hay sorteos disponibles");
  } else {
    console.log(
      programData.giveaways.length == 1
        ? "Este es el " + programData.giveaways.length + " sorteo disponible"
        : "Estos son los " +
            programData.giveaways.length +
            " sorteos disponibles"
    );
    for (
      let giveaway = 0;
      giveaway < programData.giveaways.length;
      giveaway++
    ) {
      console.log(
        giveaway +
          1 +
          ". Sorteo de un " +
          programData.giveaways[giveaway].name +
          " en " +
          programData.giveaways[giveaway].socialNetwork
      );
    }
  }
}
export function deleteGiveaway(giveawayNumber: number) {
  if (giveawayNumber > programData.giveaways.length) {
    console.log("No existe este sorteo");
  } else {
    programData.giveaways.splice(giveawayNumber - 1, 1);
    console.log(`Sorteo ${giveawayNumber} eliminado con éxito`);
    saveData();
  }
}
