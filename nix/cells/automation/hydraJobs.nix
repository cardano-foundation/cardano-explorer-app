{
  cell,
  inputs,
}:

import "${inputs.self}/release.nix" {
  cardano-explorer-app = inputs.self;
  inherit (inputs.nixpkgs) system;
}
