# syntax = docker/dockerfile:1.2
FROM docker-internal.blueriq.com/build-nodejs-12 AS packages

WORKDIR /usr/src
COPY yarn.lock ./

# Copy all package.json files in the Docker context into the layer. This uses a bind mount and manual `find` command
# instead of Docker's COPY instruction, as Docker is unable to copy glob patterns into the layer.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /usr/src/ \;

RUN cp /node/.npmrc ./.npmrc

########################################################################################################################

FROM docker-internal.blueriq.com/build-nodejs-12 AS node

WORKDIR /usr/src
COPY --from=packages /usr/src/ .
RUN --mount=type=cache,id=yarn,target=/yarn/cache \
    yarn config set cache-folder /yarn/cache && \
    cp package.json package.json.bkp

########################################################################################################################

FROM node AS workspace

RUN --mount=type=bind,target=/docker-context \
    cp -R --no-clobber /docker-context/. /usr/src/
