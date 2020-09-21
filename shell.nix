# This file is used by nix-shell.
# It just takes the shell attribute from default.nix.
{ config ? {}
, sourcesOverride ? {}
, pkgs ? import ./nix/pkgs.nix {}
, sources ? import ./nix/sources.nix
, iohkNix ? import sources.iohk-nix {}
, yarn2nix ? pkgs.yarn2nix-moretea.yarn2nix
}:

with pkgs;
let
  # FIXME: make a Typescript shell
  # This provides a development environment that can be used with nix-shell
  shell = pkgs.mkShell {
    name = "yarn-dev-shell";

    # These programs will be available inside the nix-shell.
    buildInputs = [
      git         # Distributed version control system
      nix         # Purely Functional Package Manager
      iohkNix.niv # Dependency management for Nix projects
      nodejs      # Event-driven I/O framework for the V8 JavaScript engine
      pkgconfig   # Allows packages to find out information about other packages
      tmux        # Terminal multiplexer
      nodePackages.typescript   # TypeScript extends JavaScript by adding types.
      yarn        # Dependency management for javascript
      yarn2nix    # Generate nix expressions from a yarn.lock file
    ];

    shellHook = ''
      echo "Typescript Dev Tools" \
      | ${figlet}/bin/figlet -f banner -c \
      | ${lolcat}/bin/lolcat

      echo "NOTE: you may need to export GITHUB_TOKEN if you hit rate limits with niv"
      echo "Commands:
        * niv update <package> - update package

      "
    '';
  };

  devops = pkgs.stdenv.mkDerivation {
    name = "devops-shell";
    buildInputs = [
      iohkNix.niv   # Dependency management for Nix projects
    ];
    shellHook = ''
      echo "DevOps Tools" \
      | ${figlet}/bin/figlet -f banner -c \
      | ${lolcat}/bin/lolcat

      echo "NOTE: you may need to export GITHUB_TOKEN if you hit rate limits with niv"
      echo "Commands:
        * niv update <package> - update package

      "
    '';
  };

in

  shell // { inherit devops; }
