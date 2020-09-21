{ stdenv
, nix-inclusive
, nodejs
, nodePackages
, runtimeShell
, sources
, yarn
}:

let
  packageJSON = builtins.fromJSON (builtins.readFile ../package.json);

  src = stdenv.mkDerivation {
    pname = "${packageJSON.name}-src";
    version = packageJSON.version;
    buildInputs = [ yarn nodejs ];
    src = nix-inclusive ./.. [
      ../yarn.lock
      ../.yarnrc
      ../package.json
      ../packages-cache
      ../tsconfig.json
      ../source
      ../cypress
      ../.storybook
      ../codegen.yml
      ../.babelrc
      ../stories
      ../cypress.json
      ../jest.config.js
      ../next.config.js
      ../postcss.config.js
      ../tslint.json
      ../wallaby.conf.js
    ];
    buildCommand = ''
      export HOME=$NIX_BUILD_TOP
      mkdir -p $out
      cp -r $src/. $out/
      chmod -R u+w $out
      cd $out
      export CYPRESS_INSTALL_BINARY=0
      yarn --offline --frozen-lockfile --non-interactive
    '';
  };

in stdenv.mkDerivation {
  pname = packageJSON.name;
  version = packageJSON.version;
  inherit src;
  buildInputs = [ nodejs yarn ];
  buildCommand = ''
    mkdir -p $out
    cp -r $src/. $out/
    chmod -R u+w $out
    patchShebangs $out

    cd $out
    yarn build
    find . -name node_modules -type d -print0 | xargs -0 rm -rf
    yarn --production --offline --frozen-lockfile --non-interactive

    mkdir -p $out/bin
    cat <<EOF > $out/bin/${packageJSON.name}
    #!${runtimeShell}
    exec ${nodejs}/bin/node $out/packages/server/dist/index.js
    EOF
    chmod +x $out/bin/${packageJSON.name}
  '';
} // { inherit src; }
