import { off } from "node:process";
import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway, User } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export function loginUser(email: string, password: string): void {
  const user = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    programData.userEmail = email;
    if (
      user.email === "admin@admin.com"
        ? (programData.isAdmin = true)
        : (programData.isAdmin = false)
    )
      saveData();
  } else {
    console.log("El usuario no coincide con los usuarios registrados");
    process.exit(0);
  }
}

export function createGiveaway(): void {
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

export function listGiveaways(): void {
  switch (programData.giveaways.length) {
    case 0:
      console.log("No hay sorteos disponibles");
      break;

    case 1:
      console.log("Este es el único sorteo disponible");
      break;

    default:
      console.log(
        `Estos son los ${programData.giveaways.length} sorteos disponibles`
      );
      break;
  }

  programData.giveaways.forEach((giveaway, index) => {
    console.log(
      `${index + 1}.Sorteo de un ${giveaway.name} en ${giveaway.socialNetwork}`
    );
  });
}

export function deleteGiveaway(giveawayNumber: number): void {
  if (giveawayNumber > programData.giveaways.length) {
    console.log("No existe este sorteo");
  } else {
    programData.giveaways.splice(giveawayNumber - 1, 1);
    console.log(`Sorteo ${giveawayNumber} eliminado con éxito`);
    saveData();
  }
}

export function enterGiveaway(enterGiveawayNumber: number) {
  const user = programData.users.find(
    (user) => user.email === programData.userEmail
  );

  if (enterGiveawayNumber > programData.giveaways.length) {
    console.log("No existe este sorteo");
  } else if (
    programData.giveaways[enterGiveawayNumber - 1].participants.find(
      (participant) => participant === user
    )
  ) {
    console.log("Ya estás participando en el sorteo");
  } else {
    if (user) {
      programData.giveaways[enterGiveawayNumber - 1].participants.push(user);
    }
    console.log("Inscrito con éxito al sorteo");
    saveData();
  }
}

export function listUserGiveaways(): void {
  const givawaysList: Giveaway[] = [];

  for (const giveaway of programData.giveaways) {
    for (const participant of giveaway.participants) {
      if (participant.email === programData.userEmail) {
        givawaysList.push(giveaway);
      }
    }
  }

  function giveawayFeedback(): void {
    givawaysList.forEach((giveaway, index) => {
      console.log(
        `${index + 1}. Sorteo de ${giveaway.name} en ${giveaway.socialNetwork}`
      );
    });
  }

  switch (givawaysList.length) {
    case 0:
      console.log(`No estas inscrito en ningun sorteo`);
      break;

    case 1:
      console.log(`Estás inscrito en este sorteo`);
      giveawayFeedback();
      break;

    default:
      console.log(`Estás inscrito en estos ${givawaysList.length} sorteos`);
      giveawayFeedback();
      break;
  }
}
