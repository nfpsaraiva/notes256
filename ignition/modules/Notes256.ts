import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Notes256Module = buildModule("Notes256Module", m => {
  const notes256 = m.contract("Notes256");

  return { notes256 };
});

export default Notes256Module;
