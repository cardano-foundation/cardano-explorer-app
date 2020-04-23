{ sources ? import ./sources.nix
}:
let
  # TODO: filter src to just the files needed to build
  src = ../.;
  overlay = self: super: {
    inherit (import sources.niv {}) niv;
    packages = self.callPackage ./packages.nix { };
    node = super.nodejs-12_x;
    inherit (import sources.yarn2nix { pkgs = self; }) yarn2nix mkYarnModules mkYarnPackage importOfflineCache mkYarnNix fixup_yarn_lock;
  };
in
  import sources.nixpkgs {
    overlays = [ overlay ];
    config = {};
  }
