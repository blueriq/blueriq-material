FROM node:14.17.0-buster@sha256:d1d71f63a8b92fa73d8df65fc512f64f2bac8a46b08cbd8caf4d36203d6e210b as node-base

# syntax = docker/dockerfile:1.2
FROM node-base AS packages

WORKDIR /usr/src

# Copy all package.json files in the Docker context into the layer. This uses a bind mount and manual `find` command
# instead of Docker's COPY instruction, as Docker is unable to copy glob patterns into the layer.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /usr/src/ \;

# Copy nprmc and yarn.lock files if they exist into the layer. This uses a bind mount and checks if the files exists
# instead of Docker's COPY instruction. Docker fails if a file does not exist, which should be a valid option.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    [ -e yarn.lock ] && cp yarn.lock /usr/src/ && \
    [ -e .npmrc ] && cp .npmrc /usr/src/ || exit 0

########################################################################################################################

FROM node-base AS node

WORKDIR /usr/src
COPY --from=packages /usr/src/ .
RUN --mount=type=cache,id=yarn,target=/yarn/cache,sharing=locked \
    yarn config set cache-folder /yarn/cache && \
    cp package.json package.json.bkp && \
    yarn install --prefer-offline --frozen-lockfile --network-timeout=100000

########################################################################################################################

FROM node AS workspace

RUN --mount=type=bind,target=/docker-context \
    cp -R --no-clobber /docker-context/. /usr/src/

RUN sed -i -e 's/\r//g' ./scripts/build/*.sh
