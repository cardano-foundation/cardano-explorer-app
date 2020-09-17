{ stdenv, yarn, nodejs, offlinecache
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
    export CYPRESS_INSTALL_BINARY=0
    yarn config set yarn-offline-mirror ${offlinecache}
    yarn install --offline --frozen-lockfile --ignore-engines --ignore-scripts
    export PATH="$PATH:node_modules/.bin"
    patchShebangs node_modules/
    NODE_ENV=production yarn --offline run build
    yarn run next export source --outdir $out
  '';
}
