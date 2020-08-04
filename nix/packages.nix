{ lib, pkgs }:

let
  src = lib.cleanSourceWith {
    filter = lib.cleanSourceFilter;
    src = lib.cleanSourceWith {
      filter = name: type: let
        baseName = baseNameOf (toString name);
        sansPrefix = lib.removePrefix (toString ../.) name;
        excludeList =
          lib.hasPrefix "/node_modules" sansPrefix ||
          lib.hasPrefix "/build" sansPrefix;
        includeList =
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
        (!excludeList) && includeList
      );
      src = ../.;
    };
  };
  nodePackages = pkgs.callPackage ./node-packages {};
  packages = self: {
    inherit src;
    allowList = pkgs.runCommand "allowList.json" { buildInputs = [ nodePackages.persistgraphql ]; } ''
        persistgraphql ${src} $out
    '';
    static = self.callPackage ./static.nix {};
    yarn-static = self.callPackage ./yarn2nix.nix {};
    inherit (self.yarn-static.passthru) offlinecache;
  };
in pkgs.lib.makeScope pkgs.newScope packages
