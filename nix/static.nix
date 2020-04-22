{ stdenv, yarn, nodejs, fixup_yarn_lock, offlinecache
, cardanoEra ? "byron"
, cardanoNetwork ? "mainnet"
, graphqlApiProtocol ? "https"
, graphqlApiHost ? "localhost"
, graphqlApiPort ? 443
, graphqlApiPath ? "graphql"
, gaTrackingId ? null
, src
}:

stdenv.mkDerivation {
  name = "static-export";
  inherit src;
  buildInputs = [ yarn nodejs ];
  CARDANO_ERA = cardanoEra;
  CARDANO_NETWORK = cardanoNetwork;
  GRAPHQL_API_PROTOCOL = graphqlApiProtocol;
  GRAPHQL_API_HOST = graphqlApiHost;
  GRAPHQL_API_PORT = graphqlApiPort;
  GRAPHQL_API_PATH = graphqlApiPath;
  GA_TRACKING_ID = gaTrackingId;
  buildCommand = ''
    export HOME=$PWD/yarn_home

    unpackPhase
    cd $sourceRoot

    ${fixup_yarn_lock}/bin/fixup_yarn_lock yarn.lock
    yarn config --offline set yarn-offline-mirror ${offlinecache}
    yarn install --offline --frozen-lockfile --ignore-engines --ignore-scripts
    export PATH="$PATH:node_modules/.bin"
    patchShebangs node_modules/
    NODE_ENV=production yarn --offline run build
    yarn --offline run next export source --outdir $out
  '';
}
