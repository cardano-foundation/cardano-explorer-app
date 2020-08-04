############################################################################
#
# Hydra release jobset.
#
# The purpose of this file is to select jobs defined in default.nix and map
# them to all supported build platforms.
#
############################################################################
{
  rev ? null
}:

let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {
    config = {}; overlays = [];
  };

in

pkgs.lib.fix (self: {
  inherit ( import ./. {} ) static yarn-static allowList;
  build-version = pkgs.writeText "version.json" (builtins.toJSON { inherit rev; });
  required = pkgs.releaseTools.aggregate {
    name = "required";
    constituents = with self; [ static allowList build-version ];
  };
})
