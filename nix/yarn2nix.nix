{ mkYarnPackage, src, importOfflineCache, mkYarnNix, nodejs }:

let
  package = builtins.fromJSON (builtins.readFile ../package.json);
in mkYarnPackage {
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
    yarn run next export source --outdir $out

    yarn export
    ls -lh deps/cardano-explorer-app/build/static

    # cleanup $out
    find $out -type d -delete 2> /dev/null || true
  '';

  distPhase = ''
    #cp -r . $out
  '';
  passthru = {
    offlinecache = importOfflineCache (mkYarnNix { yarnLock = ../yarn.lock; });
  };
}
