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
  } else {
    console.log("El usuario no coincide con los usuarios registrados");
    exitProcess(0);
  }
}
export function createGiveaway() {
  const recoveredData = askUserNewGiveawayData();
  const newGiveaway: Giveaway = {
    name: recoveredData.giveawayName,
    socialNetwork: recoveredData.giveawaySocialNetwork,
    participants: [],
  };

  programData.giveaways.push(newGiveaway);
}
