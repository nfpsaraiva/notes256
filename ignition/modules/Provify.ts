import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProvifyModule = buildModule("ProvifyModule", (m) => {
  const provify = m.contract("Provify");

  return { provify };
});

export default ProvifyModule;
