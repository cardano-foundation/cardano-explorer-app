{ lib, pkgs }:

let
  src = lib.cleanSourceWith {
    filter = lib.cleanSourceFilter;
    src = lib.cleanSourceWith {
      filter = name: type: let
        baseName = baseNameOf (toString name);
        sansPrefix = lib.removePrefix (toString ../.) name;
        in_blacklist =
          lib.hasPrefix "/node_modules" sansPrefix ||
          lib.hasPrefix "/build" sansPrefix;
        in_whitelist =
          (type == "directory") ||
          (lib.hasSuffix ".yml" name) ||
          #(lib.hasSuffix ".js" name) ||
          (lib.hasSuffix ".ts" name) ||
          #(lib.hasSuffix ".tsx" name) ||
          (lib.hasSuffix ".json" name) ||
          #(lib.hasSuffix ".graphql" name) ||
          #(lib.hasPrefix "/source/public/assets" sansPrefix) ||
          (lib.hasPrefix "/source" sansPrefix) ||
          baseName == ".babelrc" ||
          baseName == "package.json" ||
          baseName == "next.config.js" ||
          baseName == "yarn.lock" ||
          (lib.hasPrefix "/deploy" sansPrefix);
      in (
        (!in_blacklist) && in_whitelist
      );
      src = ../.;
    };
  };
  packages = self: {
    inherit src;
    static = self.callPackage ./static.nix {};
    yarn-static = self.callPackage ./yarn2nix.nix {};
    inherit (self.yarn-static.passthru) offlinecache;
  };
in pkgs.lib.makeScope pkgs.newScope packages
