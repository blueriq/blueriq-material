FROM node:12.18.1-buster@sha256:ef6c9589ae91a895d3b1ad66e7d765a8c576065937b05745cb3594efc6d6fe54 as node-base

# https://nodejs.org/en/download/releases/
# Module version of NodeJS 12.18
ENV NODE_MODULE_VERSION 72

# syntax = docker/dockerfile:1.2
FROM node-base AS packages

WORKDIR /usr/src
COPY yarn.lock ./

# Copy all package.json files in the Docker context into the layer. This uses a bind mount and manual `find` command
# instead of Docker's COPY instruction, as Docker is unable to copy glob patterns into the layer.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /usr/src/ \;

# Copy nprmc file if it exists into the layer. This uses a bind mount and check if the .npmrc file exists
# instead of Docker's COPY instruction, as Docker fails of the file does not exists which should be a valid option.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    [ -e .npmrc ] && cp .npmrc /usr/src/ || exit 0

########################################################################################################################

FROM node-base AS node

WORKDIR /usr/src
COPY --from=packages /usr/src/ .
RUN --mount=type=cache,id=yarn,target=/yarn/cache,sharing=locked \
    yarn config set cache-folder /yarn/cache && \
    cp package.json package.json.bkp && \
    yarn install --frozen-lockfile --ignore-scripts

########################################################################################################################

FROM node AS workspace

RUN --mount=type=bind,target=/docker-context \
    cp -R --no-clobber /docker-context/. /usr/src/
