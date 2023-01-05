{ system ? builtins.currentSystem }:

(import ./nix/pkgs.nix { inherit system; }).packages
