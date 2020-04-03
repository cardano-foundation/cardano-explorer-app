{ mkYarnPackage, stdenv, lib, python, nodejs }:

let
  src = lib.cleanSourceWith {
    filter = lib.cleanSourceFilter;
    src = lib.cleanSourceWith {
      filter = name: type:
        !( lib.hasSuffix ".nix" name
        || (type == "directory" && (baseNameOf name) == "node_modules" )
        || (type == "directory" && (baseNameOf name) == "generated" ))
        ;
      src = ../.;
    };
  };
  package = builtins.fromJSON (builtins.readFile ../package.json);
in {
  cardano-explorer-app = mkYarnPackage {
    pname = package.name;
    version = package.version;
    packageJSON = ../package.json;
    yarnLock = ../yarn.lock;
    src = src;
    yarnPreBuild = ''
      mkdir -p $HOME/.node-gyp/${nodejs.version}
      echo 9 > $HOME/.node-gyp/${nodejs.version}/installVersion
      ln -sfv ${nodejs}/include $HOME/.node-gyp/${nodejs.version}
    '';

    installPhase = ''
      sed -i 's@schema: ./node_modules@schema: ../../node_modules@' deps/cardano-explorer-app/codegen.yml

      export PATH="$PATH:$node_modules/.bin"
      yarn --offline run build
      cp -r ../deps/cardano-explorer-app/dist $out
      mkdir -p $out/bin
      cat <<EOF > $out/bin/cardano-explorer-app
      #!${stdenv.shell}
      exec ${nodejs}/bin/node $out/index.js
      EOF
      chmod +x $out/bin/cardano-explorer-app
      ln -s $node_modules $out/node_modules
    '';

    distPhase = ''
      cp -r . $out
    '';
  };
}
