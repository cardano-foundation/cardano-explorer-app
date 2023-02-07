{ system ? builtins.currentSystem, sources ? import ./sources.nix }:

let
  iohkNix = import sources.iohk-nix {};
  overlay = self: super: {
    packages = self.callPackages ./packages.nix { };
  };
in
  import iohkNix.nixpkgs { inherit system; overlays = [ overlay ]; config = {}; }
